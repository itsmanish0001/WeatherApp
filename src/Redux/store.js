import { configureStore } from "@reduxjs/toolkit";
import fetchedDataSlice from "./reducers/FetchedData";

const store = configureStore({
    reducer:{
        [fetchedDataSlice.name]:fetchedDataSlice.reducer,
    }
})

export default store;