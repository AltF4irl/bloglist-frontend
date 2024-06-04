import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addComment } from '../reducers/blogReducer'
import commentService from '../services/comments'
import { throwNotification } from '../reducers/notificationReducer'

const CommentSection = () => {
  const [comment, setComment] = useState('')
  const blogId = useParams().id
  const dispatch = useDispatch()
  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === blogId)
  )
  const user = useSelector(state => state.logedUser)

  const commentSubmitHandler = (e) => {
    e.preventDefault()
    commentService.setToken(user.token)
    dispatch(addComment(blogId, comment))
    setComment('')
    // dispatch(throwNotification("comment created!"))
  }

  return (
    <div>
      <h2>Comments</h2>
      <form onSubmit={commentSubmitHandler}>
        <input
          name="comment"
          onChange={({ target }) => setComment(target.value)}
          value={comment}
        />
        <button type="submit">Add Comment</button>
      </form>
      <ul>
        {blog.comments.map((comment) => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>
    </div>
  )
}

export default CommentSection
