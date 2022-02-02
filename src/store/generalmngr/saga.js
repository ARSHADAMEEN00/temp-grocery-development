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
  deleteGeneralManager,
} from "./actions"
import { get, post, ApiPut, del, patch } from "helpers/api_methods"
import { Notification } from "components/Common/Notification"

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
    if (response?.error_message) {
      yield put(createGeneralManagerFail(response))
    } else {
      yield put(createGeneralManagerSuccess(response))
      payload.history.push("/generalmanagers")
      Notification({
        type: "success",
        message: "Successfully Created GM",
        title: "Created!",
      })
    }
  } catch (error) {
    yield put(createGeneralManagerFail(error))
    errorNotification()
  }
}

function* onUpdateGm({ payload }) {
  try {
    const response = yield call(updateGmApi, payload)
    yield put(updateGeneralManagerSuccess(response))
    // payload.history.push("/generalmanagers")
    Notification({
      type: "success",
      message: "Successfully Updated GM",
      title: "Updated!",
    })
  } catch (error) {
    yield put(updateGeneralManagerFail(error))
    errorNotification()
  }
}

function* onDeleteGm({ gmId, history }) {
  try {
    const response = yield call(deleteGmApi, gmId)
    yield put(deleteGeneralManagerSuccess({ ...response, id: gmId }))
    history.push("/generalmanagers")
    doneNotification()
  } catch (error) {
    yield put(deleteGeneralManagerFail(error))
    errorNotification()
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

function* generalmngrSaga() {
  yield takeEvery(GET_GEN_MANAGERS, fetchGms)
  yield takeEvery(GET_GEN_MANAGER_DETAIL, fetchGMDetail)
  yield takeEvery(CREATE_GEN_MANAGER, onCreateGm)
  yield takeEvery(UPDATE_GEN_MANAGER, onUpdateGm)
  yield takeEvery(DELETE_GEN_MANAGER, onDeleteGm)
}

export default generalmngrSaga
