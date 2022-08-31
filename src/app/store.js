import { configureStore } from '@reduxjs/toolkit'

import notificationsSlice from '../features/notifications/notificationsSlice'
import postsReducer from '../features/posts/postsSlice'
import usersSlice from '../features/users/usersSlice'
import { apiSlice } from '../features/api/apiSlice'

export default configureStore({
  reducer: {
    posts: postsReducer,
    users: usersSlice,
    notifications: notificationsSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
})
