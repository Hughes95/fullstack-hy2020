import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login' 
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Blogform from './components/Blogform'
import Togglable from './components/Togglable'
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
  const [loginVisible, setLoginVisible] = useState(false)
  const [newlikes, setLikes] = useState(0) 

  const noteFormRef = useRef()


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

  const addBlog = (blogObject) => {
    noteFormRef.current.toggleVisibility()
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


  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }




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

  const poistaa = (id) => {
    const blog = blogs.find(n => n.id === id)

    if (window.confirm("Remove blog " + blog.title + " by "+ blog.author)) {
      blogService
        .poista(id)
        .then(setErrorMessage(
          ` ${blog.title} is deleted`
        ))
        .then(setTimeout(() => {
          setErrorMessage(null)
        }, 5000)   )
        .catch(error => {
          setBlogs(null)
        })
      window.location.reload()
    }
  }
  
  const updateBlog = (id, like) => {
    const blog = blogs.find(n => n.id === id)
    setLikes(like)
    var summa = like + 1
    const changed = { ...blog, likes: summa}

    blogService.update(id, changed)
      .catch(error => {
        setBlogs(null)})
    window.location.reload()
  }


  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in</p>
      {logoutForm}
      <h2>create new</h2>
      <Togglable buttonLabel="new blog"  kiinni="cancel" ref={noteFormRef}>
        <Blogform createBlog={addBlog}
          title={title}
          author={author}
          url={url}/>
      </Togglable> 
      <p></p>
      {blogs.map(blog => 
        <Blog key={blog.id} blog={blog} name={user.name}  painaa={() => poistaa(blog.id)} lisaa_likes={() => updateBlog(blog.id, blog.likes)}  />
      )}
    </div>
  )
}

export default App