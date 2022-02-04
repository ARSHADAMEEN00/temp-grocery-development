import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import {
  GET_STOREITEMS,
  GET_STOREITEM_DETAIL,
  CREATE_STOREITEM,
  UPDATE_STOREITEM,
  DELETE_STOREITEM,
  GET_STORESUPPLY,
  UPDATE_STORESUPPLY,
} from "./actionTypes"
import {
  getStoreItemsSuccess,
  getStoreItemsFail,
  getStoreItemDetailSuccess,
  getStoreItemDetailFail,
  createStoreItemSuccess,
  createStoreItemFail,
  updateStoreItemSuccess,
  updateStoreItemFail,
  deleteStoreItemSuccess,
  deleteStoreItemFail,
  getStoreSupplySuccess,
  getStoreSupplyFail,
  updateStoreSupplySuccess,
  updateStoreSupplyFail,
} from "./actions"
import { get, post, ApiPut, del, patch } from "helpers/api_methods"
import { Notification } from "components/Common/Notification"

function getStoreItemsAPi({ searchText, page }) {
  if (searchText) {
    return get(`/store/store/?search=${searchText && searchText}`)
  } else {
    return get(`/store/store/?page=${page ? page : 1}`)
  }
}
function getStoreSupplyApi({ searchText, page }) {
  if (searchText) {
    return get(`/order/storemanagerview/?search=${searchText && searchText}`)
  } else {
    return get(`/order/storemanagerview/?page=${page ? page : 1}`)
  }
}
const updateStoreSupplyApi = ({ storeSupplyId, storeSupply }) => {
  return patch(`/order/storemanagerview/${storeSupplyId}/`, storeSupply)
}
const getStoreItemDetailsAPi = storeItemId => {
  return get(`/store/store/${storeItemId}/`)
}
const createStoreItemApi = ({ storeItem }) => {
  return post("/store/store/", storeItem)
}
const updateStoreItemApi = ({ storeItemId, storeItem, isUpdate }) => {
  if (isUpdate === "isUpdate") {
    return patch(`/store/store/${storeItemId}/`, storeItem)
  } else {
    return ApiPut(`/store/store/${storeItemId}/`, storeItem)
  }
}

const deleteStoreItemApi = ({ storeItemId }) => {
  return del(`/store/store/${storeItemId}/`)
}

function* fetchStoreItems({ payload }) {
  try {
    const response = yield call(getStoreItemsAPi, payload)
    yield put(getStoreItemsSuccess(response))
  } catch (error) {
    yield put(getStoreItemsFail(error))
  }
}

function* fetchStoreSupply({ payload }) {
  try {
    const response = yield call(getStoreSupplyApi, payload)
    yield put(getStoreSupplySuccess(response))
  } catch (error) {
    yield put(getStoreSupplyFail(error))
  }
}

function* fetchStoreItemDetail({ storeItemId }) {
  try {
    const response = yield call(getStoreItemDetailsAPi, storeItemId)
    yield put(getStoreItemDetailSuccess(response))
  } catch (error) {
    yield put(getStoreItemDetailFail(error))
  }
}
function* onCreateStoreItem({ payload }) {
  try {
    const response = yield call(createStoreItemApi, payload)
    if (response?.error_message) {
      yield put(createStoreItemFail(response?.error_message))
    } else {
      yield put(createStoreItemSuccess(response))
      payload.history.push("/stores")
      Notification({
        type: "success",
        message: "Successfully Created StoreItem",
        title: "Created!",
      })
    }
  } catch (error) {
    yield put(createStoreItemFail(error))
    errorNotification()
  }
}

function* onUpdateStoreItem({ payload }) {
  try {
    const response = yield call(updateStoreItemApi, payload)
    yield put(updateStoreItemSuccess(response))
    Notification({
      type: "success",
      message: "Successfully Updated StoreItem",
      title: "Updated!",
    })
    if (payload.history) {
      payload.history.push("/stores")
    }
  } catch (error) {
    yield put(updateStoreItemFail(error))
    errorNotification()
  }
}

function* onUpdateStoreSupply({ payload }) {
  try {
    const response = yield call(updateStoreSupplyApi, payload)
    yield put(
      updateStoreSupplySuccess({ ...response, id: payload.storeSupplyId })
    )
    doneNotification()
  } catch (error) {
    yield put(updateStoreSupplyFail(error))
    errorNotification()
  }
}

function* onDeleteStoreItem({ payload }) {
  try {
    const response = yield call(deleteStoreItemApi, payload)
    yield put(deleteStoreItemSuccess({ ...response, id: payload.storeItemId }))
    doneNotification()
  } catch (error) {
    errorNotification()
    yield put(deleteStoreItemFail(error))
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

function* storeItemsSaga() {
  yield takeEvery(GET_STOREITEMS, fetchStoreItems)
  yield takeEvery(GET_STOREITEM_DETAIL, fetchStoreItemDetail)
  yield takeEvery(CREATE_STOREITEM, onCreateStoreItem)
  yield takeEvery(UPDATE_STOREITEM, onUpdateStoreItem)
  yield takeEvery(DELETE_STOREITEM, onDeleteStoreItem)
  yield takeEvery(GET_STORESUPPLY, fetchStoreSupply)
  yield takeEvery(UPDATE_STORESUPPLY, onUpdateStoreSupply)
}

export default storeItemsSaga
