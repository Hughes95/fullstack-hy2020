import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

store.subscribe(() => {
  const storeNow = store.getState()
  console.log(storeNow)
})


const App = () => {
  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }

  const ok = () => {
    store.dispatch({
      type: 'OK'
    })
  }


  const bad = () => {
    store.dispatch({
      type: 'BAD'
    })
  }

  const reset = () => {
    store.dispatch({
      type: 'ZERO'
    })
  }

  const StatisticLine = (props) => {
    return (
      <div>
        <table >
          <tbody>
          <tr>
            <td>{props.text} </td>
            <td>{props.value}</td>
          </tr>
          </tbody>
        </table>
      </div>
    )
  }

  const Statistics = (props) => {
    const ke = (props.good - props.neutral) / (props.good + props.bad + props.neutral)
    const sum = (props.good+ props.bad + props.neutral)
    const pos = props.good / (props.good+ props.bad + props.neutral ) * 100 +' %'

    if ( (props.good + props.neutral + props.bad) === 0) {
      return (
        <div>
          No feedback
        </div>
      )
    }
    return (
      <div>
        <StatisticLine text="good" value ={props.good} />
        <StatisticLine text="bad" value ={props.bad} />
        <StatisticLine text="neutral" value ={props.neutral} />
        <StatisticLine text="All" value ={sum} />
        <StatisticLine text="Average" value ={ke} />
        <StatisticLine text="Positive" value ={pos} />
      </div>
    )
  }

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={good}>good</button> 
      <button onClick={ok}>neutral</button> 
      <button onClick={bad}>bad</button>
      <button onClick={reset}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>neutral {store.getState().ok}</div>
      <div>bad {store.getState().bad} </div>
      <h1>statistics</h1>
      <Statistics good={store.getState().good} neutral={store.getState().ok} bad={store.getState().bad}   />
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)