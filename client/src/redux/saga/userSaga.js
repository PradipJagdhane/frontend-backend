import userDataService from "../../services/UserService";
import { fetchTableFailure, fetchTableRequest, fetchTableSuccess } from "../slice/userDataSlice";

const { call, put, takeLatest } = require("redux-saga/effects");


function* handleUserTable() {
    try{
        const userData = yield call(userDataService);
        yield put(fetchTableSuccess(userData));
        console.log("userdata from usersaga", userData);
    }catch (error){
        yield put(fetchTableFailure(error.message));
    }
}

export function* watchUserTableSaga() {
    yield takeLatest(fetchTableRequest.type, handleUserTable);
}