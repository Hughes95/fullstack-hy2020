import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

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
  const ke = (props.good - props.neutral) / (props.good+ props.bad + props.neutral)
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

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handle1 = () => {
    setGood(good + 1)
  }

  const handle2= () => {
    setNeutral(neutral + 1)
  }

  const handle3= () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <div>
      <h1>give feedback</h1>
        <Button onClick={handle1} text='good' />
        <Button onClick={handle2} text='neutral' />
        <Button onClick={handle3} text='bad' />
        <h1>statistics</h1>
        <Statistics good={good} neutral={neutral} bad={bad}   />
      </div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))