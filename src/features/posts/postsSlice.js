import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'

import { client } from '../../api/client'
import { FAILED, IDLE, LOADING, SUCCEEDED } from '../../constants'

const initialState = {
  receivedPosts: { data: [], status: IDLE, error: null },
  newPost: { data: [], status: IDLE, error: null },
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await client.get('fakeApi/posts')

  return response.data
})

export const addNewPost = createAsyncThunk(
  'posts/addNewPost',
  async (initialPost) => {
    const response = await client.post('/fakeApi/posts', initialPost)

    return response.data
  }
)

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // postAdded: {
    //   reducer: (state, action) => {
    //     state.data.push(action.payload)
    //   },
    //   prepare: (title, content, userId) => {
    //     return {
    //       payload: {
    //         title,
    //         content,
    //         user: userId,
    //         id: nanoid(),
    //         date: new Date().toISOString(),
    //         reactions: {
    //           thumbsUp: 0,
    //           hooray: 0,
    //           heart: 0,
    //           rocket: 0,
    //           eyes: 0,
    //         },
    //       },
    //     }
    //   },
    // },
    postUpdated: (state, action) => {
      const { id, title, content, userId } = action.payload
      const existingPost = state.receivedPosts.data.find(
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
      const existingPost = state.receivedPosts.data.find(
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
        state.receivedPosts.status = LOADING
        state.receivedPosts.data = []
        state.receivedPosts.error = null
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.receivedPosts.status = SUCCEEDED
        state.receivedPosts.data = state.receivedPosts.data.concat(
          action.payload
        )
        state.receivedPosts.error = null
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.receivedPosts.status = FAILED
        state.receivedPosts.data = []
        state.receivedPosts.error = action.error.message
      })
      // .addCase(addNewPost.pending, (state) => {
      //   state.newPost.status = LOADING
      //   state.newPost.data = []
      //   state.newPost.error = null
      // })
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.newPost.status = SUCCEEDED
        state.newPost.data = state.newPost.data.concat(action.payload)
        state.newPost.error = null
        state.receivedPosts.data = state.receivedPosts.data.concat(
          action.payload
        )
      })
    // .addCase(addNewPost.rejected, (state, action) => {
    //   state.newPost.status = FAILED
    //   state.newPost.data = []
    //   state.newPost.error = action.error.message
    // })
  },
})

export const { postUpdated, reactionAdded } = postsSlice.actions

export const selectAllPosts = (state) => state.posts.receivedPosts.data

export const selectPostById = (state, postId) =>
  state.posts.receivedPosts.data.find(
    (post) => String(post.id) === String(postId)
  )

export const selectPostsByUser = createSelector(
  [selectAllPosts, (_, userId) => userId],
  (posts, userId) => posts.filter((post) => post.user === userId)
)

export default postsSlice.reducer
