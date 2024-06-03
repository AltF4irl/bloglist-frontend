import { Route, Routes, useMatch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { setUser } from './reducers/logedUserReducer'
import { initializeBlogs } from './reducers/blogReducer'

import Userspage from './views/Userspage'
import LoginForm from './components/LoginForm'
import Homepage from './views/Homepage'
import LogoutBanner from './components/LogoutBanner'
import IndividualUserPage from './views/IndividualUserPage'
import IndividualBlogPage from './views/IndividualBlogPage'

const App = () => {
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  const user = useSelector((state) => state.logedUser)
  const blogs = useSelector((state) => state.blogs)
  console.log('blogs', blogs)
  const users = useSelector((state) => state.users)
  const dispatch = useDispatch()
  const userMatch = useMatch('/users/:id')

  const userBlogs = userMatch
    ? blogs.filter((blog) => blog.user.id === userMatch.params.id)
    : null

  const blogUser = userMatch
    ? users.find((user) => user.id === userMatch.params.id)
    : null

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
          path="/"
          element={<Homepage />}
        />
        <Route
          path="/users/:id"
          element={
            <IndividualUserPage
              userBlogs={userBlogs}
              blogUser={blogUser}
            />
          }
        />
        <Route
          path="/blogs/:id"
          element={<IndividualBlogPage />}
        />
      </Routes>
    </div>
  )
}

export default App
