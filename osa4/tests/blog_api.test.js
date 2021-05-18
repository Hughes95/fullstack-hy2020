const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_blog_helper.js')
const Blog = require('../models/blog')


beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.init__blogs)
})


test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('blogilistan testit, step2', () => {
  expect(Blog).toBeDefined();
})

test('all notes are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.init__blogs.length)
})

test('4.8: blogilistan testit, step 1', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(6)
})

test('4.10: blogilistan testit, step4', async () => {
  const newBlog = {
    title: true,
    author: true,
    url : true,
    likes : true || 0,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.init__blogs.length + 1)  
})



test('4.11*: blogilistan testit, step3', async () => {
  const newBlog = {
    title: true,
    author: true,
    url : true,
    likes : true,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.init__blogs.length + 1)  
})

test('blogilistan testit, step5', async () => {
  const newBlog = {
      author: true,
      likes : true,
      __v : 0
    }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.init__blogs.length)
})

describe('d4.13 blogilistan laajennus', () => {
  test('sstep1', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.init__blogs.length - 1
    )

    const title = blogsAtEnd.map(r => r.title)
    expect(title).not.toContain(blogToDelete.title)
  })
})


afterAll(() => {
    mongoose.connection.close()
})