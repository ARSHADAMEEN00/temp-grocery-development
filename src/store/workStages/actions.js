import {
  GET_WORKSTAGES,
  GET_WORKSTAGES_SUCCESS,
  GET_WORKSTAGES_FAIL,
  GET_WORKSTAGE_DETAIL,
  GET_WORKSTAGE_DETAIL_SUCCESS,
  GET_WORKSTAGE_DETAIL_FAIL,
  CREATE_WORKSTAGE,
  CREATE_WORKSTAGE_SUCCESS,
  CREATE_WORKSTAGE_FAIL,
  UPDATE_WORKSTAGE,
  UPDATE_WORKSTAGE_SUCCESS,
  UPDATE_WORKSTAGE_FAIL,
  DELETE_WORKSTAGE,
  DELETE_WORKSTAGE_SUCCESS,
  DELETE_WORKSTAGE_FAIL,
} from "./actionTypes"

export const getWorkStages = (searchText, page) => ({
  type: GET_WORKSTAGES,
  payload: { searchText, page },
})

export const getWorkStagesSuccess = workStages => ({
  type: GET_WORKSTAGES_SUCCESS,
  payload: workStages,
})
export const getWorkStagesFail = error => ({
  type: GET_WORKSTAGES_FAIL,
  payload: error,
})

export const getWorkStageDetail = workStageId => ({
  type: GET_WORKSTAGE_DETAIL,
  workStageId,
})

export const getWorkStageDetailSuccess = workStageDetail => ({
  type: GET_WORKSTAGE_DETAIL_SUCCESS,
  payload: workStageDetail,
})

export const getWorkStageDetailFail = error => ({
  type: GET_WORKSTAGE_DETAIL_FAIL,
  payload: error,
})

export const createWorkStage = (workStage, history) => ({
  type: CREATE_WORKSTAGE,
  payload: { workStage, history },
})

export const createWorkStageSuccess = workStage => ({
  type: CREATE_WORKSTAGE_SUCCESS,
  payload: workStage,
})

export const createWorkStageFail = error => ({
  type: CREATE_WORKSTAGE_FAIL,
  payload: error,
})

export const updateWorkStage = (workStage, workStageId, history) => ({
  type: UPDATE_WORKSTAGE,
  payload: { workStage, workStageId, history },
})

export const updateWorkStageSuccess = workStage => ({
  type: UPDATE_WORKSTAGE_SUCCESS,
  payload: workStage,
})

export const updateWorkStageFail = error => ({
  type: UPDATE_WORKSTAGE_FAIL,
  payload: error,
})

export const deleteWorkStage = (workStageId, history) => ({
  type: DELETE_WORKSTAGE,
  payload: { workStageId, history },
})

export const deleteWorkStageSuccess = workStage => ({
  type: DELETE_WORKSTAGE_SUCCESS,
  payload: workStage,
})

export const deleteWorkStageFail = error => ({
  type: DELETE_WORKSTAGE_FAIL,
  payload: error,
})
