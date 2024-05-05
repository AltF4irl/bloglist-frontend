import { useState } from 'react'

const Blog = ({ blog, blogOwner, changeBlog }) => {
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

    changeBlog(blog.id, changedBlog)
  }

  return (
    <div className='blog'>
      <span style={{fontWeight: 'bold'}}>
        {blog.title} | {blog.author}
      </span>
      <button onClick={toggleBlogVisibility}>{blogVisible ? 'hide' : 'view'}</button>
      <div style={showWhenVisible}>
        {blog.url} <br />
        {blog.likes}
        <button onClick={likeHandler}>Like</button> <br />
        {blogOwner}
      </div>
    </div>  
  )
}

export default Blog