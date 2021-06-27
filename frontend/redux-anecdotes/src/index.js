import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import App from './App'
import store from './components/store'

//const store = createStore(anecdotesReducer, composeWithDevTools())
store.subscribe(() => console.log(store.getState()))


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)