import React from 'react'
import Name from './Name'

const Persons = (props) => {
  let i = 1;
  
  const maat =  <div> {props.persons.filter(person => person.name.includes(props.newName)).map(nimi => 
    <Name key={i++} nimi={nimi} number={nimi.number} />
  )} </div>


  return  <div> 
      {maat}
     </div>}

export default Persons