import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const orderBlogs = (blogs) => {
  return blogs.sort((a, b) => b.likes - a.likes)
}

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return orderBlogs(action.payload)
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
  },
})

export const { setBlogs, appendBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const initBlogs = await blogService.getAll()
    dispatch(setBlogs(initBlogs))
  }
}

export const createNewBlog = (blog) => {
    return async dispatch => {
        const addedBlog = await blogService.create(blog)
        dispatch(appendBlog(addedBlog))
    }
}   

export default blogSlice.reducer
