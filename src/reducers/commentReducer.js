import { createSlice } from '@reduxjs/toolkit'
import commentService from '../services/comments'
import { throwNotification, throwError } from './notificationReducer'

const commentSlice = createSlice({
  name: 'comments',
  initialState: [],
  reducers: {
    initializeComments(state, action) {
      return action.payload
    },
    appendComment(state, action) {
      state.push(action.payload)
    },
  },
})

export const { initializeComments, appendComment } = commentSlice.actions

export const getComments = (blogId) => {
  return async (dispatch) => {
    const initComments = await commentService.getAll(blogId)
    dispatch(initializeComments(initComments))
  }
}

export const createComment = (blogId, comment, notif, error) => {
  return async (dispatch) => {
    try {
      const addedComment = await commentService.create(blogId, comment)
      dispatch(appendComment(addedComment))
      dispatch(throwNotification(notif))
    } catch {
      dispatch(throwError(error))
    }
    
  }
}

export default commentSlice.reducer
