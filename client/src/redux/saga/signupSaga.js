import { call, put, takeLatest } from "redux-saga/effects";
import signupService from "../../services/signupService";
import { signupFailure, signupRequest, signupSuccess } from "../slice/signupSlice";



function* handleSignup(action) {
    console.log("inside signup sagaComponent");
    try{
        const response = yield call(signupService, action.payload);
        console.log("Service Signup response", response);

        if(response.errors){
            yield put(signupFailure({ errors: response.errors }));
        }else {
            put(signupSuccess("User registered successfully!"));
        }
    }catch (error){
        console.error("Error in signup saga:", error);
        yield put(signupFailure({error: "Server error. Please try again lator."}));
    }
}

export function* watchSignup() {
    yield takeLatest(signupRequest.type, handleSignup);
}