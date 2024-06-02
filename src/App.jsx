import { useEffect } from 'react'
import BlogForm from './components/BlogForm'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './reducers/userReducer'
import NotificationBanner from './components/NotificationBanner'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import LogoutBanner from './components/LogoutBanner'

const App = () => {
  const dispatch = useDispatch()

  const notification = useSelector((state) => state.notification)
  const user = useSelector((state) => state.users)

  useEffect(() => {
    const logedUserJSON = window.localStorage.getItem('logedInUser')
    if (logedUserJSON) {
      const user = JSON.parse(logedUserJSON)
      dispatch(setUser(user))
    }
  }, [])

  if (user === null) {
    return <LoginForm />
  }

  return (
    <div>
      <h2>Blogs</h2>

      <hr style={{ height: 10, border: 0 }}></hr>

      {notification.message !== null && <NotificationBanner />}

      <LogoutBanner />

      <hr style={{ height: 10, border: 0 }}></hr>

      <div>
        <BlogForm />
        <hr style={{ height: 10, border: 0 }}></hr>
        <BlogList />
      </div>
    </div>
  )
}

export default App
