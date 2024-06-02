import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../reducers/logedUserReducer'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import UserList from './UserList'

const LogoutBanner = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.logedUser)

  const onLogoutClick = () => {
    dispatch(setUser(null))
    window.localStorage.removeItem('logedInUser')
  }

  const padding = {
    paddingRight: '5px',
  }

  return (
    <div>
      <Link to="/" style={padding}>Home</Link>
      <Link to="/users" style={padding}>Users</Link>
      Logged in with {user.name}
      <button onClick={onLogoutClick}>Logout</button>
    </div>
  )
}

export default LogoutBanner
