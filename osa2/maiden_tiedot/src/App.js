import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'
import Maiden_tiedot from './components/Maiden_tiedot'


const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  const hook = () => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setNotes(response.data)
      })
  }

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      name: newNote,
    }
    setNotes(notes.concat(noteObject))
    setNewNote('')
  }

  const handlePerson = (event) => {
    console.log(event.target.value)   
    setNewNote(event.target.value)
  }
  let i = 1;
 
  useEffect(hook, [])

  if ( 1 < notes.length < 2 && newNote.length > 2) {
    console.log('Oikein')
    return (
      <div>
      <Filter new_={newNote} handle_={handlePerson} />
      {notes.filter(country => country.name.includes(newNote)).map(nimi => 
      <Maiden_tiedot key={i++} nimi={nimi} />)}
      </div>
    )
  }

  if( notes.length > 10 && newNote.length === 1) {
    console.log('Too many')
    return (
      <div>
      <Filter new_={newNote} handle_={handlePerson} />
      Too many matches, specify another filter
      </div>
    )
  } 


  return (
    <div>
        <Filter new_={newNote} handle_={handlePerson} />
        {notes.map(n => <Countries key={i++} countries={notes} new_={newNote} />)}
    </div>
  )
}

export default App 