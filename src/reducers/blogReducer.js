import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import commentService from '../services/comments'
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
      return orderBlogs(
        state.map((blog) =>
          blog.id === action.payload.id
            ? { ...blog, likes: action.payload.likes }
            : blog
        )
      )
    },
    commentAction(state, action) {
      console.log('state at comment function', state)
      console.log(action.payload)
      return state
        .find((blog) => blog.id === action.payload.blogId)
        .comments.concat(action.payload.content)
    },
  },
})

export const {
  setBlogs,
  appendBlog,
  deleteThisBlog,
  likeAction,
  commentAction,
} = blogSlice.actions

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
      dispatch(
        appendBlog({
          ...addedBlog,
          user: { name: blog.user.name, id: addedBlog.user },
        })
      )
      dispatch(throwNotification(notification))
    } catch (err) {
      dispatch(throwError(error))
    }
  }
}

export const likeBlog = (id, blog, blogCreator, notification, error) => {
  return async (dispatch) => {
    try {
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
      dispatch(likeAction(likedBlogithUser))
      dispatch(throwNotification(notification))
    } catch (err) {
      dispatch(throwError(error))
    }
  }
}

export const addComment = (blogId, commentContent) => {
  return async (dispatch) => {
    const returnedComment = await commentService.create(blogId, {
      content: commentContent,
    })
    console.log('returned comment', returnedComment)
    dispatch(
      commentAction({
        blogId,
        content: commentContent,
      })
    )
  }
}

export default blogSlice.reducer
