import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createNewBlog } from '../reducers/blogReducer'
import blogService from '../services/blogs'
import { Form, Button } from 'react-bootstrap'

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
        <Button variant='outline-dark' onClick={toggleBlogFormVisbility}>New Note</Button>
      </div>
      <div style={showWhenVisible}>
        <h1>Create New</h1>

        <Form onSubmit={submitBlogHandler}>
          <Form.Group>
            <Form.Label>Title:</Form.Label>
            <Form.Control 
              type='text'
              name='title'
              value={title}
              onChange={({ target }) => setTitle(target.value)}
              placeholder="Title"
            />
          </Form.Group>

          <Form.Group>
          <Form.Label>Author:</Form.Label>
            <Form.Control
              type="text"
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
              name="Author"
              placeholder="Author"
            />
          </Form.Group>

          <Form.Group>
          <Form.Label>URL:</Form.Label>
            <Form.Control
              type="text"
              value={url}
              onChange={({ target }) => setUrl(target.value)}
              name="Url"
              placeholder="Url"
            />
          </Form.Group>
          <br />
          <Button
            variant="outline-primary"
            type="submit"
          >
            Create
          </Button>
          <Button
            variant="outline-dark"
            onClick={toggleBlogFormVisbility}
          >
            Cancel
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default BlogForm
