import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk("login/loginUser",async (data)=>{
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API}/signin`, data, {method:"POST"}).then((res)=>{
        alert("Logged In")
        console.log(res.data.data)
        return res.data.data
    }).catch((err)=>{
        alert("Invalid Credentials", err)
    })
    return res.data.data
})
