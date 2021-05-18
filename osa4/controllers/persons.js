const personsRouter = require('express').Router()
const Person = require('../models/person')


personsRouter.get('/info', (request, response) => {
    const aika = new Date(new Date());
    const day =  aika.toString(); 
    
    Person.find({}).then(p => {
      response.json("Phonebook has info for " + p.length + " people "+ day  )
    })
})

personsRouter.get('/', (request, response) => {
    Person.find({}).then(p => {
      response.json(p)
    })
})

personsRouter.get('/', (request, response) => {
    Person.find({}).then(p => {
      response.json(p)
    })
})
  
personsRouter.get('/', (request, response) => {
    Note.find({}).then(n => {
      response.json(n)
    })
})

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  
personsRouter.post('/', (request, response, next) => {
    const body = request.body
  
    if (body.name === undefined) {
      return response.status(400).json({ error: 'name must be unique' })
    }
  
    const person = new Person({
      id: getRandomInt(100),
      name: body.name,
      number: body.number,
    })
  
    person.save().then(savedP => savedP.toJSON())
    .then(savedAndFormatted => {
      response.json(savedAndFormatted)
    }) 
    .catch(error => next(error))
})

personsRouter.get('/:id', (request, response, next) => {
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
  
personsRouter.delete('/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
    .then(result => {
        response.status(204).end()
    })
    .catch(error => next(error))
})


personsRouter.put('/:id', (request, response, next) => {
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

module.exports = personsRouter