import {combineReducers} from 'redux';
import {configureStore} from '@reduxjs/toolkit'
import createSagaMiddleware from "redux-saga";

import AddressReducer from './AddressReducer';
import rootSaga from '../Saga';


const sagaMiddleware = createSagaMiddleware();

const reducer = combineReducers({
    addresses: AddressReducer
})


const store = configureStore({
    middleware: [sagaMiddleware],
    reducer
})

sagaMiddleware.run(rootSaga)


export default store;
