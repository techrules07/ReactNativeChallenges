import {all} from 'redux-saga/effects'
import addressSaga from './AddressesSaga'

function* rootSaga() {
    yield all([
        addressSaga()
    ])
}

export default rootSaga;