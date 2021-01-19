import React, { useState, useEffect } from 'react'
import Filter from './osa2/Filter'
import PersonForm from './osa2/PersonForm'
import personsService from './services/persons'
import Notification from './components/Notification'
import './index.css'
import Person from './components/Person'


const App = () => {
    const [ persons, setPersons] = useState([]) 
      const [ newName, setNewName ] = useState('')
      const [ newNumber, setNewNumber ] = useState('')
      const [ etsi, setNewetsi] = useState('')
      const [showAll, setShowAll] = useState(true)
      const [errorMessage, setErrorMessage] = useState(null)

      useEffect(() => {
        personsService
        .getAll()
        .then(initialPersons => {
          setPersons(initialPersons)
        })
      }, [])
      
      const addName = (event) => {
        event.preventDefault()
        const personObject = {
          name: newName,
          number: newNumber,
          id: persons.length + 1,
        }

        personsService
        .create(personObject)
        .then(setErrorMessage(
          `Note '${newName}' added to phonebook`
        ))
        .then(setTimeout(() => {
          setErrorMessage(null)
        }, 5000)   )
        .then(returned=> {
        setPersons(persons.concat(returned))
        setNewName('')
        setNewNumber('')
        })
        .catch(error => {
        var virhe = JSON.stringify(error.response.data.error);
          setErrorMessage(virhe)

          console.log(error.response.data.error)
        })
        window.location.reload()
      }

      const updateNumber = (id) => {
        const url = `http://localhost:3001/persons/${id}`
        const person = persons.find(n => n.id === id)
        const changed = { ...person, number: newNumber }

        if( window.confirm( person.name + " is already added to phonebook, replace the old number with new one?") ) {
            personsService
            .update(id, changed)
            window.location.reload()
            .then(setErrorMessage(
              ` ${person.name} is updated`
            ))
            .then(setTimeout(() => {
              setErrorMessage(null)
            }, 2500)   )
            .then(returned => {
              setPersons(persons.map(p => person.id !== id ? p : returned))
            })
            .catch(error => {
              setPersons(persons.filter(n => n.id !== id))
              setErrorMessage(
                `Information of ${person.name} has already been removed from server`
              )
              setTimeout(() => {
                setErrorMessage(null)
              }, 2500)   
            })
        }
      }

      const poistaa = (id) => {
        const url = `http://localhost:3001/persons/${id}`
        const person = persons.find(n => n.id === id)
        const changedNote = { ...person, important: person.important }
      
        if (window.confirm("Delete " + person.name + " ?")) {
          personsService
          .poista(id)
          .then(setErrorMessage(
            ` ${person.name} is deleted`
          ))
          .then(setTimeout(() => {
            setErrorMessage(null)
          }, 5000)   )
          .then(returned => {
            setPersons(persons.map(p => p.id !== id ? p : returned))
          })
          .catch(error => {
            setPersons(persons.filter(n => n.id !== id))
          })
          window.location.reload()
        }
      }

      const handleEtsi = (event1) => {
        setNewetsi(event1.target.value)
      }

      const handlePerson = (event) => {
        console.log(event.target.value)   
        setNewName(event.target.value)
      }

      const handleNumber = (event) => {
        console.log(event.target.value)   
        setNewNumber(event.target.value)
      }
      
    const personsToShow = showAll
    ? persons
    : persons.filter(person => person.name)


    const paivittaa =  persons.find( ({name}) => name === newName  );

    if(persons.map(kaikki => kaikki.name).includes(newName) === true && persons.map(kaikki => kaikki.id).includes(newName.id) === false ) {
      console.log(paivittaa.id)
      updateNumber(paivittaa.id)
    }

      return (
      <div>
      <Notification message={errorMessage} />
      <h2>Phonebook</h2>    
        <Filter newName={etsi} handlePerson={handleEtsi}  />
        <h3>Add a new</h3>
        <PersonForm addName={addName} newName={newName} handlePerson={handlePerson} 
        newNumber={newNumber} handleNumber={handleNumber} />
        <h2>Numbers</h2>
          {personsToShow.filter(person => person.name.includes(etsi)).map((
          (person, i) => <Person key={i} 
          person={person} 
          painaa={() => poistaa(person.id)}/> ))} 
          </div>
    )
  }

export default App 