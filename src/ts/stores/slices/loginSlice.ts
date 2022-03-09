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
  async (token: string) => {
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
    isLoading: false,
  },
  reducers: {
    // TODO: サーバーエラーのバリデーションが返ってくる前にLoadingをfalseにしたい（再レンダリングされてエラーメッセージ消える）
    loadingComplete(state, action) {
      state.isLoading = false
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncLogin.pending, (state, action) => {
      // TODO: Loadingが動いてsetErrorのメッセージが消える
      // state.isLoading = true
    })
    builder.addCase(fetchAsyncLogin.fulfilled, (state, action) => {
      // state.isLoading = false
      // TODO: 200の時はLoading解除。
      if (action.payload.status === 200) {
        state.isLoading = false
        state.isLogin = true
      }
    })
    builder.addCase(fetchAsyncLogin.rejected, (state, action) => {
      console.log('rejectなう')
    })
    builder.addCase(fetchAsyncAuth.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(fetchAsyncAuth.fulfilled, (state, action) => {
      state.isLoading = false
      if (action.payload.status === 200) state.isLogin = true
    })
    builder.addCase(fetchAsyncAuth.rejected, (state, action) => {
      console.log('rejectなう')
    })
  },
})

// actionをexport
export const { loadingComplete } = loginSlice.actions

export const selectIsLogin = (state: any) => state.login.isLogin
export const selectIsLoading = (state: any) => state.login.isLoading
// reducerをexport → storeへ
export default loginSlice.reducer
