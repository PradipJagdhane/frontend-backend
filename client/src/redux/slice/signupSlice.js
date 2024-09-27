import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    successMessage: "",
    apiError: "",
    backendErrors: {},
};

const signupSlice = createSlice({
    name: "signup",
    initialState,
    reducers: {
        signupRequest: (state,action) => {
            state.loading = true;
            console.log("state from slice", action.payload);
        },

        signupSuccess: (state, action) => {
            state.loading = false;
            state.successMessage = action.payload;
            state.apiError = "";
            state.backendErrors = {};
            console.log("successfully connect with saga from slice");
        },

        signupFailure: (state, action) => {
            state.loading = false;
            state.apiError = action.payload.error;
            state.backendErrors = action.payload.error || {};
        },
    },
});

export const { signupRequest, signupSuccess, signupFailure } = signupSlice.actions;
export default signupSlice.reducer;