import { Route, Routes } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Homepage from './views/Homepage'
import { useDispatch, useSelector } from 'react-redux'
import LogoutBanner from './components/LogoutBanner'
import { useEffect } from 'react'
import { setUser } from './reducers/logedUserReducer'
import Userspage from './views/Userspage'

const App = () => {
  const user = useSelector((state) => state.logedUser)

  const dispatch = useDispatch()

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
      <LogoutBanner />
      <Routes>
        <Route
          path="/users"
          element={<Userspage />}
        />
        <Route 
          path='/'
          element={<Homepage />} 
        />
      </Routes>
    </div>
  )
}

export default App
