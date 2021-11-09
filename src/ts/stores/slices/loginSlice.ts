import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { RootState } from '../index'
import Cookies from 'js-cookie'

const apiUrl = 'http://localhost:3000/'

export const fetchAsyncLogin = createAsyncThunk('login/post', async (auth) => {
  const res = await fetch(`${apiUrl}login`, {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify(auth),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const data = await res.json()
  return data
})

const loginSlice = createSlice({
  name: 'login',
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncLogin.pending, (state, action) => {
      console.log('ペンディングなう')
    })
    builder.addCase(fetchAsyncLogin.fulfilled, (state, action) => {
      console.log(action.payload)
      // Cookies.set('token', json.data.token)
      window.location.href = '/todo'
    })
    builder.addCase(fetchAsyncLogin.rejected, (state, action) => {
      // setError('server', { type: 'server', message: `${json.error}` })
    })
  },
})

// actionをexport
export const {} = loginSlice.actions
// reducerをexport → storeへ
export default loginSlice.reducer
