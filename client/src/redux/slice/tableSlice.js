import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: [],
    isloading: false,
    error: null,
    
};

const tableSlice = createSlice({
    name: "table",
    initialState,
    reducers: {
        fetchTableRequest(state) {
            state.isloading = true;

            
        },

        fetchTableSuccess(state, action) {
            state.isloading = false;
            state.data = action.payload;
        },

        fetchTableFailure(state, action) {
            state.isloading = false;
            state.error = action.payload;
            console.log("from slice...",state.isloading);

        },
    },
});



export const { fetchTableRequest, fetchTableSuccess, fetchTableFailure } = tableSlice.actions;
export default tableSlice.reducer;