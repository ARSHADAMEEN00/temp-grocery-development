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

const getQltcheckersAPi = ({ searchText, page }) => {
  if (searchText) {
    return get(`/account/qualitychecker/?search=${searchText && searchText}`)
  } else {
    return get(`/account/qualitychecker/?page=${page ? page : 1}`)
  }
}
const getQltcheckerDetailsAPi = qltcheckerId => {
  return get(`/account/qualitychecker/${qltcheckerId}/`)
}
const createQltcheckerApi = ({ qltchecker }) => {
  return post("/account/qualitychecker/", qltchecker)
}
const updateQltcheckerApi = ({ qltcheckerId, qltchecker }) => {
  return ApiPut(`/account/qualitychecker/${qltcheckerId}/`, qltchecker)
}
const deleteQltcheckerApi = ({ qltcheckerId }) => {
  return del(`/account/qualitychecker/${qltcheckerId}/`)
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
      yield put(createQltcheckerFail(response?.error_message))
    } else {
      yield put(createQltcheckerSuccess(response))
      payload.history.push("/qualitycheckers")
    }
  } catch (error) {
    yield put(createQltcheckerFail(error))
  }
}

function* onUpdateQltchecker({ payload }) {
  try {
    const response = yield call(updateQltcheckerApi, payload)
    yield put(updateQltcheckerSuccess(response))
  } catch (error) {
    yield put(updateQltcheckerFail(error))
  }
}

function* onDeleteQltchecker({ payload }) {
  try {
    const response = yield call(deleteQltcheckerApi, payload)
    payload.history.push("/qualitycheckers")
    yield put(deleteQltcheckerSuccess(response))
  } catch (error) {
    yield put(deleteQltcheckerFail(error))
  }
}

function* qltcheckersSaga() {
  yield takeEvery(GET_QLTCHECKERS, fetchQltcheckers)
  yield takeEvery(GET_QLTCHECKER_DETAIL, fetchQltcheckerDetail)
  yield takeEvery(CREATE_QLTCHECKER, onCreateQltchecker)
  yield takeEvery(UPDATE_QLTCHECKER, onUpdateQltchecker)
  yield takeEvery(DELETE_QLTCHECKER, onDeleteQltchecker)
}

export default qltcheckersSaga
