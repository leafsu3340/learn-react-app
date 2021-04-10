// 调用异步请求 call、fork
import {
  take,
  takeEvery,
  call,
  fork,
  put,
} from "redux-saga/effects";
import LoginService from "../service/login";
import { LOGIN_FAILURE, LOGIN_SAGA, LOGIN_SUCCESS, REQUEST } from "./const";

// TAG 做状态更新  put 类比dispatch

// TAG 1.worker saga generator
function* loginHandle(action) {
  yield put({ type: REQUEST });

  // 异步行为
  try {
    const res1 = yield call(LoginService.login, action.payload); // 调用异步请求  call：阻塞；fork：非阻塞
    const res2 = yield call(LoginService.getMoreUserInfo, res1);
    yield put({ type: LOGIN_SUCCESS, payload: res2 });
  } catch (err) {
    yield put({ type: LOGIN_FAILURE, payload: err });
  }
}

// TAG 2.watcher saga generator

function* loginSaga() {
  yield takeEvery(LOGIN_SAGA, loginHandle);
  // call 阻塞
  // fork 非阻塞

  // while (true) {
  //   const action = yield take(LOGIN_SAGA);
  //   yield fork(loginHandle, action);
  //   console.log("action-------", action); //sy-log
  // }
}

export default loginSaga;

// TAG takeEvery实现原理
// const takeEvery = (pattern, saga) =>
//   fork(function* () {
//     while (true) {
//       const action = yield take(pattern);  // 转化为action：{type: pattern, payload: xxx}
//       yield fork(saga, action);
//     }
//   });
