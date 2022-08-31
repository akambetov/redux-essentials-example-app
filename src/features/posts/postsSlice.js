import {
  createAsyncThunk,
  createSelector,
  createSlice,
  createEntityAdapter,
} from '@reduxjs/toolkit'

import { client } from '../../api/client'
import { FAILED, IDLE, LOADING, SUCCEEDED } from '../../constants'

const postAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
})

const initialState = postAdapter.getInitialState({
  status: IDLE,
  error: null,
})

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
    postUpdated: (state, action) => {
      const { id, title, content, userId } = action.payload
      const existingPost = state.entities[id]

      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
        existingPost.user = userId
      }
    },
    reactionAdded: (state, action) => {
      const { postId, reaction } = action.payload
      const existingPost = state.entities[postId]

      if (existingPost) {
        existingPost.reactions[reaction]++
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = LOADING
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = SUCCEEDED
        // Add any fetched posts to the array
        // Use the `upsertMany` reducer as a mutating update utility
        postAdapter.upsertMany(state, action.payload)
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = FAILED
        state.error = action.error.message
      })
      .addCase(addNewPost.fulfilled, postAdapter.addOne)
  },
})

export const { postUpdated, reactionAdded } = postsSlice.actions

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
} = postAdapter.getSelectors((state) => state.posts)

export const selectPostsByUser = createSelector(
  [selectAllPosts, (_, userId) => userId],
  (posts, userId) => posts.filter((post) => post.user === userId)
)

export default postsSlice.reducer
