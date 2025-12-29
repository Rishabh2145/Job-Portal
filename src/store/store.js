import { configureStore } from "@reduxjs/toolkit";
import { getDefaultMiddleware } from '@reduxjs/toolkit';

import contactReducer from "./slice/contact";

export const store = configureStore({
    reducer: {
        contact: contactReducer
    },
    middleware : (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck : false
    })
})