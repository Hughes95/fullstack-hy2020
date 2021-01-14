import React from 'react'

const Filter = (props) => {
  
  return   <form>
            <div>filter shown with
            <input value={props.newName} onChange={props.handlePerson} />
            </div>
          </form>
}

export default Filter