import {
  GET_CLIENTS,
  GET_CLIENTS_SUCCESS,
  GET_CLIENTS_FAIL,
  GET_CLIENT_DETAIL,
  GET_CLIENT_DETAIL_SUCCESS,
  GET_CLIENT_DETAIL_FAIL,
  CREATE_CLIENT,
  CREATE_CLIENT_SUCCESS,
  CREATE_CLIENT_FAIL,
  UPDATE_CLIENT,
  UPDATE_CLIENT_SUCCESS,
  UPDATE_CLIENT_FAIL,
  DELETE_CLIENT,
  DELETE_CLIENT_SUCCESS,
  DELETE_CLIENT_FAIL,
} from "./actionTypes"

export const getClients = (searchText, page) => ({
  type: GET_CLIENTS,
  payload: { searchText, page },
})

export const getClientsSuccess = clients => ({
  type: GET_CLIENTS_SUCCESS,
  payload: clients,
})
export const getClientsFail = error => ({
  type: GET_CLIENTS_FAIL,
  payload: error,
})

export const getClientDetail = clientId => ({
  type: GET_CLIENT_DETAIL,
  clientId,
})

export const getClientDetailSuccess = clientDetail => ({
  type: GET_CLIENT_DETAIL_SUCCESS,
  payload: clientDetail,
})

export const getClientDetailFail = error => ({
  type: GET_CLIENT_DETAIL_FAIL,
  payload: error,
})

export const createClient = (client, history) => ({
  type: CREATE_CLIENT,
  payload: { client, history },
})

export const createClientSuccess = client => ({
  type: CREATE_CLIENT_SUCCESS,
  payload: client,
})

export const createClientFail = error => ({
  type: CREATE_CLIENT_FAIL,
  payload: error,
})

export const updateClient = (client, clientId) => ({
  type: UPDATE_CLIENT,
  payload: { client, clientId },
})

export const updateClientSuccess = client => ({
  type: UPDATE_CLIENT_SUCCESS,
  payload: client,
})

export const updateClientFail = error => ({
  type: UPDATE_CLIENT_FAIL,
  payload: error,
})

export const deleteClient = (clientId, history) => ({
  type: DELETE_CLIENT,
  payload: { clientId, history },
})

export const deleteClientSuccess = client => ({
  type: DELETE_CLIENT_SUCCESS,
  payload: client,
})

export const deleteClientFail = error => ({
  type: DELETE_CLIENT_FAIL,
  payload: error,
})
