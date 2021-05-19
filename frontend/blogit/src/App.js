import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login' 
import Notification from './components/Notification'
import './index.css'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const [title, setTitle] = useState('') 
  const [author, setAuthor] = useState('') 
  const [url, setUrl] = useState('') 


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url,
    }

    blogService
    .create(blogObject)
    .then(setErrorMessage(
      `a new blog '${title}' by ${author}` 
    ))
    .then(setTimeout(() => {
      setErrorMessage(null)
    }, 5000)   )
    .then(returned=> {
    setUser(user.concat(returned))
    setUsername('')
    setPassword('')
    })
    .catch(error => {
    var virhe = JSON.stringify(error.response.data.error);
      setErrorMessage(virhe)

      console.log(error.response.data.error)
    })
    window.location.reload()
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedappUser', JSON.stringify(user)
      ) 

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong username or password')
      console.log(errorMessage)

      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    setUsername('')
    localStorage.clear()
  }

  const handle_title = (event) => {
    console.log(event.target.value)   
    setTitle(event.target.value)
  }

  const handle_author = (event) => {
    console.log(event.target.value)   
    setAuthor(event.target.value)
  }

  const handle_url = (event) => {
    console.log(event.target.value)   
    setUrl(event.target.value)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const Create_New = () => (
    <form onSubmit={addBlog}>
      <div>title<input value={title} onChange={handle_title} name="title" /></div>
      <div>author<input value={author} onChange={handle_author} name="author" /></div>
      <div>url<input value={url} onChange={handle_url} name="url" /></div>
      <button type="submit">create</button>
    </form>      
  )



  const logoutForm = (
    <form onSubmit={handleLogout}>
    <div>
    <button type="submit">logout</button>
    </div>
    </form>
  )

  if (user === null) {
    return (
      <div>
        <Notification message={errorMessage} />
        <h2>Log in to application</h2>
        {user === null && loginForm()}
      </div>
    )
  }


  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in</p>
      {logoutForm}
      <h2>create new</h2>
      <div>{Create_New()}</div>
      <p></p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App