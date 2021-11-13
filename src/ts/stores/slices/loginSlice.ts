import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { RootState } from '../index'

const apiUrl = 'http://localhost:3000/'

export const fetchAsyncLogin = createAsyncThunk(
  'login/post',
  async (auth: any) => {
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
  },
)

export const fetchAsyncAuth = createAsyncThunk(
  'auth/post',
  async (token: any) => {
    const res = await fetch(`${apiUrl}auth`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    const data = await res.json()
    return data
  },
)

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    isLogin: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncLogin.pending, (state, action) => {
      console.log('pendingなう')
    })
    builder.addCase(fetchAsyncLogin.fulfilled, (state, action) => {
      state.isLogin = true
    })
    builder.addCase(fetchAsyncLogin.rejected, (state, action) => {
      console.log('rejectなう')
    })
    builder.addCase(fetchAsyncAuth.fulfilled, (state, action) => {
      if (action.payload.status === 200) state.isLogin = true
    })
    builder.addCase(fetchAsyncAuth.rejected, (state, action) => {
      console.log('rejectなう')
    })
  },
})

// actionをexport
export const {} = loginSlice.actions

export const selectIsLogin = (state: any) => state.login.isLogin
// reducerをexport → storeへ
export default loginSlice.reducer
