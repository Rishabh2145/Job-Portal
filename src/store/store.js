import { configureStore } from "@reduxjs/toolkit";

import { baseApi, frontendApi } from "./api/baseApi";

export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        [frontendApi.reducerPath]: frontendApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware).concat(frontendApi.middleware)

})