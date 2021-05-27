import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'



const Blog = ({ blog, name, painaa, lisaa_likes, ref }) => {
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const toggleVisibility2 = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author}
        <span>{blog.content}</span>
        <button id='view' onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        {blog.title} {blog.author}<button id='hide' onClick={toggleVisibility2}>hide</button><br></br>
        {blog.url}<br></br>
        likes {blog.likes} <button id="likes" onClick={lisaa_likes} >like</button><br></br>
        {name}<br></br>
        <button id='poista' onClick={painaa}>remove</button>
      </div>
    </div>
  )}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  painaa: PropTypes.func.isRequired

}

export default Blog
