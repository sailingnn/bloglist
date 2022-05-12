/* eslint-disable no-else-return */
// const { response } = require('../app')
// const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
    // console.log('extracted:', authorization.substring(7))
  } else {
    request.token = null
  }
  next()
}

// eslint-disable-next-line consistent-return
const userExtractor = async (request, response, next) => {
  // console.log('userExtractor called...')
  // console.log('test token:', request.token)
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  // console.log('decodedToken.id', decodedToken.id)
  request.user = await User.findById(decodedToken.id)
  request.extracted = true
  // console.log('request.user.name', request.user.name)
  // console.log('request.user._id', request.user._id)
  next()
}

// eslint-disable-next-line consistent-return
const errorHandler = (error, request, response, next) => {
  // logger.error(error.message)
  // logger.error(error.name)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    if (error.message === 'jwt must be provided') {
      return response.status(401).json({
        error: 'Unauthorized',
      })
    }
    return response.status(401).json({
      error: 'invalid token',
    })
  }
  next(error)
}

module.exports = {
  errorHandler, tokenExtractor, userExtractor,
}
