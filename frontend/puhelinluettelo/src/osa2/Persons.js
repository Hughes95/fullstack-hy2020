import React from 'react'
import Name from './Name'

const Persons = (props) => {
  
  return  <div> {props.persons.filter(person => person.name.includes(props.newName)).map(nimi => 
    <Name key={nimi.id} 
    nimi={nimi} 
    number={nimi.number} 
    />)} 
    </div>}

export default Persons