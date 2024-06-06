import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { likeBlog } from '../reducers/blogReducer'
import CommentSection from '../components/CommentSection'
import { useEffect } from 'react'
import { getComments } from '../reducers/commentReducer'
import NotificationBanner from '../components/NotificationBanner'

const IndividualBlogPage = () => {
  const id = useParams().id
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getComments(id))
  }, [])

  const blogs = useSelector((state) => state.blogs)
  const blog = blogs.find((blog) => blog.id === id)

  if (!blog) {
    return null
  }

  const changeBlog = (id, changedBlog, blogCreator) => {
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

  const likeHandler = () => {
    const changedBlog = {
      author: blog.author,
      likes: blog.likes + 1,
      title: blog.title,
      url: blog.url,
      user: blog.user.id,
    }

    changeBlog(blog.id, changedBlog, blog.user.name)
  }
  return (
    <div>
      <NotificationBanner />
      <h1>
        {blog.title} | {blog.author}
      </h1>
      <div>
        <a href={blog.url}>{blog.url}</a>
        <br />
        {blog.likes} likes<button onClick={likeHandler}>like</button> <br />
        Added by {blog.user.name}
      </div>
      <CommentSection />
    </div>
  )
}

export default IndividualBlogPage
