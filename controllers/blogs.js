const middleware = require('../utils/middleware')
const blogsRouter = require('express').Router()
// const { response } = require('../app')
const Blog = require('../models/blog')
// const User = require('../models/user')
// const jwt = require('jsonwebtoken')


// route handler using promises
// blogsRouter.get('/', (request, response) => {
//     Blog
//       .find({})
//       .then(blogs => {
//         response.json(blogs)
//       })
//   })

// route handler using async/await
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})  

// route handler using promises
// blogsRouter.post('/', (request, response) => {
//     const blog = new Blog(request.body)

//     // console.log('request.body', request.body)
//     // console.log('blog:', blog)

//     blog
//         .save()
//         .then(result => {
//         response.status(201).json(result)
//         })
// })

// blogsRouter.post('/', async (request, response, next) => {
blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })

  // console.log('blog:', blog)
  // try{
    const result = await blog.save()
    // console.log('result:', result)

    user.blogs = (user.blogs|| []).concat(result._id)
    await user.save()

    response.status(201).json(result)
  // }catch(exception){
  //   next(exception)
  // }
})

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
      response.json(blog)
    } else {
      response.status(404).end()
    }
})

// blogsRouter.delete('/:id', async (request, response) => {
blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  // console.log('applying delete...')
  // console.log('request extrcted?', request.extracted)
  const user = request.user
  // console.log('user of delete:', user)
  const blogToDelete = await Blog.findById(request.params.id)
  if(user._id.toString() === blogToDelete.user.toString()){
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else{
    return response.status(401).json({ error: 'wrong user attmpt' })
  }    
})

blogsRouter.put('/:id', middleware.userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user

  const blogToUpdate = await Blog.findById(request.params.id)

  // console.log('body:', body)
  // console.log('user._id', user._id)
  // console.log('blogToUpdate.user', blogToUpdate.user)
  
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    // user: blogToUpdate.user,
    likes: body.likes
  }
  if(user._id.toString() === blogToUpdate.user.toString()){
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true, runValidators: true })
    // console.log('sucess!', updatedBlog)
    response.json(updatedBlog)
  } else{
    return response.status(401).json({ error: 'wrong user attmpt' })
  }
})

module.exports = blogsRouter