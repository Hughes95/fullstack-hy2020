const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const body = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()
  if (savedUser === undefined) {
    return response.status(400).json({ error: 'username missing'})
  }else{
    response.json(savedUser)
  }
})

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs', {url: 1, title: 1, author: 1})
    .find({}).populate('notes', {content: 1, date: 1})

  response.json(users.map(u => u.toJSON()))
})


module.exports = usersRouter