import React from 'react'

const Person = ({ person, painaa }) => {
  const label = person.name
    ? 'delete' : 'delete'

  return (
    <div>
      {person.name} {person.number}  
      <button onClick={painaa}>{label}</button>
    </div>
  )
}
export default Person