import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notification, setNotification] = useState({ message: null, class: '' })

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const logedUserJSON = window.localStorage.getItem('logedInUser')
    if (logedUserJSON) {
      const user = JSON.parse(logedUserJSON)
      setUser(user)
    }
  }, [])

  const onLoginSubmit = async (e) => {
    e.preventDefault()
    const user = { username, password }

    try {
      const logedinUser = await loginService.login(user)
      window.localStorage.setItem('logedInUser', JSON.stringify(logedinUser))
      setUser(logedinUser)
      setUsername('')
      setPassword('')
    } catch (err) {
      setNotification({
        message: `Wrong Username or Password`,
        class: 'error'
      })
      setTimeout(() => {
        setNotification({message: null, class: ''})
      }, 5000)
      console.log('wrong credentials')
      setUsername('')
      setPassword('')
    }
  }

  const onBlogSubmit = async (e) => {
    e.preventDefault()
    console.log(title, author, url)
    const blog = { title, author, url }
    blogService.setToken(user.token)

    try {
      const createdBlog = await blogService.create(blog)
      setBlogs(blogs.concat(createdBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
      setNotification({
        message: `A new blog ${blog.title} by ${blog.author} added`,
        class: 'notif'
      })
      setTimeout(() => {
        setNotification({message: null, class: ''})
      }, 5000)
    } catch (err) {
      console.log(err)
      setNotification({
        message: `Somthing went wrong`,
        class: 'error'
      })
      setTimeout(() => {
        setNotification({message: null, class: ''})
      }, 5000)
      setTitle('')
      setAuthor('')
      setUrl('')
    }
  }

  const onLogoutClick = () => {
    setUser(null)
    window.localStorage.removeItem('logedInUser')
  }

  const notificationBanner = () => (
    <div className={notification.class}>{notification.message}</div>
  )

  if (user === null) {
    return (
      <div>
        <h1>Log in to App</h1>

        {notification.message !== null && notificationBanner()}

        <form onSubmit={onLoginSubmit}>
          <div>
            Username
            <input 
              type='text'
              value={username}
              onChange={({ target }) => setUsername(target.value)}
              name='Username'
            />
          </div>
          <div>
            Password
            <input 
              type='password'
              value={password}
              onChange={({target}) => setPassword(target.value)}
              name='Password'
            />
          </div>
          <button type='submit'>Login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>

      <hr style={{height: 10, border: 0}}></hr>
      
      {notification.message !== null && notificationBanner()}
      
      <div>
        Logged in with {user.name}
        <button onClick={onLogoutClick}>Logout</button>
      </div>

      <hr style={{height: 10, border: 0}}></hr>

      <div>
        <h1>Create New</h1>

        <form onSubmit={onBlogSubmit}>
          <div>
            Title:
            <input 
              type='text'
              value={title}
              onChange={({target}) => setTitle(target.value)}
              name='Title'
            />
          </div>
          
          <div>
            Author:
            <input 
              type='text'
              value={author}
              onChange={({target}) => setAuthor(target.value)}
              name='Author'
            />
          </div>
          
          <div>
            URL:
            <input 
              type='text'
              value={url}
              onChange={({target}) => setUrl(target.value)}
              name='Url'
            />
          </div>

          <br />

          <button type='submit'>Create</button>
        </form>

        <hr style={{height: 10, border: 0}}></hr>

        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
      
    </div>
  )
}

export default App