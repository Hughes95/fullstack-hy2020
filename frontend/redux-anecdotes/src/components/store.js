import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import anecdotesReducer from '../reducers/anecdoteReducer'
import notificationReducer from '../reducers/notificationReducer'

const reducer = combineReducers({
    anedotes: anecdotesReducer,
    nofification: notificationReducer
})

const store = createStore(
    anecdotesReducer,
    composeWithDevTools(
      applyMiddleware(thunk)
   )
)
store.subscribe(() => console.log(store.getState()))

export default store