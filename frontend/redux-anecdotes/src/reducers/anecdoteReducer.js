import Service from '../services/anecdotes'


export const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

export const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  }
}

const initialState = anecdotesAtStart.map(asObject)


const anecdotesReducer = (state = [], action) => {
  const Olio = state.filter(anecdote => anecdote.id === action.id )
  const uusiOlio = {
    content: Olio.map(n => n.content)[0],
    id: action.id,
    votes: Olio.map(n => n.votes)[0] + 1
  }
  //console.log('state now: ', uusiOlio)
  //console.log('state now: ', Olio.map(n => n.content))
  //console.log('action', action.content)
  //console.log('action', action.id)
  //console.log('action', action.votes)
 
  switch (action.type) {
    case 'NEW_NOTE':
      return [...state, action.data]
    case 'INIT_NOTES':
      return action.data
    case 'VOTE':
      const Olio2 = state.filter(anecdote => anecdote.id === action.id )
      const id = action.id
      const uusiOlio2 = {
        content: action.content,
        id: action.id,
        votes: action.votes + 1
      }
      return state.map(olio => olio.id !== id ? olio : uusiOlio2)
    default:
      return state  }
}


export const createAnecdote = content => {
  return async dispatch => {
    const newNote = await Service.createNew(content)
    dispatch({
      type: 'NEW_NOTE',
      data: newNote,
    })
  }
}


export const initializeAnecdote = () => {
  return async dispatch => {
    const anecdotes = await Service.getAll()
    dispatch({
      type: 'INIT_NOTES',
      data: anecdotes,
    })
  }
}


export default anecdotesReducer