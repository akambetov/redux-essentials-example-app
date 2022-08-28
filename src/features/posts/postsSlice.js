import { createSlice, nanoid } from '@reduxjs/toolkit'
import { sub } from 'date-fns'

const initialState = [
  {
    id: 1,
    title: 'First post!',
    content: 'Hello!',
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    user: '0',
    reactions: {
      thumbsUp: 0,
      hooray: 0,
      heart: 0,
      rocket: 0,
      eyes: 0,
    },
  },
  {
    id: 2,
    title: 'Second post!',
    content: 'More text',
    date: sub(new Date(), { minutes: 5 }).toISOString(),
    reactions: {
      thumbsUp: 10,
      hooray: 101,
      heart: 3,
      rocket: 5,
      eyes: 1000,
    },
  },
]

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer: (state, action) => {
        state.push(action.payload)
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
      const existingPost = state.find((post) => String(post.id) === String(id))

      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
        existingPost.user = userId
      }
    },
    reactionAdded: (state, action) => {
      const { postId, reaction } = action.payload
      const existingPost = state.find(
        (post) => String(post.id) === String(postId)
      )

      if (existingPost) {
        existingPost.reactions[reaction]++
      }
    },
  },
})

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions

export const selectAllPosts = (state) => state.posts

export const selectPostById = (state, postId) =>
  state.posts.find((post) => String(post.id) === String(postId))

export default postsSlice.reducer
