import React from 'react'

const Header = (props) => {
    console.log(props)
    return (<div>
      <h1>{props.header1}</h1>
      <h2>{props.header2}</h2>
    </div>)
  }

  export default Header