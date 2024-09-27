
import { configureStore }  from "@reduxjs/toolkit"
import createSagaMiddleware from 'redux-saga';
import authSlice from "../slice/authSlice";
import signupReducer from "../slice/signupSlice"; 
import tableReducer from "../slice/tableSlice";
import userReducer from "../slice/userDataSlice"
import { rootSaga } from "../saga/rootSaga";

const sagaMiddleware = createSagaMiddleware();


const store = configureStore({
    reducer:{
        auth: authSlice,
        signup: signupReducer,
        table: tableReducer,
        userlist: userReducer,
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export {store};