import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import {
  GET_ORDERS,
  GET_ORDER_DETAIL,
  UPDATE_ORDER,
  CREATE_ORDER,
  DELETE_ORDER,
  UPDATE_ORDER_ITEM,
  GET_QUOTATIONS,
  CREATE_QUOTATION,
  GET_QPRODUCTPRICE
} from "./actionTypes"
import {
  getOrdersSuccess,
  getOrdersFail,
  getOrderDetailSuccess,
  getOrderDetailFail,
  createOrderSuccess,
  createOrderFail,
  updateOrderSuccess,
  updateOrderFail,
  deleteOrderSuccess,
  deleteOrderFail,
  getQuotationsSuccess,
  getQuotationsFail,
  createQuatationFail,
  createQuatationSuccess,
  getQProductPriceFail,
} from "./actions"
import { get, post, ApiPut, del, patch } from "helpers/api_methods"
import { updateOrderItemFail, updateOrderItemSuccess } from "store/actions"

function getOrdersAPi({ searchText, page }) {
  if (searchText) {
    return get(`/order/order/?search=${searchText && searchText}`)
  } else {
    return get(`/order/order/?page=${page ? page : 1}`)
  }
}
function getQuotationsAPi({ searchText, page }) {
  if (searchText) {
    return get(`/quotation/quotation/?search=${searchText && searchText}`)
  } else {
    return get(`/quotation/quotation/?page=${page ? page : 1}`)
  }
}

const getQProductPriceAPi = ({ prodId }) => {
  return post(`/store/product-cost-id/`, { id: prodId })
}
const createQuotationApi = ({ quatation }) => {
  console.log(quatation);
  return post("/quotation/quotation/", quatation)
}

const getOrderDetailsAPi = orderId => {
  return get(`/order/order/${orderId}/`)
}
const createOrderApi = ({ order }) => {
  return post("/order/order/", order)
}
const updateOrderApi = ({ orderId, order, statusUpdate }) => {
  if (statusUpdate) {
    return patch(`/order/order/${orderId}/`, statusUpdate)
  } else {
    return ApiPut(`/order/order/${orderId}/`, order)
  }
}
const updateOrderItemApi = ({ order, orderItemId }) => {
  return ApiPut(`order/orderitem/${orderItemId}/`, order)
}
const deleteOrderApi = orderId => {
  return del(`/order/order/${orderId}/`)
}

function* fetchQProductPrice({ payload }) {
  console.log("sdgrjgbfwsjbj");
  try {
    const response = yield call(getQProductPriceAPi, payload)
    yield put(getQProductPriceSuccess(response))
    console.log("price");
    console.log(response);
  } catch (error) {
    yield put(getQProductPriceFail(error))
  }
}

function* fetchQuotations({ payload }) {
  try {
    const response = yield call(getQuotationsAPi, payload)
    yield put(getQuotationsSuccess(response))
  } catch (error) {
    yield put(getQuotationsFail(error))
  }
}

function* onCreateQuotation({ payload }) {
  try {
    const response = yield call(createQuotationApi, payload)
    yield put(createQuatationSuccess(response))
    payload.history.push("/quotations")
  } catch (error) {
    yield put(createQuatationFail(error))
  }
}

function* fetchOrders({ payload }) {
  try {
    const response = yield call(getOrdersAPi, payload)
    yield put(getOrdersSuccess(response))
  } catch (error) {
    yield put(getOrdersFail(error))
  }
}

function* fetchOrderDetail({ orderId }) {
  try {
    const response = yield call(getOrderDetailsAPi, orderId)
    yield put(getOrderDetailSuccess(response))
  } catch (error) {
    yield put(getOrderDetailFail(error))
  }
}
function* onCreateOrder({ payload }) {
  try {
    const response = yield call(createOrderApi, payload)
    if (response?.error_message) {
      yield put(createOrderFail(response?.error_message))
    } else {
      yield put(createOrderSuccess(response))
      payload.history.push("/orders")
    }
  } catch (error) {
    yield put(createOrderFail(error))
  }
}

function* onUpdateOrder({ payload }) {
  try {
    const response = yield call(updateOrderApi, payload)
    if (response.response == "No Stocks Available") {
      yield put(updateOrderFail(response))
    } else {
      yield put(updateOrderSuccess(response))
    }
  } catch (error) {
    yield put(updateOrderFail(error))
  }
}

function* onUpdateOrderItem({ payload }) {
  try {
    const response = yield call(updateOrderItemApi, payload)
    yield put(updateOrderItemSuccess({ ...response, id: payload.orderItemId }))
  } catch (error) {
    yield put(updateOrderItemFail(error))
  }
}

function* onDeleteOrder({ orderId, history }) {
  try {
    const response = yield call(deleteOrderApi, orderId)
    yield put(deleteOrderSuccess(response))
    history.push("/orders")
  } catch (error) {
    yield put(deleteOrderFail(error))
  }
}

function* ordersSaga() {
  yield takeEvery(GET_ORDERS, fetchOrders)
  yield takeEvery(GET_ORDER_DETAIL, fetchOrderDetail)
  yield takeEvery(CREATE_ORDER, onCreateOrder)
  yield takeEvery(UPDATE_ORDER, onUpdateOrder)
  yield takeEvery(DELETE_ORDER, onDeleteOrder)
  yield takeEvery(UPDATE_ORDER_ITEM, onUpdateOrderItem)
  yield takeEvery(GET_QUOTATIONS, fetchQuotations)
  yield takeEvery(CREATE_QUOTATION, onCreateQuotation)
  yield takeEvery(GET_QPRODUCTPRICE, fetchQProductPrice)
}

export default ordersSaga
