import React from 'react'
import Name from './Name'

const Countries = (props) => {
  let i = 1;
  
  return  <div> 
      {props.countries.filter(country => country.name.includes(props.new_)).map(nimi => 
      <Name key={i++} nimi={nimi} />)}
     </div>}

export default Countries