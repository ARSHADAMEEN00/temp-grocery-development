import {
  GET_GEN_MANAGERS,
  GET_GEN_MANAGERS_SUCCESS,
  GET_GEN_MANAGERS_FAIL,
  GET_GEN_MANAGER_DETAIL,
  GET_GEN_MANAGER_DETAIL_SUCCESS,
  GET_GEN_MANAGER_DETAIL_FAIL,
  CREATE_GEN_MANAGER,
  CREATE_GEN_MANAGER_SUCCESS,
  CREATE_GEN_MANAGER_FAIL,
  UPDATE_GEN_MANAGER,
  UPDATE_GEN_MANAGER_SUCCESS,
  UPDATE_GEN_MANAGER_FAIL,
  DELETE_GEN_MANAGER,
  DELETE_GEN_MANAGER_SUCCESS,
  DELETE_GEN_MANAGER_FAIL,
} from "./actionTypes"

export const getGeneralManagers = (searchText, page) => ({
  type: GET_GEN_MANAGERS,
  payload: { searchText, page },
})

export const getGeneralManagersSuccess = gms => ({
  type: GET_GEN_MANAGERS_SUCCESS,
  payload: gms,
})
export const getGeneralManagersFail = error => ({
  type: GET_GEN_MANAGERS_FAIL,
  payload: error,
})

export const getGeneralManagerDetail = (gmId, page) => ({
  type: GET_GEN_MANAGER_DETAIL,
  payload: { gmId, page },
})

export const getGeneralManagerDetailSuccess = gmDetail => ({
  type: GET_GEN_MANAGER_DETAIL_SUCCESS,
  payload: gmDetail,
})

export const getGeneralManagerDetailFail = error => ({
  type: GET_GEN_MANAGER_DETAIL_FAIL,
  payload: error,
})

export const createGeneralManager = (gm, history) => ({
  type: CREATE_GEN_MANAGER,
  payload: { gm, history },
})

export const createGeneralManagerSuccess = gm => ({
  type: CREATE_GEN_MANAGER_SUCCESS,
  payload: gm,
})

export const createGeneralManagerFail = error => ({
  type: CREATE_GEN_MANAGER_FAIL,
  payload: error,
})

export const updateGeneralManager = (gm, gmId, history) => ({
  type: UPDATE_GEN_MANAGER,
  payload: { gm, gmId, history },
})

export const updateGeneralManagerSuccess = gm => ({
  type: UPDATE_GEN_MANAGER_SUCCESS,
  payload: gm,
})

export const updateGeneralManagerFail = error => ({
  type: UPDATE_GEN_MANAGER_FAIL,
  payload: error,
})

export const deleteGeneralManager = (gmId, history) => ({
  type: DELETE_GEN_MANAGER,
  gmId,
  history,
})

export const deleteGeneralManagerSuccess = gm => ({
  type: DELETE_GEN_MANAGER_SUCCESS,
  payload: gm,
})

export const deleteGeneralManagerFail = error => ({
  type: DELETE_GEN_MANAGER_FAIL,
  payload: error,
})
