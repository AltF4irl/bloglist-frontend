import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import commentService from '../services/comments'
import { createComment } from '../reducers/commentReducer'
import { Button, Table } from 'react-bootstrap'

const CommentSection = () => {
  const [comment, setComment] = useState('')
  const blogId = useParams().id
  const dispatch = useDispatch()
  const user = useSelector((state) => state.logedUser)

  const comments = useSelector((state) => state.comments)

  const commentSubmitHandler = (e) => {
    e.preventDefault()
    commentService.setToken(user.token)
    dispatch(
      createComment(
        blogId,
        comment,
        `Comment: ${comment} created!`,
        'Something went wrong...'
      )
    )
    setComment('')
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
        <Button
          type="submit"
          variant="dark"
        >
          Add Comment
        </Button>
      </form>
      <Table striped>
        <tbody>
          {comments.map((comment) => (
            <tr>
              <td key={comment.id}>{comment.content}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default CommentSection
