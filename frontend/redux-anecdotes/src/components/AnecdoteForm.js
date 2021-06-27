import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const NewAnedootti = () => {
  const dispatch = useDispatch()

  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    dispatch(createAnecdote(content))
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

export default NewAnedootti