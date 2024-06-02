import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { throwNotification, throwError } from './notificationReducer'

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
    deleteThisBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload)
    },
    likeAction(state, action) {
      console.log('action pauload like', action.payload, "state", state)
      return state.map((blog) =>
        blog.id === action.payload.id
          ? { ...blog, likes: action.payload.likes }
          : blog
      )
    },
  },
})

export const { setBlogs, appendBlog, deleteThisBlog, likeAction } =
  blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const initBlogs = await blogService.getAll()
    dispatch(setBlogs(initBlogs))
  }
}

export const removeBlog = (id, notification, error) => {
  return async (dispatch) => {
    try {
      await blogService.remove(id)
      dispatch(deleteThisBlog(id))
      dispatch(throwNotification(notification))
    } catch (err) {
      dispatch(throwError(error))
    }
  }
}

export const createNewBlog = (blog, notification, error) => {
  return async (dispatch) => {
    try {
      const addedBlog = await blogService.create(blog)
      dispatch(appendBlog(addedBlog))
      dispatch(throwNotification(notification))
    } catch (err) {
      dispatch(throwError(error))
    }
  }
}

export const likeBlog = (id, blog, blogCreator, notification, error) => {
  return async (dispatch) => {
    try {
      console.log('likeblog blog argument', blog)
      const likedBlog = await blogService.update(id, blog)
      const likedBlogithUser = {
        id: likedBlog.id,
        author: likedBlog.author,
        likes: likedBlog.likes,
        title: likedBlog.title,
        url: likedBlog.url,
        user: {
          id: likedBlog.user,
          name: blogCreator,
        },
      }
      console.log('blog after edit request', likedBlogithUser)
      dispatch(likeAction(likedBlogithUser))
      dispatch(throwNotification(notification))
    } catch (err) {
      dispatch(throwError(error))
    }
  }
}

export default blogSlice.reducer
