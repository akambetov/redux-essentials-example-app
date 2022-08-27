import { createSlice } from '@reduxjs/toolkit'

const initialState = [
  { id: 1, title: 'First post!', content: 'Hello!' },
  { id: 2, title: 'Second post!', content: 'More text' },
]

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: (state, action) => {
      state.push(action.payload)
    },
  },
})

export const { postAdded } = postsSlice.actions

export default postsSlice.reducer
