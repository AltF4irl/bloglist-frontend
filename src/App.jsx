import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({ message: null, class: '' })
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs => {
      const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
      setBlogs( sortedBlogs )
  })  
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

  const createBlog = async (blogObject) => {
    blogService.setToken(user.token)

    try {
      const createdBlog = await blogService.create(blogObject)
      const createdBlogWithNname = {
        author: createdBlog.author,
        id: createdBlog.id,
        likes: createdBlog.likes,
        title: createdBlog.title,
        user: {
          id: createdBlog.user,
          name: user.name
        }
      }
      console.log("created blog", createdBlogWithNname)
      blogFormRef.current.toggleBlogFormVisbility()
      setBlogs(blogs.concat(createdBlogWithNname))
      setNotification({
        message: `A new blog ${blogObject.title} by ${blogObject.author} added`,
        class: 'notif'
      })
      setTimeout(() => {
        setNotification({message: null, class: ''})
      }, 5000)
    } catch (err) {
      console.log(err)
      setNotification({
        message: `Something went wrong`,
        class: 'error'
      })
      setTimeout(() => {
        setNotification({message: null, class: ''})
      }, 5000)
    }
  }

  const onLogoutClick = () => {
    setUser(null)
    window.localStorage.removeItem('logedInUser')
  }

  const changeBlog = async (id, changedBlog, blogCreator) => {
    console.log("id", id, "chnagdblog", changedBlog)
    try {
      const returnedBlog = await blogService.update(id, changedBlog)
      const returnedBlogv2 = {
        id: id,
        author: returnedBlog.author,
        likes: returnedBlog.likes,
        title: returnedBlog.title,
        url: returnedBlog.url,
        user: {
          id: returnedBlog.user.id,
          name: blogCreator
        }
      }
      setBlogs(blogs.map(blog => blog.id === returnedBlog.id ? returnedBlogv2 : blog))
    } catch (err) {
      console.log(err)
      setNotification({
        message: `Something went wrong`,
        class: 'error'
      })
      setTimeout(() => {
        setNotification({message: null, class: ''})
      }, 5000)
    }
  }

  const deleteBlog = async (id) => {

    blogService.setToken(user.token)

    try {
      await blogService.remove(id)
      setBlogs(blogs.filter(blog => blog.id !== id))
      setNotification({
        message: `Blog Deleted Successfully`,
        class: 'notif'
      })
      setTimeout(() => {
        setNotification({message: null, class: ''})
      }, 5000)
    } catch (err) {
      console.log(err)
      setNotification({
        message: `Something went wrong`,
        class: 'error'
      })
      setTimeout(() => {
        setNotification({message: null, class: ''})
      }, 5000)
    }
    
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
              data-testid='username'
              type='text'
              value={username}
              onChange={({ target }) => setUsername(target.value)}
              name='Username'
            />
          </div>
          <div>
            Password
            <input 
              data-testid='password'
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
        <BlogForm 
        createBlog={createBlog} 
        ref={blogFormRef} 
        />

        <hr style={{height: 10, border: 0}}></hr>

        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} currentUser={user.name} changeBlog={changeBlog} deleteBlog={deleteBlog} />
        )}
      </div>
      
    </div>
  )
}

export default App