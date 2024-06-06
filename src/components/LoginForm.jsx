import NotificationBanner from './NotificationBanner'
import loginService from '../services/login'
import { setUser } from '../reducers/logedUserReducer'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Container } from 'react-bootstrap'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const notification = useSelector((state) => state.notification)

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
    <Container>
      <h1>Log in to App</h1>

      {notification.message !== null && <NotificationBanner />}

      <Form onSubmit={onLoginSubmit}>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            data-testid="username"
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            name="Username"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            data-testid="password"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            name="Password"
          />
        </Form.Group>
        <Button style={{marginTop: '5px'}} type="submit">Login</Button>
      </Form>
    </Container>
  )
}

export default LoginForm
