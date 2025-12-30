import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const userSignup = createAsyncThunk('signup/userSignup', async (data)=>{
    console.log(data)
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API}/signup`).then((res)=>{
        console.log(res.data)
        alert("Account created successfully! Please login with the same credentials")
    }).catch((err)=>{
        alert("Error in creating account ", err)
    })
    return res.data
})