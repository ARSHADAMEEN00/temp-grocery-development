import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import {
  GET_QLTCHECKERS,
  GET_QLTCHECKER_DETAIL,
  CREATE_QLTCHECKER,
  UPDATE_QLTCHECKER,
  DELETE_QLTCHECKER,
} from "./actionTypes"
import {
  getQltcheckersSuccess,
  getQltcheckersFail,
  getQltcheckerDetailSuccess,
  getQltcheckerDetailFail,
  createQltcheckerSuccess,
  createQltcheckerFail,
  updateQltcheckerSuccess,
  updateQltcheckerFail,
  deleteQltcheckerSuccess,
  deleteQltcheckerFail,
} from "./actions"
import { get, post, ApiPut, del, patch } from "helpers/api_methods"
import { Notification } from "components/Common/Notification"

const getQltcheckersAPi = ({ searchText, page }) => {
  if (searchText) {
    return get(`/account/quality_checker/?search=${searchText && searchText}`)
  } else {
    return get(`/account/quality_checker/?page=${page ? page : 1}`)
  }
}
const getQltcheckerDetailsAPi = qltcheckerId => {
  return get(`/account/quality_checker/${qltcheckerId}/`)
}
const createQltcheckerApi = ({ qltchecker }) => {
  return post("/account/quality_checker/", qltchecker)
}
const updateQltcheckerApi = ({ qltcheckerId, qltchecker }) => {
  return ApiPut(`/account/quality_checker/${qltcheckerId}/`, qltchecker)
}
const deleteQltcheckerApi = ({ qltcheckerId }) => {
  return del(`/account/quality_checker/${qltcheckerId}/`)
}

function* fetchQltcheckers({ payload }) {
  try {
    const response = yield call(getQltcheckersAPi, payload)
    yield put(getQltcheckersSuccess(response))
  } catch (error) {
    yield put(getQltcheckersFail(error))
  }
}

function* fetchQltcheckerDetail({ qltcheckerId }) {
  try {
    const response = yield call(getQltcheckerDetailsAPi, qltcheckerId)
    yield put(getQltcheckerDetailSuccess(response))
  } catch (error) {
    yield put(getQltcheckerDetailFail(error))
  }
}
function* onCreateQltchecker({ payload }) {
  try {
    const response = yield call(createQltcheckerApi, payload)
    if (response?.error_message) {
      yield put(createQltcheckerFail(response))
    } else {
      yield put(createQltcheckerSuccess(response))
      payload.history.push("/qualitycheckers")
      Notification({
        type: "success",
        message: "Successfully Created QC",
        title: "Created!",
      })
    }
  } catch (error) {
    yield put(createQltcheckerFail(error))
    errorNotification()
  }
}

function* onUpdateQltchecker({ payload }) {
  try {
    const response = yield call(updateQltcheckerApi, payload)
    if (response?.error_message) {
      yield put(updateQltcheckerFail(response))
    } else {
      yield put(updateQltcheckerSuccess(response))
      Notification({
        type: "success",
        message: "Successfully Updated QC",
        title: "Updated!",
      })
    }
  } catch (error) {
    yield put(updateQltcheckerFail(error))
    errorNotification()
  }
}

function* onDeleteQltchecker({ payload }) {
  try {
    const response = yield call(deleteQltcheckerApi, payload)
    payload.history.push("/qualitycheckers")
    yield put(
      deleteQltcheckerSuccess({ ...response, id: payload.qltcheckerId })
    )
    doneNotification()
  } catch (error) {
    console.log(error)
    errorNotification()
    yield put(deleteQltcheckerFail(error))
  }
}

function errorNotification() {
  Notification({
    type: "error",
    message: "Something Went Wrong",
    title: "Try Again",
  })
}
function doneNotification() {
  Notification({
    type: "success",
    message: "Done",
    title: "",
  })
}

function* qltcheckersSaga() {
  yield takeEvery(GET_QLTCHECKERS, fetchQltcheckers)
  yield takeEvery(GET_QLTCHECKER_DETAIL, fetchQltcheckerDetail)
  yield takeEvery(CREATE_QLTCHECKER, onCreateQltchecker)
  yield takeEvery(UPDATE_QLTCHECKER, onUpdateQltchecker)
  yield takeEvery(DELETE_QLTCHECKER, onDeleteQltchecker)
}

export default qltcheckersSaga
