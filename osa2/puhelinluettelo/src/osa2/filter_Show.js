import React from 'react'
import Name from './Name'

const Show = (props) => {
  
  const filter_Show =  <div> {props.persons.filter(person => person.name.includes(props.etsi)).map(nimi => 
    <Name key={nimi.id} nimi={nimi} number={nimi.number} />
    )} 
     </div>

  return  <div> 
      {filter_Show}
     </div>}

export default Show