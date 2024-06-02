import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createNewBlog } from '../reducers/blogReducer'
import blogService from '../services/blogs'

const BlogForm = () => {
  const [blogFormVisible, setBlogFormVisible] = useState(false)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const user = useSelector((state) => state.logedUser)

  const dispatch = useDispatch()

  const showWhenVisible = { display: blogFormVisible ? '' : 'none' }
  const hideWhenVisible = { display: blogFormVisible ? 'none' : '' }

  const toggleBlogFormVisbility = () => {
    setBlogFormVisible(!blogFormVisible)
  }

  const createBlog = async (blogObject) => {
    blogService.setToken(user.token)

    const blogWithName = {
      author: blogObject.author,
      title: blogObject.title,
      url: blogObject.url,
      user: {
        name: user.name,
      },
    }
    toggleBlogFormVisbility()
    dispatch(
      createNewBlog(
        blogWithName,
        `A new blog ${blogObject.title} by ${blogObject.author} added`,
        'Something went wrong'
      )
    )
  }

  const submitBlogHandler = (e) => {
    e.preventDefault()
    const blogObject = { title, author, url }

    createBlog(blogObject)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleBlogFormVisbility}>New Note</button>
      </div>
      <div style={showWhenVisible}>
        <h1>Create New</h1>

        <form onSubmit={submitBlogHandler}>
          <div>
            Title:
            <input
              type="text"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
              name="Title"
              placeholder="Title"
            />
          </div>

          <div>
            Author:
            <input
              type="text"
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
              name="Author"
              placeholder="Author"
            />
          </div>

          <div>
            URL:
            <input
              type="text"
              value={url}
              onChange={({ target }) => setUrl(target.value)}
              name="Url"
              placeholder="Url"
            />
          </div>

          <br />

          <button type="submit">Create</button>
        </form>
        <button onClick={toggleBlogFormVisbility}>Cancel</button>
      </div>
    </div>
  )
}

export default BlogForm
