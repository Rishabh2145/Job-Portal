import 'dotenv/config.js'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const addMessage = createAsyncThunk('contact/addMessage', async (data) => {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API}/contact`, data, {method: "POST"})
    return res.data
})

export const getMessage = createAsyncThunk('contect/getMessage', async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API}/message`)
    return res.data.data
})