import React from 'react'
import { useSelector } from 'react-redux'
import { nofifi } from '../reducers/notificationReducer'


const Notification = () => {
  const notification = useSelector(state => state)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {nofifi('')}
    </div>
  )
}

export default Notification