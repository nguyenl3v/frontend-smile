import { fork, all } from "redux-saga/effects";

const saga = [];

function* rootSaga() {
  const globalFork = saga.map(saga => fork(saga));
  yield all([...globalFork]);
}

export default rootSaga;
