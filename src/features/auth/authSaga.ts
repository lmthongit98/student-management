import { PayloadAction } from '@reduxjs/toolkit';
import { call, fork, put, take } from 'redux-saga/effects';
import { authActions, LoginPayLoad } from './authSlice';

function* handleLogin(payload: LoginPayLoad) {
  try {
    // yield call(loginApi, data)
    localStorage.setItem('access_token', 'adasd');
    yield put(
      authActions.loginSuccess({
        id: 1,
        name: 'Thong',
      })
    );
    //redirect to admin page
  } catch (error: any) {
    yield put(authActions.loginFail(error.massage));
  }
}

function* handleLogout() {
  console.log('Handle logout');
  localStorage.removeItem('access_token');
  yield put(authActions.logout());
  //redirect to login page
}

function* watchLoginFlow() {
  while (true) {
    const isLoggedIn = Boolean(localStorage.getItem('access_token'));
    if (!isLoggedIn) {
      const action: PayloadAction<LoginPayLoad> = yield take(authActions.login.type); // blocking
      yield fork(handleLogin, action.payload);
    }

    yield take(authActions.logout.type); // blocking
    yield call(handleLogout); // blocking - wait for completing handle logout
  }
}

export function* authSaga() {
  yield fork(watchLoginFlow);
}
