import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import {
  GET_WORKSTAGES,
  GET_WORKSTAGE_DETAIL,
  CREATE_WORKSTAGE,
  UPDATE_WORKSTAGE,
  DELETE_WORKSTAGE,
} from "./actionTypes"
import {
  getWorkStagesSuccess,
  getWorkStagesFail,
  getWorkStageDetailSuccess,
  getWorkStageDetailFail,
  createWorkStageSuccess,
  createWorkStageFail,
  updateWorkStageSuccess,
  updateWorkStageFail,
  deleteWorkStageSuccess,
  deleteWorkStageFail
} from "./actions"
import { get, post, ApiPut, del, patch } from "helpers/api_methods"

const getWorkStagesAPi = ({ searchText, page }) => {
  if (searchText) {
    return get(`/account/qualitychecker/?search=${searchText && searchText}`)
  } else {
    return get(`/account/qualitychecker/?page=${page ? page : 1}`)
  }
}
const getWorkStageDetailsAPi = WorkStageId => {
  return get(`/account/qualitychecker/${WorkStageId}/`)
}
const createWorkStageApi = ({ workStage }) => {
  return post("/account/qualitychecker/", workStage)
}
const updateWorkStageApi = ({ workStageId, workStage }) => {
  return ApiPut(`/account/qualitychecker/${workStageId}/`, workStage)
}
const deleteWorkStageApi = ({ workStageId }) => {
  return del(`/account/qualitychecker/${workStageId}/`)
}

function* fetchWorkStages({ payload }) {
  try {
    const response = yield call(getWorkStagesAPi, payload)
    yield put(getWorkStagesSuccess(response))
  } catch (error) {
    yield put(getWorkStagesFail(error))
  }
}

function* fetchWorkStageDetail({ workStageId }) {
  try {
    const response = yield call(getWorkStageDetailsAPi, workStageId)
    yield put(getWorkStageDetailSuccess(response))
  } catch (error) {
    yield put(getWorkStageDetailFail(error))
  }
}
function* onCreateWorkStage({ payload }) {
  try {
    const response = yield call(createWorkStageApi, payload)
    if (response?.error_message) {
      yield put(createWorkStageFail(response?.error_message))
    } else {
      yield put(createWorkStageSuccess(response))
      payload.history.push("/qualitycheckers")
    }
  } catch (error) {
    yield put(createWorkStageFail(error))
  }
}

function* onUpdateWorkStage({ payload }) {
  try {
    const response = yield call(updateWorkStageApi, payload)
    yield put(updateWorkStageSuccess(response))
  } catch (error) {
    yield put(updateWorkStageFail(error))
  }
}

function* onDeleteWorkStage({ payload }) {
  try {
    const response = yield call(deleteWorkStageApi, payload)
    payload.history.push("/qualitycheckers")
    yield put(deleteWorkStageSuccess(response))
  } catch (error) {
    yield put(deleteWorkStageFail(error))
  }
}

function* workStagesSaga() {
  yield takeEvery(GET_WORKSTAGES, fetchWorkStages)
  yield takeEvery(GET_WORKSTAGE_DETAIL, fetchWorkStageDetail)
  yield takeEvery(CREATE_WORKSTAGE, onCreateWorkStage)
  yield takeEvery(UPDATE_WORKSTAGE, onUpdateWorkStage)
  yield takeEvery(DELETE_WORKSTAGE, onDeleteWorkStage)
}

export default workStagesSaga
