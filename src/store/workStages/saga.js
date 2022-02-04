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
  deleteWorkStageFail,
} from "./actions"
import { get, post, ApiPut, del, patch } from "helpers/api_methods"
import { Notification } from "components/Common/Notification"

const getWorkStagesAPi = ({ searchText, page }) => {
  if (searchText) {
    return get(`/stages/stages/?search=${searchText && searchText}`)
  } else {
    return get(`/stages/stages/?page=${page ? page : 1}`)
  }
}
const getWorkStageDetailsAPi = WorkStageId => {
  return get(`/stages/stages/${WorkStageId}/`)
}
const createWorkStageApi = ({ workStage }) => {
  return post("/stages/stages/", workStage)
}
const updateWorkStageApi = ({ workStageId, workStage }) => {
  return patch(`/stages/stages/${workStageId}/`, workStage)
}
const deleteWorkStageApi = ({ workStageId }) => {
  return del(`/stages/stages/${workStageId}/`)
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
      payload.history.push("/stages")
      Notification({
        type: "success",
        message: "Successfully Created Stage",
        title: "Created!",
      })
    }
  } catch (error) {
    yield put(createWorkStageFail(error))
    errorNotification()
  }
}

function* onUpdateWorkStage({ payload }) {
  try {
    const response = yield call(updateWorkStageApi, payload)
    yield put(updateWorkStageSuccess({ ...response, id: payload.workStageId }))
    doneNotification()
  } catch (error) {
    yield put(updateWorkStageFail(error))
    errorNotification()
  }
}

function* onDeleteWorkStage({ payload }) {
  try {
    const response = yield call(deleteWorkStageApi, payload)
    payload.history.push("/stages")
    yield put(deleteWorkStageSuccess(response))
    doneNotification()
  } catch (error) {
    yield put(deleteWorkStageFail(error))
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

function* workStagesSaga() {
  yield takeEvery(GET_WORKSTAGES, fetchWorkStages)
  yield takeEvery(GET_WORKSTAGE_DETAIL, fetchWorkStageDetail)
  yield takeEvery(CREATE_WORKSTAGE, onCreateWorkStage)
  yield takeEvery(UPDATE_WORKSTAGE, onUpdateWorkStage)
  yield takeEvery(DELETE_WORKSTAGE, onDeleteWorkStage)
}

export default workStagesSaga
