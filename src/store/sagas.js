import { takeEvery, put } from 'redux-saga/effects';

function* exampleSaga() {
    // Пример работы
}

export default function* rootSaga() {
    yield takeEvery('*', exampleSaga);
}