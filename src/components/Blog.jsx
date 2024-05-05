import { useState } from 'react'

const Blog = ({ blog, blogOwner }) => {
  const [blogVisible, setBlogVisible] = useState(false)
  
  const showWhenVisible = { display: blogVisible ? '' : 'none' }

  const toggleBlogVisibility = () => {
    setBlogVisible(!blogVisible)
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
        <button>Like</button> <br />
        {blogOwner}
      </div>
    </div>  
  )
}

export default Blog