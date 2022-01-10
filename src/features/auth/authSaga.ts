import { PayloadAction } from '@reduxjs/toolkit';
import { fork, take } from 'redux-saga/effects';
import { authActions, LoginPayLoad } from './authSlice';

function* handleLogin(payload: LoginPayLoad) {
  console.log('Handle login', payload);
}

function* handleLogout() {
  console.log('Handle logout');
}

function* watchLoginFlow() {
  while (true) {
    const action: PayloadAction<LoginPayLoad> = yield take(authActions.login.type); //blocking
    yield fork(handleLogin, action.payload);
    yield take(authActions.logout.type); //blocking
    yield fork(handleLogout);
  }
}

export function* authSaga() {
  yield fork(watchLoginFlow);
}
