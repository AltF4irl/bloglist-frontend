import { Table } from 'react-bootstrap'
import blogService from '../services/blogs'
import { removeBlog } from '../reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.logedUser)
  const dispatch = useDispatch()
  const deleteBlog = async (id) => {
    blogService.setToken(user.token)

    dispatch(
      removeBlog(id, 'Blog Deleted Successfully', 'Something went wrong')
    )
  }
  const removeBlogHandler = (id) => {
    deleteBlog(id)
  }

  return (
    <div>
      <Table striped>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </td>
              <td>{blog.author}</td>
              <td>
                {user.name === blog.user.name && (
                  <button onClick={() => removeBlogHandler(blog.id)}>
                    Remove
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default BlogList
