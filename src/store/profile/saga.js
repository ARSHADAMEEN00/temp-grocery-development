import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import {
  GET_USER_PROFILE,
  UPDATE_USER,
  UPDATE_USER_PASSWORD,
} from "./actionTypes"

import {
  getUserProfileSuccess,
  getUserProfileFail,
  updateUserSuccess,
  updateUserFail,
  updateUserPassSuccess,
  updateUserPassFail,
} from "./actions"

//Include Both Helper File with needed methods
import { ApiPut, get, post } from "helpers/api_methods"
import { Notification } from "components/Common/Notification"

function getUserProfileApi() {
  return get("/account/profile")
}
function updateUserApi() {
  return get("/account/profile")
}
function onUpdateUserPassApi(userPass) {
  return ApiPut("/account/change_password/", userPass)
}

function* fetchUserProfile() {
  try {
    const response = yield call(getUserProfileApi)
    yield put(getUserProfileSuccess(response))
  } catch (error) {
    yield put(getUserProfileFail(error))
  }
}

function* onUpdateUser({ payload: user }) {
  try {
    const response = yield call(updateUserApi, user)
    yield put(updateUserSuccess(response))
    doneNotification()
  } catch (error) {
    yield put(updateUserFail(error))
    errorNotification()
  }
}

function* onUpdateUserPass({ payload: userPass }) {
  try {
    const response = yield call(onUpdateUserPassApi, userPass)
    yield put(updateUserPassSuccess(response))
    doneNotification()
  } catch (error) {
    yield put(updateUserPassFail(error))
    errorNotification()
  }
}

function errorNotification() {
  Notification({
    type: "error",
    message: "Something Went Wrong",
    title: "Try Again"
  })
}

function doneNotification() {
  Notification({
    type: "success",
    message: "Done",
    title: ""
  })
}

function* contactsSaga() {
  yield takeEvery(GET_USER_PROFILE, fetchUserProfile)
  yield takeEvery(UPDATE_USER, onUpdateUser)
  yield takeEvery(UPDATE_USER_PASSWORD, onUpdateUserPass)
}

export default contactsSaga
