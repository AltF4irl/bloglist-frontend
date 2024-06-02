import { createSlice } from '@reduxjs/toolkit'

const logedUserSlice = createSlice({
  name: 'logedUser',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
  },
})

export const { setUser } = logedUserSlice.actions

export default logedUserSlice.reducer
