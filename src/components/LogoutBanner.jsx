import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../reducers/logedUserReducer'
import { Link } from 'react-router-dom'
import { Navbar, Container, Button, Nav } from 'react-bootstrap'

const LogoutBanner = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.logedUser)

  const onLogoutClick = () => {
    dispatch(setUser(null))
    window.localStorage.removeItem('logedInUser')
  }

  const margin = {
    marginRight: '5px',
  }

  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Blogs</Navbar.Brand>
        <Navbar.Toggle />
        <Nav className="me-auto">
          <Link style={margin} to="/">Home</Link>
          <Link style={margin} to="/users">Users</Link>
        </Nav>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: {user.name}
            <Button onClick={onLogoutClick}>Logout</Button>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default LogoutBanner
