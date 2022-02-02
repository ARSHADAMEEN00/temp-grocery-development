import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import {
  GET_CLIENTS,
  GET_CLIENT_DETAIL,
  CREATE_CLIENT,
  UPDATE_CLIENT,
  DELETE_CLIENT,
} from "./actionTypes"
import {
  getClientsSuccess,
  getClientsFail,
  getClientDetailSuccess,
  getClientDetailFail,
  createClientSuccess,
  createClientFail,
  updateClientSuccess,
  updateClientFail,
  deleteClientSuccess,
  deleteClientFail,
} from "./actions"
import { get, post, ApiPut, del, patch } from "helpers/api_methods"

const getClientsAPi = ({ searchText, page }) => {
  if (searchText) {
    return get(`/order/client/?search=${searchText && searchText}`)
  } else {
    return get(`/order/client/`)
  }
}
const getClientDetailsAPi = clientId => {
  return get(`/order/client/${clientId}/`)
}
const createClientApi = ({ client }) => {
  return post("/order/client/", client)
}
const updateClientApi = ({ clientId, client }) => {
  return ApiPut(`/order/client/${clientId}/`, client)
}
const deleteClientApi = ({ clientId }) => {
  return del(`/order/client/${clientId}/`)
}

function* fetchClients({ payload }) {
  try {
    const response = yield call(getClientsAPi, payload)
    yield put(getClientsSuccess(response))
  } catch (error) {
    yield put(getClientsFail(error))
  }
}

function* fetchClientDetail({ clientId }) {
  try {
    const response = yield call(getClientDetailsAPi, clientId)
    yield put(getClientDetailSuccess(response))
  } catch (error) {
    yield put(getClientDetailFail(error))
  }
}
function* onCreateClient({ payload }) {
  try {
    const response = yield call(createClientApi, payload)
    if (response.email[0] === "Client with this email already exists.") {
      yield put(createClientFail(response.email))
    } else {
      yield put(createClientSuccess(response))
      payload.history.push("/clients")
    }
  } catch (error) {
    yield put(createClientFail(error))
  }
}

function* onUpdateClient({ payload }) {
  try {
    const response = yield call(updateClientApi, payload)
    yield put(updateClientSuccess(response))
  } catch (error) {
    yield put(updateClientFail(error))
  }
}

function* onDeleteClient({ payload }) {
  try {
    const response = yield call(deleteClientApi, payload)
    payload.history.push("/clients")
    yield put(deleteClientSuccess(response))
  } catch (error) {
    yield put(deleteClientFail(error))
  }
}

function* ClientsSaga() {
  yield takeEvery(GET_CLIENTS, fetchClients)
  yield takeEvery(GET_CLIENT_DETAIL, fetchClientDetail)
  yield takeEvery(CREATE_CLIENT, onCreateClient)
  yield takeEvery(UPDATE_CLIENT, onUpdateClient)
  yield takeEvery(DELETE_CLIENT, onDeleteClient)
}

export default ClientsSaga
