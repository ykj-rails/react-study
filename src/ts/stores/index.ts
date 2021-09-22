import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './slices/loginSlice'
// それぞれのSliceを呼び出して結合する
export const store = configureStore({
  reducer: {
    // 識別する名前: importしてきたReducer名
    login: loginReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch