import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { client } from '../../api/client'
import { FAILED, IDLE, LOADING, SUCCEEDED } from '../../constants'

const initialState = {
  data: [],
  status: IDLE,
  error: null,
}

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await client.get('fakeApi/users')

  return response.data
})

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUsers.pending]: (state) => {
      state.status = LOADING
      state.data = []
      state.error = null
    },
    [fetchUsers.fulfilled]: (state, action) => {
      state.status = SUCCEEDED
      state.data = action.payload
      state.error = null
    },
    [fetchUsers.rejected]: (state, action) => {
      state.status = FAILED
      state.data = []
      state.error = action.error.message
    },
  },
})

export const selectAllUsers = (state) => state.users.data

export const selectUserById = (state, userId) =>
  state.users.data.find((user) => user.id === userId)

export default usersSlice.reducer
