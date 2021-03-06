/* eslint-disable prefer-destructuring */
/* eslint-disable no-undef */
const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
  // add one user:
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', passwordHash })

  await user.save()
  // get user id
  const usersAtStart = await helper.usersInDb()
  // console.log('userID', usersAtStart[0].id)
  // add blogs:
  await Blog.deleteMany({})
  // eslint-disable-next-line no-restricted-syntax
  for (const blog of helper.initialBlogs) {
    blog.user = usersAtStart[0].id
    const blogObject = new Blog(blog)
    // console.log('blog:', blog)
    // eslint-disable-next-line no-await-in-loop
    await blogObject.save()
  }
}, 100000)
describe('when there is initially some blogs saved', () => {
  let authHeaders = ''
  beforeEach(async () => {
    // login as root, get the token
    const user = {
      username: 'root',
      password: 'sekret',
    }
    const loginInfo = await api
      .post('/api/login')
      .send(user)
    const token = loginInfo.body.token
    // console.log('token:', token)
    authHeaders = { Authorization: `bearer ${token}` }
    // console.log('authHeaders', authHeaders)
  })
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }, 100000)

  test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(2)
  }, 100000)

  test('the unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs')
    response.body.map((n) => expect(n.id).toBeDefined)
  })

  test('a valid new blog post can be added', async () => {
    const newBlog = {
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
      likes: 10,
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set(authHeaders)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const titles = response.body.map((r) => r.title)

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    expect(titles).toContain(
      'First class tests',
    )
  }, 100000)

  test('if Authorization is not set, return 401 error', async () => {
    const newBlog = {
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
      likes: 10,
    }
    const message = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)
    // console.log('message.body:', message.body)
    expect(message.body.error).toBe('Unauthorized')
  }, 100000)

  test('if the likes property is missing from the request, it will default to the value 0', async () => {
    const newBlog = {
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    }
    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .set(authHeaders)
      .expect(201) // this doesn't matter
      .expect('Content-Type', /application\/json/)

    // console.log('response.header', response.header)
    // console.log('reponse.body:', response.body)
    expect(response.body.likes).toBe(0)
  })

  test('if the title and url properties are missing, it will not be added', async () => {
    const newBlog = {
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set(authHeaders)
      .expect(400)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })
})

describe('deletion of a blog', () => {
  let authHeaders = ''
  beforeEach(async () => {
    // login as root, get the token
    const user = {
      username: 'root',
      password: 'sekret',
    }
    const loginInfo = await api
      .post('/api/login')
      .send(user)
    // console.log('loginfo.body', loginInfo.body)
    const token = loginInfo.body.token
    // console.log('token:', token)
    authHeaders = { Authorization: `bearer ${token}` }
    // console.log('authHeaders', authHeaders)
  })
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    // console.log('blogsAtStart', blogsAtStart)
    // console.log('blogToDelete', blogToDelete)

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set(authHeaders)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1,
    )

    const urls = blogsAtEnd.map((r) => r.url)

    expect(urls).not.toContain(blogToDelete.url)
  }, 100000)
})

describe('updating of a blog', () => {
  let authHeaders = ''
  beforeEach(async () => {
    // login as root, get the token
    const user = {
      username: 'root',
      password: 'sekret',
    }
    const loginInfo = await api
      .post('/api/login')
      .send(user)
    const token = loginInfo.body.token
    // console.log('token:', token)
    authHeaders = { Authorization: `bearer ${token}` }
    // console.log('authHeaders', authHeaders)
  })
  test('succeeds with status code 200 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const newBlog = {
      likes: 100,
    }
    // console.log('blogsAtStart', blogsAtStart)
    // console.log('blogToUpdate', blogToUpdate)

    const blogUpdated = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(newBlog)
      .set(authHeaders)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    // console.log('body of blogUpdated:', blogUpdated.body)
    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length,
    )

    expect(blogUpdated.body.likes).toBe(100)
  }, 100000)
})

describe('when there is initially one user in db', () => {
  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map((u) => u.username)
    expect(usernames).toContain(newUser.username)
  }, 100000)

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username must be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  }, 100000)

  test('creation fails with proper statuscode and message if password length is less than 3', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'gwas',
      name: 'gwas user',
      password: 'sa',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('password must be at least 3 characters long')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  }, 100000)
})

afterAll(() => {
  mongoose.connection.close()
})
