import React from 'react'

const Filter = (props) => {
  
  return   <form>
            <div>filter
            <input value={props.new_} onChange={props.handle_} />
            </div>
          </form>
}

export default Filter