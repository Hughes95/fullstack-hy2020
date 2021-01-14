import React, { useState, useEffect } from 'react'

const Maiden_tiedot = ({ nimi } ) => {
const [languages, setlanguages] = useState(nimi.languages)

  return (
   <div> <h1>{nimi.name} </h1>
   <div>capital {nimi.capital} </div>
   <div>population {nimi.population} </div>
   <h3>languages</h3>
   {languages.map(language =>  <li key={language.id}>{language.name }</li>)}
   <div> <img src={nimi.flag} alt="" height="100" width="100" /></div>
   </div>
  )
}

export default Maiden_tiedot