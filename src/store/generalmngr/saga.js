import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import {
  GET_GEN_MANAGERS,
  GET_GEN_MANAGER_DETAIL,
  CREATE_GEN_MANAGER,
  UPDATE_GEN_MANAGER,
  DELETE_GEN_MANAGER,
} from "./actionTypes"
import {
  getGeneralManagersSuccess,
  getGeneralManagersFail,
  getGeneralManagerDetailSuccess,
  getGeneralManagerDetailFail,
  createGeneralManagerSuccess,
  createGeneralManagerFail,
  updateGeneralManagerSuccess,
  updateGeneralManagerFail,
  deleteGeneralManagerSuccess,
  deleteGeneralManagerFail,
  deleteGeneralManager
} from "./actions"
import { get, post, ApiPut, del, patch } from "helpers/api_methods"

const getGmsAPi = ({ searchText, page }) => {
  if (searchText) {
    return get(`/account/general_manager/?search=${searchText && searchText}`)
  } else {
    return get(`/account/general_manager/?page=${page ? page : 1}`)
  }
}
const getGmDetailsAPi = ({ gmId }) => {
  return get(`/account/general_manager/${gmId}/`)
}
const createGmApi = ({ gm }) => {
  return post("/account/general_manager/", gm)
}
const updateGmApi = ({ gmId, gm }) => {
  return ApiPut(`/account/general_manager/${gmId}/`, gm)
}
const deleteGmApi = gmId => {
  return del(`/account/general_manager/${gmId}/`)
}

function* fetchGms({ payload }) {
  try {
    const response = yield call(getGmsAPi, payload)
    yield put(getGeneralManagersSuccess(response))
  } catch (error) {
    yield put(getGeneralManagersFail(error))
  }
}

function* fetchGMDetail({ payload }) {
  try {
    const response = yield call(getGmDetailsAPi, payload)
    yield put(getGeneralManagerDetailSuccess(response))
  } catch (error) {
    yield put(getGeneralManagerDetailFail(error))
  }
}

function* onCreateGm({ payload }) {
  try {
    const response = yield call(createGmApi, payload)
    yield put(createGeneralManagerSuccess(response))
    payload.history.push("/generalmanagers")
  } catch (error) {
    yield put(createGeneralManagerFail(error))
  }
}

function* onUpdateGm({ payload }) {
  try {
    const response = yield call(updateGmApi, payload)
    yield put(updateGeneralManagerSuccess(response))
    payload.history.push("/generalmanagers")
  } catch (error) {
    yield put(updateGeneralManagerFail(error))
  }
}

function* onDeleteGm({ gmId, history }) {
  try {
    const response = yield call(deleteGmApi, gmId)
    yield put(deleteGeneralManagerSuccess(response))
    history.push("/generalmanagers")
  } catch (error) {
    yield put(deleteGeneralManagerFail(error))
  }
}

function* generalmngrSaga() {
  yield takeEvery(GET_GEN_MANAGERS, fetchGms)
  yield takeEvery(GET_GEN_MANAGER_DETAIL, fetchGMDetail)
  yield takeEvery(CREATE_GEN_MANAGER, onCreateGm)
  yield takeEvery(UPDATE_GEN_MANAGER, onUpdateGm)
  yield takeEvery(DELETE_GEN_MANAGER, onDeleteGm)
}

export default generalmngrSaga
