import {call, put, takeEvery} from 'redux-saga/effects';
import axios from 'axios';


const fetchAddressAPICall = async (payload) => {
    console.log(payload)
    const response = await axios.get(`https://api.postalpincode.in/postoffice/${payload.payload}`)

    return response.data
}

function* fetchAddresses(payload){
    try {
        const addresses = yield call(fetchAddressAPICall, payload)
        yield put({type: 'LIST_ADDRESSES', addresses: addresses[0]})
        yield put({type: 'HIDE_LOADING'})
    }
    catch(error) {
        console.log(error)
        yield put({type: 'ERROR', message: 'Unable to fetch the addresses'})
    }
}

function* addressSaga() {
    yield takeEvery('FETCH_ADDRESS', fetchAddresses)
}

export default addressSaga;