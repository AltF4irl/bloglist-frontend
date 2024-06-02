import { useDispatch, useSelector } from "react-redux"
import { setUser } from "../reducers/userReducer"

const LogoutBanner = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.users)

  const onLogoutClick = () => {
    dispatch(setUser(null))
    window.localStorage.removeItem('logedInUser')
  }

  return (
    <div>
      Logged in with {user.name}
      <button onClick={onLogoutClick}>Logout</button>
    </div>
  )
}

export default LogoutBanner
