import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import {
  GET_SALESMANS,
  GET_SALESMAN_DETAIL,
  CREATE_SALESMAN,
  UPDATE_SALESMAN,
  DELETE_SALESMAN,
} from "./actionTypes"
import {
  getSalesmansSuccess,
  getSalesmansFail,
  getSalesmanDetailSuccess,
  getSalesmanDetailFail,
  createSalesmanSuccess,
  createSalesmanFail,
  updateSalesmanSuccess,
  updateSalesmanFail,
  deleteSalesmanSuccess,
  deleteSalesmanFail,
} from "./actions"
import { get, post, ApiPut, del, patch } from "helpers/api_methods"

const getSalesmansAPi = ({ searchText, page }) => {
  if (searchText) {
    return get(`/account/qualitychecker/?search=${searchText && searchText}`)
  } else {
    return get(`/account/qualitychecker/?page=${page ? page : 1}`)
  }
}
const getSalesmanDetailsAPi = salesmanId => {
  return get(`/account/qualitychecker/${salesmanId}/`)
}
const createSalesmanApi = ({ salesman }) => {
  return post("/account/qualitychecker/", salesman)
}
const updateSalesmanApi = ({ salesmanId, salesman }) => {
  return ApiPut(`/account/qualitychecker/${salesmanId}/`, salesman)
}
const deleteSalesmanApi = ({ salesmanId }) => {
  return del(`/account/qualitychecker/${salesmanId}/`)
}

function* fetchSalesmans({ payload }) {
  try {
    const response = yield call(getSalesmansAPi, payload)
    yield put(getSalesmansSuccess(response))
  } catch (error) {
    yield put(getSalesmansFail(error))
  }
}

function* fetchSalesmanDetail({ salesmanId }) {
  try {
    const response = yield call(getSalesmanDetailsAPi, salesmanId)
    yield put(getSalesmanDetailSuccess(response))
  } catch (error) {
    yield put(getSalesmanDetailFail(error))
  }
}
function* onCreateSalesman({ payload }) {
  try {
    const response = yield call(createSalesmanApi, payload)
    if (response?.error_message) {
      yield put(createSalesmanFail(response?.error_message))
    } else {
      yield put(createSalesmanSuccess(response))
      payload.history.push("/qualitycheckers")
    }
  } catch (error) {
    yield put(createSalesmanFail(error))
  }
}

function* onUpdateSalesman({ payload }) {
  try {
    const response = yield call(updateSalesmanApi, payload)
    yield put(updateSalesmanSuccess(response))
  } catch (error) {
    yield put(updateSalesmanFail(error))
  }
}

function* onDeleteSalesman({ payload }) {
  try {
    const response = yield call(deleteSalesmanApi, payload)
    payload.history.push("/qualitycheckers")
    yield put(deleteSalesmanSuccess(response))
  } catch (error) {
    yield put(deleteSalesmanFail(error))
  }
}

function* salesmansSaga() {
  yield takeEvery(GET_SALESMANS, fetchSalesmans)
  yield takeEvery(GET_SALESMAN_DETAIL, fetchSalesmanDetail)
  yield takeEvery(CREATE_SALESMAN, onCreateSalesman)
  yield takeEvery(UPDATE_SALESMAN, onUpdateSalesman)
  yield takeEvery(DELETE_SALESMAN, onDeleteSalesman)
}

export default salesmansSaga
