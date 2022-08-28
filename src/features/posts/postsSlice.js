import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit'

import { client } from '../../api/client'
import { FAILED, IDLE, LOADING, SUCCEEDED } from '../../constants'

const initialState = {
  data: [],
  status: IDLE,
  error: null,
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await client.get('fakeApi/posts')

  return response.data
})

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer: (state, action) => {
        state.data.push(action.payload)
      },
      prepare: (title, content, userId) => {
        return {
          payload: {
            title,
            content,
            user: userId,
            id: nanoid(),
            date: new Date().toISOString(),
            reactions: {
              thumbsUp: 0,
              hooray: 0,
              heart: 0,
              rocket: 0,
              eyes: 0,
            },
          },
        }
      },
    },
    postUpdated: (state, action) => {
      const { id, title, content, userId } = action.payload
      const existingPost = state.data.find(
        (post) => String(post.id) === String(id)
      )

      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
        existingPost.user = userId
      }
    },
    reactionAdded: (state, action) => {
      const { postId, reaction } = action.payload
      const existingPost = state.data.find(
        (post) => String(post.id) === String(postId)
      )

      if (existingPost) {
        existingPost.reactions[reaction]++
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = LOADING
        state.data = []
        state.error = null
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = SUCCEEDED
        state.data = state.data.concat(action.payload)
        state.error = null
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = FAILED
        state.data = []
        state.error = action.error.message
      })
  },
})

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions

export const selectAllPosts = (state) => state.posts.data

export const selectPostById = (state, postId) =>
  state.posts.data.find((post) => String(post.id) === String(postId))

export default postsSlice.reducer
