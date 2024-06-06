import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { message: null, class: '' },
  reducers: {
    showNotification(state, action) {
      return {
        message: action.payload,
        class: 'success',
      }
    },
    showError(state, action) {
      return {
        message: action.payload,
        class: 'danger',
      }
    },
    clearNotification(state, action) {
      return { message: null, class: '' }
    },
  },
})

export const { showNotification, showError, clearNotification } =
  notificationSlice.actions

export const throwNotification = (message) => {
  return (dispatch) => {
    dispatch(showNotification(message))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }
}

export const throwError = (message) => {
  return (dispatch) => {
    dispatch(showError(message))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }
}

export default notificationSlice.reducer
