import React from 'react'

const Name = ({ nimi }) => {
  return (
    <li>{nimi.name} {nimi.number}</li>
  )
}

export default Name