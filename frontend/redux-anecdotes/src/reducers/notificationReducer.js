const notificationReducer = ( state = 'render here notification...', action) => {
    console.log(action)
    switch (action.type) {
      case 'NOTIFICATION':
        return action.nofication
      default: 
        return state
    }
}

export const nofifi = nofication => {
    return { 
      type: 'NOTIFICATION',
      nofication,
    }
  }



export default notificationReducer