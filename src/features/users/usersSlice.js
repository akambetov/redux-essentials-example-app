import { createSlice } from '@reduxjs/toolkit'

const initialState = [
  { id: '0', name: 'Almat Kambetov' },
  { id: '1', name: 'Dulat Kambetov' },
  { id: '3', name: 'Ainash Kambetova' },
]

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
})

export default usersSlice.reducer
