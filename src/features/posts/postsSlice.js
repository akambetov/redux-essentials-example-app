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
    postUpdated: (state, action) => {
      const { id, title, content } = action.payload
      const existingPost = state.find((post) => String(post.id) === String(id))

      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
      console.log(existingPost)
    },
  },
})

export const { postAdded, postUpdated } = postsSlice.actions

export default postsSlice.reducer
