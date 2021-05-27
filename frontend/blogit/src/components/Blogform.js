import React, { useState } from 'react'

const Blogform = ({ createBlog }) => {
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('') 
  const [author, setAuthor] = useState('') 
  const [url, setUrl] = useState('') 


  const handle_title = (event) => {
    setTitle(event.target.value)
  }
    
  const handle_author = (event) => {
    setAuthor(event.target.value)
  }
    
  const handle_url = (event) => {
    setUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url,
    })

    setUser(null)
    setUsername('')
    setPassword('')

  }
    
  return (
    <div className="formDiv">
      <form onSubmit={addBlog}>
        <div>title<input value={title} onChange={handle_title} name="title" id="title"/></div>
        <div>author<input value={author} onChange={handle_author} name="author" id="author"/></div>
        <div>url<input value={url} onChange={handle_url} name="url" id="url"/></div>
        <button id='create-button' type="submit">create</button>
      </form>
    </div>
  )          
}

export default Blogform