import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchAsyncLogin = createAsyncThunk(
    'login/post',
    async () => {

    }
)

const loginSlice = createSlice({
    name: 'login',
    initialState: {},
    reducers: {}
})

// actionをexport
export const { } = loginSlice.actions
// reducerをexport → storeへ
export default loginSlice.reducer