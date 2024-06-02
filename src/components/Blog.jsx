import { useState } from 'react'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'
import { removeBlog, likeBlog } from '../reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'

const Blog = ({ blog /*onClick*/ }) => {
  //on click only for testing
  const [blogVisible, setBlogVisible] = useState(false)
  const showWhenVisible = { display: blogVisible ? '' : 'none' }
  const user = useSelector((state) => state.logedUser)

  const dispatch = useDispatch()

  const toggleBlogVisibility = () => {
    setBlogVisible(!blogVisible)
  }

  const changeBlog = async (id, changedBlog, blogCreator) => {
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

  const deleteBlog = async (id) => {
    blogService.setToken(user.token)

    dispatch(
      removeBlog(id, 'Blog Deleted Successfully', 'Something went wrong')
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

  const removeBlogHandler = () => {
    deleteBlog(blog.id)
  }

  return (
    <div className="blog">
      <span
        data-testid="blogheader"
        style={{ fontWeight: 'bold' }}
      >
        {blog.title} | {blog.author}
      </span>
      <button onClick={toggleBlogVisibility}>
        {blogVisible ? 'hide' : 'view'}
      </button>
      <div
        style={showWhenVisible}
        className="dropdownElement"
      >
        <span>{blog.url}</span>
        <br />
        <span className="likes">{blog.likes}</span>
        <button onClick={likeHandler}>Like</button> <br />
        {/* <button onClick={onClick}>Like</button> <br /> //for testing only */}
        {blog.user.name} <br />
        {user.name === blog.user.name && (
          <button onClick={removeBlogHandler}>Remove</button>
        )}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog
