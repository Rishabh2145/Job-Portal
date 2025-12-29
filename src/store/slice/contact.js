import { createSlice } from "@reduxjs/toolkit";
import {addMessage, getMessage} from "../api/contact";

const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    message: "",
    contacts: [],
    loading : false
}


const Contact = createSlice({
    name: "contact",
    initialState,
    reducers: {
        addContact: (state, action) => {
            console.log(action.payload)
            state.contacts.push(action.payload)
        }
    },
    extraReducers : (builders) => {
        builders.addCase(getMessage.pending, (state, action)=>{
            state.loading = true
        })
        builders.addCase(getMessage.fulfilled, (state, action) => {
            console.log(state.payload)
            state.loading = false
        })
        builders.addCase(addMessage.pending, (state, action)=> {
            state.loading = true;
        })
        builders.addCase(addMessage.fulfilled, (state, action)=>{
            state.loading = false
            state.contacts.push(action.payload)
        })
    }
})

export const { addContact } = Contact.actions
export default Contact.reducer