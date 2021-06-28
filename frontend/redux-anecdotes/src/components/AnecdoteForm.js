import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const NewAnedootti = (props) => {

  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    props.createAnecdote(content)
  }

  return (
    <div>
    <form onSubmit={addNote}>
      <input name="note" />
      <button type="submit">add</button>
    </form>
    </div>
  )
}

export default connect(
  null, 
  { createAnecdote }
)(NewAnedootti)