import NotificationBanner from './NotificationBanner'
import loginService from '../services/login'
import { setUser } from '../reducers/userReducer'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const notification = useSelector(state => state.notification)

  const dispatch = useDispatch()

  const onLoginSubmit = async (e) => {
    e.preventDefault()
    const user = { username, password }

    const logedinUser = await loginService.login(user)
    window.localStorage.setItem('logedInUser', JSON.stringify(logedinUser))
    dispatch(setUser(logedinUser))
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <h1>Log in to App</h1>

      {notification.message !== null && <NotificationBanner />}

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

export default LoginForm
