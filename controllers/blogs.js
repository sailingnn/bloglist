const blogsRouter = require('express').Router()
// const { response } = require('../app')
const Blog = require('../models/blog')

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
  const blogs = await Blog.find({})
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
blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  })

  // console.log('blog:', blog)
  // try{
    const result = await blog.save()
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

blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  // console.log('body:', body)
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true, runValidators: true })
  response.json(updatedBlog)
})

module.exports = blogsRouter