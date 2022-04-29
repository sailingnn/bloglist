const  _ = require('lodash')

const dummy = (blogs) => {
    return 1
  }
  
const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item
      }
    
    return blogs.map(blog => blog.likes).reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    let max = blogs.length !== 0 ? blogs.reduce((prev, next) => {
        return prev.likes > next.likes ? prev : next
    }) : undefined
    console.log('max:', max)
    return max
}

const mostBlogs = (blogs) => {
    // let count = blogs.length !== 0 ? blogs.reduce((new_obj, value) => {
    //     let key = value['author']
    //     // console.log('key:', key)
    //     if(!new_obj[key]){
    //         new_obj[key] = 0
    //     }
    //     new_obj[key] += 1
    //     return new_obj
    // }, {}) : undefined
    // console.log('count:', count)
    // let test = _.countBy(blogs, 'author')
    // const newtest = _.transform(test, (result, value, key) => {
    //                     result.push({
    //                         author: key, 
    //                         blogs: value
    //                     })                   
    //             }, []);
    // console.log('test:', test)
    // console.log('transform:', newtest)
    // console.log('maxby:', _.maxBy(newtest, 'blogs'))
    const max = blogs.length !== 0 ? 
                _.chain(blogs)
                .countBy('author')
                .commit()    //使上面的步骤立即执行
                .transform((result, value, key) => {
                    result.push({
                        author: key, 
                        blogs: value
                    })                   
                }, [])
                .maxBy('blogs')
                .value() : undefined
    // console.log('new max:', max)
    return max
}

  module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs
  }