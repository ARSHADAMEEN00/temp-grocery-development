import {
  GET_SALESMANS,
  GET_SALESMANS_SUCCESS,
  GET_SALESMANS_FAIL,
  GET_SALESMAN_DETAIL,
  GET_SALESMAN_DETAIL_SUCCESS,
  GET_SALESMAN_DETAIL_FAIL,
  CREATE_SALESMAN,
  CREATE_SALESMAN_SUCCESS,
  CREATE_SALESMAN_FAIL,
  UPDATE_SALESMAN,
  UPDATE_SALESMAN_SUCCESS,
  UPDATE_SALESMAN_FAIL,
  DELETE_SALESMAN,
  DELETE_SALESMAN_SUCCESS,
  DELETE_SALESMAN_FAIL,
} from "./actionTypes"

export const getSalesmans = (searchText, page) => ({
  type: GET_SALESMANS,
  payload: { searchText, page },
})

export const getSalesmansSuccess = salesmans => ({
  type: GET_SALESMANS_SUCCESS,
  payload: salesmans,
})
export const getSalesmansFail = error => ({
  type: GET_SALESMANS_FAIL,
  payload: error,
})

export const getSalesmanDetail = salesmanId => ({
  type: GET_SALESMAN_DETAIL,
  salesmanId,
})

export const getSalesmanDetailSuccess = salesmanDetail => ({
  type: GET_SALESMAN_DETAIL_SUCCESS,
  payload: salesmanDetail,
})

export const getSalesmanDetailFail = error => ({
  type: GET_SALESMAN_DETAIL_FAIL,
  payload: error,
})

export const createSalesman = (salesman, history) => ({
  type: CREATE_SALESMAN,
  payload: { salesman, history },
})

export const createSalesmanSuccess = salesman => ({
  type: CREATE_SALESMAN_SUCCESS,
  payload: salesman,
})

export const createSalesmanFail = error => ({
  type: CREATE_SALESMAN_FAIL,
  payload: error,
})

export const updateSalesman = (salesman, salesmanId) => ({
  type: UPDATE_SALESMAN,
  payload: { salesman, salesmanId },
})

export const updateSalesmanSuccess = salesman => ({
  type: UPDATE_SALESMAN_SUCCESS,
  payload: salesman,
})

export const updateSalesmanFail = error => ({
  type: UPDATE_SALESMAN_FAIL,
  payload: error,
})

export const deleteSalesman = (salesmanId, history) => ({
  type: DELETE_SALESMAN,
  payload: { salesmanId, history },
})

export const deleteSalesmanSuccess = salesman => ({
  type: DELETE_SALESMAN_SUCCESS,
  payload: salesman,
})

export const deleteSalesmanFail = error => ({
  type: DELETE_SALESMAN_FAIL,
  payload: error,
})
