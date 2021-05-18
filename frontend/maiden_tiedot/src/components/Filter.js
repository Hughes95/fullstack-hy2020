import React from 'react'

const Filter = (props) => {
  
  return   <form>
            <div>find countries
            <input value={props.new_} onChange={props.handle_} />
            </div>
          </form>
}

export default Filter