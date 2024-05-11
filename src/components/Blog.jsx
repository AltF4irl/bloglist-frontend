import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, currentUser, changeBlog, deleteBlog, /*onClick*/ }) => { //on click only for testing
  const [blogVisible, setBlogVisible] = useState(false)
  
  const showWhenVisible = { display: blogVisible ? '' : 'none' }

  const toggleBlogVisibility = () => {
    setBlogVisible(!blogVisible)
  }

  const likeHandler = () => {
    const changedBlog = {
      author: blog.author,
      likes: blog.likes + 1,
      title: blog.title,
      url: blog.url,
      user: blog.user.id
    }

    changeBlog(blog.id, changedBlog, blog.user.name)
  }

  const removeBlogHandler = () => {
    deleteBlog(blog.id)
  }

  return (
    <div className='blog'>
      <span style={{fontWeight: 'bold'}}>
        {blog.title} | {blog.author}
      </span>
      <button onClick={toggleBlogVisibility}>{blogVisible ? 'hide' : 'view'}</button>
      <div style={showWhenVisible} className='dropdownElement'>
        <span>{blog.url}</span><br />
        <span>{blog.likes}</span>
        <button onClick={likeHandler}>Like</button> <br /> 
        {/* <button onClick={onClick}>Like</button> <br /> //for testing only */}
        {blog.user.name} <br />
        {currentUser === blog.user.name && <button onClick={removeBlogHandler} >Remove</button>}    
      </div>
    </div>  
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  currentUser: PropTypes.string.isRequired,
  changeBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default Blog