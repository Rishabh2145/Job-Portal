import { createSlice } from "@reduxjs/toolkit";
import reducer from "./contact";
import { userSignup } from "../api/signup";

const initialState = {
    role : "Employee",
    fullName : "",
    username : "",
    email : "",
    password : "",
    loading : false,
    createdUser : []
}

const signUp = createSlice({
    name: "UserSignup",
    initialState,
    reducer : {},
    extraReducers : (builders) => {
        builders.addCase(userSignup.pending, (state, action) => {
            state.loading = true
        })
        builders.addCase(userSignup.fulfilled, (state, action)=>{
            state.createdUser = action.payload
            state.loading = false
        })
    }
    
})

export default signUp.reducer