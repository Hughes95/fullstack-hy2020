import React from 'react'
import { useSelector, useDispatch } from 'react-redux'


const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state)
    console.log('==='+anecdotes)

    const vote = (id, anecdotes) => {
        console.log('vote', id)
        dispatch({
          type: 'VOTE',
          id: anecdotes.id,
          votes: anecdotes.votes,
          content: anecdotes.content
        })

      }

      return (
        <div>
          {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote)}>vote</button>
          </div>
        </div>
      )}
        </div>
      )
}

export default AnecdoteList