import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import { useDispatch, useSelector } from 'react-redux'
import {
  initializeBlogs,
  createNewBlog,
  removeBlog,
  likeBlog,
} from './reducers/blogReducer'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()
  const dispatch = useDispatch()

  const blogs = useSelector((state) => state.blogs)
  console.log(blogs)

  const notification = useSelector((state) => state.notification)

  useEffect(() => {
    dispatch(initializeBlogs())
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

    const logedinUser = await loginService.login(user)
    window.localStorage.setItem('logedInUser', JSON.stringify(logedinUser))
    setUser(logedinUser)
    setUsername('')
    setPassword('')
  }

  const createBlog = async (blogObject) => {
    blogService.setToken(user.token)

    const blogWithNname = {
      author: blogObject.author,
      title: blogObject.title,
      url: blogObject.url,
      user: {
        name: user.name,
      },
    }
    blogFormRef.current.toggleBlogFormVisbility()
    dispatch(
      createNewBlog(
        blogWithNname,
        `A new blog ${blogObject.title} by ${blogObject.author} added`,
        'Something went wrong'
      )
    )
    // dispatch(throwNotification(`A new blog ${blogObject.title} by ${blogObject.author} added`))
  }

  const onLogoutClick = () => {
    setUser(null)
    window.localStorage.removeItem('logedInUser')
  }

  const changeBlog = async (id, changedBlog, blogCreator) => {
    console.log(changedBlog, "changegblog")
    dispatch(
      likeBlog(
        id,
        changedBlog,
        blogCreator,
        `${changedBlog.title} liked.`,
        'Something went wrong'
      )
    )
  }

  const deleteBlog = async (id) => {
    console.log(id, 'id')
    blogService.setToken(user.token)

    dispatch(
      removeBlog(id, 'Blog Deleted Successfully', 'Something went wrong')
    )
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
              data-testid="username"
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
              name="Username"
            />
          </div>
          <div>
            Password
            <input
              data-testid="password"
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              name="Password"
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>

      <hr style={{ height: 10, border: 0 }}></hr>

      {notification.message !== null && notificationBanner()}

      <div>
        Logged in with {user.name}
        <button onClick={onLogoutClick}>Logout</button>
      </div>

      <hr style={{ height: 10, border: 0 }}></hr>

      <div>
        <BlogForm
          createBlog={createBlog}
          ref={blogFormRef}
        />

        <hr style={{ height: 10, border: 0 }}></hr>

        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            currentUser={user.name}
            changeBlog={changeBlog}
            deleteBlog={deleteBlog}
          />
        ))}
      </div>
    </div>
  )
}

export default App
