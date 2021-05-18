const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
const notesRouter = require('./controllers/notes')
const personsRouter = require('./controllers/persons')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')

const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const logger2 = require('./utils/logger')
const loginRouter = require('./controllers/login')

const bodyParser = require('body-parser')


logger.info('connecting to', config.MONGODB_URI)
logger2.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })


const morgan = require('morgan')

morgan.token('type', function (req, res) { 
    const body = req.body 
    return JSON.stringify({ name: body.name, number: body.number })
  })
  
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :type')) 
  
app.use(bodyParser.json())

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/notes', notesRouter)
app.use('/api/persons', personsRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)


app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)


module.exports = app