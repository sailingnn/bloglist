const blogsRouter = require('express').Router()
const { response } = require('../app')
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

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  const result = await blog.save()
  response.status(201).json(result)
})

module.exports = blogsRouter