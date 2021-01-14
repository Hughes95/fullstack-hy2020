require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Note = require('./models/note')
const Person = require('./models/person')

const bodyParser = require('body-parser')
const cors = require('cors')
const { collection } = require('./models/note')

app.use(bodyParser.json())
app.use(cors())
app.use(express.json())
app.use(express.static('build'))

app.get('/info', (request, response) => {
  const aika = new Date(new Date());
  const day =  aika.toString(); 
  
  Person.find({}).then(p => {
    response.json("Phonebook has info for " + p.length + " people "+ day  )
  })
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(p => {
    response.json(p)
  })
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (body.name === undefined) {
    return response.status(400).json({ error: 'name missing' })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then(savedP => savedP.toJSON())
  .then(savedAndFormatted => {
    response.json(savedAndFormatted)
  }) 
  .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(p => {
      if (p) {
        response.json(p)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
  })

  app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
      .then(result => {
        response.status(204).end()
      })
      .catch(error => next(error))
  })

  app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body
  
    const person = {
      name: body.name,
      number: body.number,
    }
  
    Person.findByIdAndUpdate(request.params.id, person, { new: true })
      .then(updated => {
        response.json(updated)
      })
      .catch(error => next(error))
  })
  
  const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }

  app.use(unknownEndpoint)

  const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError' && error.kind == 'ObjectId') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
    } 
  
    next(error)
  }
  
  app.use(errorHandler)

  const PORT = process.env.PORT 


  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })