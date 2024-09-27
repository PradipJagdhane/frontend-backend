import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    user: [],
    isloading: false,
    error: null,
};

const userSlice = createSlice({
    name: "userlist",
    initialState,
    reducers: {
        fetchTableRequest(state){
            state.isloading = true;
        },


        fetchTableSuccess(state, action){
            state.isloading = false;
            state.user = action.payload;
            console.log("userData from userSlice+=+", state.user);
        },

        fetchTableFailure(state, action) {
            state.isloading = false;
            state.error = action.payload;
        },
    },
});

export const { fetchTableRequest, fetchTableSuccess, fetchTableFailure } = userSlice.actions;
export default userSlice.reducer;