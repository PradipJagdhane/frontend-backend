import { call, put, takeLatest } from "redux-saga/effects";
import fetchTableData from "../../services/tableService";
import { fetchTableFailure, fetchTableRequest, fetchTableSuccess } from "../slice/tableSlice";


function* handleFetchTable() {
    try{
        const data = yield call(fetchTableData);
        yield put(fetchTableSuccess(data));
    }catch (error){
        yield put(fetchTableFailure(error.message));
    }
}

export function* watchTableSaga() {
    yield takeLatest(fetchTableRequest.type, handleFetchTable);
}