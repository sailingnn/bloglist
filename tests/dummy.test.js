const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})
describe('total likes', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      }
    ]
    
    const blogs = [
        {
          _id: "5a422a851b54a676234d17f7",
          title: "React patterns",
          author: "Michael Chan",
          url: "https://reactpatterns.com/",
          likes: 7,
          __v: 0
        },
        {
          _id: "5a422aa71b54a676234d17f8",
          title: "Go To Statement Considered Harmful",
          author: "Edsger W. Dijkstra",
          url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
          likes: 5,
          __v: 0
        },
        {
          _id: "5a422b3a1b54a676234d17f9",
          title: "Canonical string reduction",
          author: "Edsger W. Dijkstra",
          url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
          likes: 12,
          __v: 0
        },
        {
          _id: "5a422b891b54a676234d17fa",
          title: "First class tests",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
          likes: 10,
          __v: 0
        },
        {
          _id: "5a422ba71b54a676234d17fb",
          title: "TDD harms architecture",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
          likes: 0,
          __v: 0
        },
        {
          _id: "5a422bc61b54a676234d17fc",
          title: "Type wars",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
          likes: 2,
          __v: 0
        }  
    ]

    test('when list has only one blog, equals the likes of that', () => {
      const result = listHelper.totalLikes(listWithOneBlog)
      expect(result).toBe(5)
    })

    test('when list has many blogs, equals the likes of that', () => {
        const result = listHelper.totalLikes(blogs)
        expect(result).toBe(36)
      })

  })

  describe('favourite blogs', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      }
    ]
    
    const blogs = [
        {
          _id: "5a422a851b54a676234d17f7",
          title: "React patterns",
          author: "Michael Chan",
          url: "https://reactpatterns.com/",
          likes: 7,
          __v: 0
        },
        {
          _id: "5a422aa71b54a676234d17f8",
          title: "Go To Statement Considered Harmful",
          author: "Edsger W. Dijkstra",
          url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
          likes: 5,
          __v: 0
        },
        {
          _id: "5a422b3a1b54a676234d17f9",
          title: "Canonical string reduction",
          author: "Edsger W. Dijkstra",
          url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
          likes: 12,
          __v: 0
        },
        {
          _id: "5a422b891b54a676234d17fa",
          title: "First class tests",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
          likes: 10,
          __v: 0
        },
        {
          _id: "5a422ba71b54a676234d17fb",
          title: "TDD harms architecture",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
          likes: 0,
          __v: 0
        },
        {
          _id: "5a422bc61b54a676234d17fc",
          title: "Type wars",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
          likes: 2,
          __v: 0
        }  
    ]

    // const listWithTwoMax = [...blogs]
    // listWithTwoMax[3].likes = 12  //浅拷贝

    const emptyList = []

    test('when list has only one blog, equals the favourite blog of that', () => {
      const result = listHelper.favoriteBlog(listWithOneBlog)
      expect(result).toEqual(listWithOneBlog[0])
    })

    test('when list has many blogs, equals the favourite blog of that', () => {
        const result = listHelper.favoriteBlog(blogs)
        expect(result).toEqual(blogs[2])
      })

    // test('when list has two blogs with the same max likes, equals the favourite blog of that', () => {
    //     const result = listHelper.favoriteBlog(listWithTwoMax)
    //     // expect(result).toEqual(listWithTwoMax[2])
    //     expect(result.likes).toBe(12)
    // })

    test('when list is empty, equals the favourite blog of that', () => {
        const result = listHelper.favoriteBlog(emptyList)
        expect(result).toEqual(undefined)
    })

  })  

  describe('most blogs', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      }
    ]
    
    const blogs = [
        {
          _id: "5a422a851b54a676234d17f7",
          title: "React patterns",
          author: "Michael Chan",
          url: "https://reactpatterns.com/",
          likes: 7,
          __v: 0
        },
        {
          _id: "5a422aa71b54a676234d17f8",
          title: "Go To Statement Considered Harmful",
          author: "Edsger W. Dijkstra",
          url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
          likes: 5,
          __v: 0
        },
        {
          _id: "5a422b3a1b54a676234d17f9",
          title: "Canonical string reduction",
          author: "Edsger W. Dijkstra",
          url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
          likes: 12,
          __v: 0
        },
        {
          _id: "5a422b891b54a676234d17fa",
          title: "First class tests",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
          likes: 10,
          __v: 0
        },
        {
          _id: "5a422ba71b54a676234d17fb",
          title: "TDD harms architecture",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
          likes: 0,
          __v: 0
        },
        {
          _id: "5a422bc61b54a676234d17fc",
          title: "Type wars",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
          likes: 2,
          __v: 0
        }  
    ]

    // const listWithTwoMax = [...blogs]     //只能实现一维数组的深拷贝，对于一维以上是浅拷贝。
    // listWithTwoMax[3].author = "Edsger W. Dijkstra"  //浅拷贝

    // const listWithTwoMax = blogs.concat() //只能实现一维数组的深拷贝，对于一维以上是浅拷贝。
    // listWithTwoMax[3].author = "Edsger W. Dijkstra"  //浅拷贝

    // const listWithTwoMax = blogs.slice(0) //只能实现一维数组的深拷贝，对于一维以上是浅拷贝。
    // listWithTwoMax[3].author = "Edsger W. Dijkstra"  //浅拷贝

    const emptyList = []

    const ans1 = {
        author: 'Edsger W. Dijkstra',
        blogs: 1
    }

    const ans2 = {
        author: "Robert C. Martin",
        blogs: 3
    }
    // console.log('blogs:', blogs)
    test('when list has only one blog, equals the person with the most blog number of that', () => {
      const result = listHelper.mostBlogs(listWithOneBlog)
      expect(result).toEqual(ans1)
    })

    test('when list has many blogs, equals the person with the most blog number of that', () => {
        const result = listHelper.mostBlogs(blogs)
        expect(result).toEqual(ans2)
      })

    // test('when list has two blogs with the same max likes, equals the person with the most blog number of that', () => {
    //     const result = listHelper.mostBlogs(listWithTwoMax)
    //     // expect(result).toEqual(listWithTwoMax[2])
    //     expect(result.blogs).toBe(3)
    // })

    test('when list is empty, equals the person with the most blog number of that', () => {
        const result = listHelper.mostBlogs(emptyList)
        expect(result).toEqual(undefined)
    })

  })   

  describe('most likes', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      }
    ]
    
    const blogs = [
        {
          _id: "5a422a851b54a676234d17f7",
          title: "React patterns",
          author: "Michael Chan",
          url: "https://reactpatterns.com/",
          likes: 7,
          __v: 0
        },
        {
          _id: "5a422aa71b54a676234d17f8",
          title: "Go To Statement Considered Harmful",
          author: "Edsger W. Dijkstra",
          url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
          likes: 5,
          __v: 0
        },
        {
          _id: "5a422b3a1b54a676234d17f9",
          title: "Canonical string reduction",
          author: "Edsger W. Dijkstra",
          url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
          likes: 12,
          __v: 0
        },
        {
          _id: "5a422b891b54a676234d17fa",
          title: "First class tests",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
          likes: 10,
          __v: 0
        },
        {
          _id: "5a422ba71b54a676234d17fb",
          title: "TDD harms architecture",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
          likes: 0,
          __v: 0
        },
        {
          _id: "5a422bc61b54a676234d17fc",
          title: "Type wars",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
          likes: 2,
          __v: 0
        }  
    ]

    // const listWithTwoMax = [...blogs]     //只能实现一维数组的深拷贝，对于一维以上是浅拷贝。
    // listWithTwoMax[3].author = "Edsger W. Dijkstra"  //浅拷贝

    // const listWithTwoMax = blogs.concat() //只能实现一维数组的深拷贝，对于一维以上是浅拷贝。
    // listWithTwoMax[3].author = "Edsger W. Dijkstra"  //浅拷贝

    // const listWithTwoMax = blogs.slice(0) //只能实现一维数组的深拷贝，对于一维以上是浅拷贝。
    // listWithTwoMax[3].author = "Edsger W. Dijkstra"  //浅拷贝

    const emptyList = []

    const ans1 = {
        author: 'Edsger W. Dijkstra',
        likes: 5
    }

    const ans2 = {
        author: "Edsger W. Dijkstra",
        likes: 17
    }
    // console.log('blogs:', blogs)
    test('when list has only one blog, equals the person with the most blog number of that', () => {
      const result = listHelper.mostLikes(listWithOneBlog)
      expect(result).toEqual(ans1)
    })

    test('when list has many blogs, equals the person with the most blog number of that', () => {
        const result = listHelper.mostLikes(blogs)
        expect(result).toEqual(ans2)
      })

    // test('when list has two blogs with the same max likes, equals the person with the most blog number of that', () => {
    //     const result = listHelper.mostBlogs(listWithTwoMax)
    //     // expect(result).toEqual(listWithTwoMax[2])
    //     expect(result.blogs).toBe(3)
    // })

    test('when list is empty, equals the person with the most blog number of that', () => {
        const result = listHelper.mostLikes(emptyList)
        expect(result).toEqual(undefined)
    })

  })     