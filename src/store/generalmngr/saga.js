import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import {
  GET_GENERALMNGRS,
  GET_GENERALMNGR_DETAIL,
  CREATE_GENERALMNGR,
  UPDATE_GENERALMNGR,
  DELETE_GENERALMNGR,
} from "./actionTypes"
import {
  getGeneralmngrsSuccess,
  getGeneralmngrsFail,
  getGeneralmngrDetailSuccess,
  getGeneralmngrDetailFail,
  createGeneralmngrSuccess,
  createGeneralmngrFail,
  updateGeneralmngrSuccess,
  updateGeneralmngrFail,
  deleteGeneralmngrSuccess,
  deleteGeneralmngrFail,
} from "./actions"
import { get, post, ApiPut, del, patch } from "helpers/api_methods"

const getGeneralmngrsAPi = ({ searchText, page }) => {
  if (searchText) {
    return get(`/account/general_manager/?search=${searchText && searchText}`)
  } else {
    return get(`/account/general_manager/?page=${page ? page : 1}`)
  }
}
const getGeneralmngrDetailsAPi = generalmngrId => {
  return get(`/account/general_manager/${generalmngrId}/`)
}
const createGeneralmngrApi = ({ generalmngr }) => {
  return post("/account/general_manager/", generalmngr)
}
const updateGeneralmngrApi = ({ generalmngrId, generalmngr }) => {
  return ApiPut(`/account/general_manager/${generalmngrId}/`, generalmngr)
}
const deleteGeneralmngrApi = ({ generalmngrId }) => {
  return del(`/account/general_manager/${generalmngrId}/`)
}

function* fetchGeneralmngrs({ payload }) {
  try {
    const response = yield call(getGeneralmngrsAPi, payload)
    yield put(getGeneralmngrsSuccess(response))
  } catch (error) {
    // yield put(getGeneralmngrsFail(error))
  }
}

function* fetchGeneralmngrDetail({ generalmngrId }) {
  try {
    const response = yield call(getGeneralmngrDetailsAPi, generalmngrId)
    yield put(getGeneralmngrDetailSuccess(response))
  } catch (error) {
    yield put(getGeneralmngrDetailFail(error))
  }
}
function* onCreateGeneralmngr({ payload }) {
  try {
    const response = yield call(createGeneralmngrApi, payload)
    if (response?.error_message) {
      yield put(createGeneralmngrFail(response?.error_message))
    } else {
      yield put(createGeneralmngrSuccess(response))
      payload.history.push("/generalmanagers")
    }
  } catch (error) {
    yield put(createGeneralmngrFail(error))
  }
}

function* onUpdateGeneralmngr({ payload }) {
  try {
    const response = yield call(updateGeneralmngrApi, payload)
    yield put(updateGeneralmngrSuccess(response))
    payload.history.push("/generalmanagers")
  } catch (error) {
    yield put(updateGeneralmngrFail(error))
  }
}

function* onDeleteGeneralmngr({ payload }) {
  try {
    const response = yield call(deleteGeneralmngrApi, payload)
    yield put(deleteGeneralmngrSuccess(response))
    payload.history.push("/generalmanagers")
  } catch (error) {
    yield put(deleteGeneralmngrFail(error))
  }
}

function* generalmngrsSaga() {
  yield takeEvery(GET_GENERALMNGRS, fetchGeneralmngrs)
  yield takeEvery(GET_GENERALMNGR_DETAIL, fetchGeneralmngrDetail)
  yield takeEvery(CREATE_GENERALMNGR, onCreateGeneralmngr)
  yield takeEvery(UPDATE_GENERALMNGR, onUpdateGeneralmngr)
  yield takeEvery(DELETE_GENERALMNGR, onDeleteGeneralmngr)
}

export default generalmngrsSaga
