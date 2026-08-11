import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from '../../services/api.js'

const initialState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null
}

export const fetchUser = createAsyncThunk(
    'auth/fetchUser',
    async (thunkAPI) => {
        try{
            const res = await api.get('/auth/me')
            console.log(res)
            return res.data.user
        } catch(error){
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout : (state) => {
            state.user = null
            state.isAuthenticated = false
            state.loading = false
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchUser.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(fetchUser.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload
            state.isAuthenticated = true
            state.error = null
        })
        .addCase(fetchUser.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
            state.user = null
            state.isAuthenticated = false
        })

    }
})

export const {logout} = authSlice.actions

export default authSlice.reducer