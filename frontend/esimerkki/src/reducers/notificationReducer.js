const notificationReducer = ( state = 'render here notification...', action) => {
  console.log(state)
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.nofication
    default: 
      return state
  }
}

export const nofifi = nofication => {
  return { 
    type: 'SET_NOTIFICATION',
    nofication,
  }
}



export default notificationReducer