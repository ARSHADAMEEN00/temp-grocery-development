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
  GET_QPRODUCTPRICE,
  GET_QUOTATION_DETAIL,
  GET_ORDERSITEMS,
  GET_ORDERSITEMS_DETAIL
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
  getQProductPriceSuccess,
  getQuotationDetailSuccess,
  getQuotationDetailFail,
  getOrderItemsSuccess,
  getOrderItemsFail,
  getOrderItemDetailSuccess,
  getOrderItemDetailFail,
} from "./actions"
import { get, post, ApiPut, del, patch } from "helpers/api_methods"
import { updateOrderItemFail, updateOrderItemSuccess } from "store/actions"
import { Notification } from "components/Common/Notification"


function getOrdersItemsAPi({ searchText, page }) {
  if (searchText) {
    return get(`/order/orderitem/?search=${searchText && searchText}`)
  } else {
    return get(`/order/orderitem/?page=${page ? page : 1}`)
  }
}
const getOrderItemDetailsAPi = orderItemId => {
  return get(`/order/orderitem/${orderItemId}/`)
}

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
const getQuotationDetailsAPi = (quotationId) => {
  return get(`/quotation/quotation/${quotationId}/`)
}

const createQuotationApi = ({ Quatation }) => {
  return post("/quotation/quotation/", Quatation)
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

const getQProductPriceAPi = ({ prodId }) => {
  return post(`/store/product-cost-id/`, { id: prodId })
}

function* fetchQProductPrice({ payload }) {
  try {
    const response = yield call(getQProductPriceAPi, payload)
    yield put(getQProductPriceSuccess(response))
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
function* fetchQuotationDetail({ quotationId }) {
  try {
    const response = yield call(getQuotationDetailsAPi, quotationId)
    yield put(getQuotationDetailSuccess(response))
  } catch (error) {
    yield put(getQuotationDetailFail(error))
  }
}

function* onCreateQuotation({ payload }) {
  try {
    const response = yield call(createQuotationApi, payload)
    yield put(createQuatationSuccess(response))
    // payload.history.push("/quotations")
    Notification({
      type: "success",
      message: "Successfully Created Quotations",
      title: "Created!",
    })
  } catch (error) {
    yield put(createQuatationFail(error))
    errorNotification()
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
function* fetchOrderItems({ payload }) {
  try {
    const response = yield call(getOrdersItemsAPi, payload)
    yield put(getOrderItemsSuccess(response))
  } catch (error) {
    yield put(getOrderItemsFail(error))
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
function* fetchOrderItemDetail({ orderItemId }) {
  try {
    const response = yield call(getOrderItemDetailsAPi, orderItemId)
    yield put(getOrderItemDetailSuccess(response))
  } catch (error) {
    yield put(getOrderItemDetailFail(error))
  }
}

function* onCreateOrder({ payload }) {
  try {
    const response = yield call(createOrderApi, payload)
    yield put(createOrderSuccess(response))
    payload.history.push("/orders")
    Notification({
      type: "success",
      message: "Successfully Created Order",
      title: "Created!",
    })
  } catch (error) {
    yield put(createOrderFail(error))
    errorNotification()
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
    Notification({
      type: "success",
      message: "Successfully Updated",
      title: "Updated!",
    })
  } catch (error) {
    yield put(updateOrderItemFail(error))
    errorNotification()
  }
}

function* onDeleteOrder({ orderId, history }) {
  try {
    const response = yield call(deleteOrderApi, orderId)
    yield put(deleteOrderSuccess(response))
    history.push("/orders")
    doneNotification()
  } catch (error) {
    yield put(deleteOrderFail(error))
    errorNotification()
  }
}


function errorNotification() {
  Notification({
    type: "error",
    message: "Something Went Wrong",
    title: "Try Again"
  })
}

function doneNotification() {
  Notification({
    type: "success",
    message: "Done",
    title: ""
  })
}

function* ordersSaga() {
  yield takeEvery(GET_ORDERS, fetchOrders)
  yield takeEvery(GET_ORDER_DETAIL, fetchOrderDetail)
  yield takeEvery(CREATE_ORDER, onCreateOrder)
  yield takeEvery(UPDATE_ORDER, onUpdateOrder)
  yield takeEvery(DELETE_ORDER, onDeleteOrder)
  yield takeEvery(UPDATE_ORDER_ITEM, onUpdateOrderItem)
  yield takeEvery(GET_QUOTATIONS, fetchQuotations)
  yield takeEvery(GET_QUOTATION_DETAIL, fetchQuotationDetail)
  yield takeEvery(CREATE_QUOTATION, onCreateQuotation)
  yield takeEvery(GET_QPRODUCTPRICE, fetchQProductPrice)
  yield takeEvery(GET_ORDERSITEMS, fetchOrderItems)
  yield takeEvery(GET_ORDERSITEMS_DETAIL, fetchOrderItemDetail)
}

export default ordersSaga
