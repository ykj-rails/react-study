import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { RootState } from '../index'
import Cookies from 'js-cookie'

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

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    isLogin: false,
  },
  reducers: {
    loginCheck(state, action) {
      if (action.payload) state.isLogin = true
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncLogin.pending, (state, action) => {
      console.log('ペンディングなう')
    })
    builder.addCase(fetchAsyncLogin.fulfilled, (state, action) => {
      state.isLogin = true
      Cookies.set('token', action.payload.data.token)
    })
    builder.addCase(fetchAsyncLogin.rejected, (state, action) => {
      // setError('server', { type: 'server', message: `${json.error}` })
    })
  },
})

// actionをexport
export const { loginCheck } = loginSlice.actions

export const selectIsLogin = (state: any) => state.login.isLogin
// reducerをexport → storeへ
export default loginSlice.reducer
