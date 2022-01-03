import {
  GET_GENERALMNGRS,
  GET_GENERALMNGRS_SUCCESS,
  GET_GENERALMNGRS_FAIL,
  GET_GENERALMNGR_DETAIL,
  GET_GENERALMNGR_DETAIL_SUCCESS,
  GET_GENERALMNGR_DETAIL_FAIL,
  CREATE_GENERALMNGR,
  CREATE_GENERALMNGR_SUCCESS,
  CREATE_GENERALMNGR_FAIL,
  UPDATE_GENERALMNGR,
  UPDATE_GENERALMNGR_SUCCESS,
  UPDATE_GENERALMNGR_FAIL,
  DELETE_GENERALMNGR,
  DELETE_GENERALMNGR_SUCCESS,
  DELETE_GENERALMNGR_FAIL,
} from "./actionTypes"

export const getGeneralmngrs = (searchText, page) => ({
  type: GET_GENERALMNGRS,
  payload: { searchText, page },
})

export const getGeneralmngrsSuccess = generalmngrs => ({
  type: GET_GENERALMNGRS_SUCCESS,
  payload: generalmngrs,
})
export const getGeneralmngrsFail = error => ({
  type: GET_GENERALMNGRS_FAIL,
  payload: error,
})

export const getGeneralmngrDetail = generalmngrId => ({
  type: GET_GENERALMNGR_DETAIL,
  generalmngrId,
})

export const getGeneralmngrDetailSuccess = generalmngrDetail => ({
  type: GET_GENERALMNGR_DETAIL_SUCCESS,
  payload: generalmngrDetail,
})

export const getGeneralmngrDetailFail = error => ({
  type: GET_GENERALMNGR_DETAIL_FAIL,
  payload: error,
})

export const createGeneralmngr = (generalmngr, history) => ({
  type: CREATE_GENERALMNGR,
  payload: { generalmngr, history },
})

export const createGeneralmngrSuccess = generalmngr => ({
  type: CREATE_GENERALMNGR_SUCCESS,
  payload: generalmngr,
})

export const createGeneralmngrFail = error => ({
  type: CREATE_GENERALMNGR_FAIL,
  payload: error,
})

export const updateGeneralmngr = (generalmngr, generalmngrId, history) => ({
  type: UPDATE_GENERALMNGR,
  payload: { generalmngr, generalmngrId, history },
})

export const updateGeneralmngrSuccess = generalmngr => ({
  type: UPDATE_GENERALMNGR_SUCCESS,
  payload: generalmngr,
})

export const updateGeneralmngrFail = error => ({
  type: UPDATE_GENERALMNGR_FAIL,
  payload: error,
})

export const deleteGeneralmngr = (generalmngrId, history) => ({
  type: DELETE_GENERALMNGR,
  payload: { generalmngrId, history },
})

export const deleteGeneralmngrSuccess = generalmngr => ({
  type: DELETE_GENERALMNGR_SUCCESS,
  payload: generalmngr,
})

export const deleteGeneralmngrFail = error => ({
  type: DELETE_GENERALMNGR_FAIL,
  payload: error,
})
