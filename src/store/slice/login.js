import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "../api/login";

const initialState = {
    email : "",
    password : "",
    loading: false,
    user: []
}

const login = createSlice({
    name: "LoginUser",
    initialState,
    reducers: {},
    extraReducers: (builders) => {
        builders.addCase(loginUser.pending, (state, action)=>{
            state.loading = true
        })
        builders.addCase(loginUser.fulfilled, (state, action)=>{
            state.user = action.payload
            state.loading = false
        })
    }
})

export default login.reducer