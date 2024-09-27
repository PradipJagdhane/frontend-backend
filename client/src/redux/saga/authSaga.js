import { call, put, takeLatest } from "redux-saga/effects";
import { login, loginFailure, loginSuccess } from "../slice/authSlice";
import loginService from "../../services/loginService";


function* loginSaga(action) {
    try{

        const data = yield call(loginService, action.payload.email, action.payload.password);
   

        yield put(loginSuccess(data));
        console.log("data from authSaga", data);
    }catch(error){
        let errorMsg = "Something went wrong";
        if(error.response && error.response.data){
            errorMsg = error.response.data.message;
        }
        yield put(loginFailure(errorMsg));
    }
}

export function* watchLoginSaga(){
    yield takeLatest(login.type, loginSaga);
}