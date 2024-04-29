import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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
    console.log("credentials", username, password)

    const user = { username, password }

    try {
      const logedinUser = await loginService.login(user)
      console.log(logedinUser)
      window.localStorage.setItem('logedInUser', JSON.stringify(logedinUser))
      setUser(logedinUser)
      setUsername('')
      setPassword('')
    } catch (err) {
      console.log('wrong credentials')
      setUsername('')
      setPassword('')
    }
  }

  const onLogoutClick = () => {
    setUser(null)
    window.localStorage.removeItem('logedInUser')
  }

  if (user === null) {
    return (
      <div>
        <h1>Log in to App</h1>
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
      <p>Logged in with {user.name}</p>
      <button onClick={onLogoutClick}>Logout</button>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App