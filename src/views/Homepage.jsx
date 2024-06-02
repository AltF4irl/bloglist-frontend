import BlogForm from '../components/BlogForm'
import { useSelector } from 'react-redux'
import NotificationBanner from '../components/NotificationBanner'
import BlogList from '../components/BlogList'

const Homepage = () => {
  const notification = useSelector((state) => state.notification)

  return (
    <div>
      <h2>Blogs</h2>

      {notification.message !== null && <NotificationBanner />}

      <div>
        <BlogForm />
        <hr style={{ height: 10, border: 0 }}></hr>
        <BlogList />
      </div>
    </div>
  )
}

export default Homepage
