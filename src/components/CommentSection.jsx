import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const CommentSection = () => {
  const blogId = useParams().id
  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === blogId)
  )
  return (
    <div>
      <h2>Comments</h2>
      <ul>
        {blog.comments.map((comment) => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>
    </div>
  )
}

export default CommentSection
