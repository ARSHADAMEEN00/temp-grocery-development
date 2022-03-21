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
  GET_ORDERSITEMS_DETAIL,
  GET_QUOTATION_CLIENT_ID,
  GET_ORDERSITEMS_BYFILTERED,
  GET_ORDER_RAWMATERIAL,
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
  getQuotationClientIdSuccess,
  getQuotationClientIdFail,
  getOrderItemsByFiltedSuccess,
  getOrderItemsByFiltedFail,
  getOrderRawmaterailSuccess,
  getOrderRawmaterailFail,
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
function getOrdersItemsByFilterdAPi({ sort, searchText, page }) {
  return get(
    `/order/orderitem/?page=${page ? page : 1}&status=${sort && sort}&search=${searchText && searchText
    }`
  )
}

const getOrderItemDetailsAPi = orderItemId => {
  return get(`/order/orderitem/${orderItemId}/`)
}

function getOrdersAPi({ searchText, page, status }) {
  if (searchText) {
    return get(`/order/order/?search=${searchText && searchText}`)
  } else if (status) {
    return get(
      `/order/order/?page=${page ? page : 1}&status=${status && status
      }&search=${searchText && searchText}`
    )
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
const getQuotationDetailsAPi = quotationId => {
  return get(`/quotation/quotation/${quotationId}/`)
}

const getQuotationClientDetailsAPi = clientId => {
  return post(`/quotation/quotation-client-id/`, { id: clientId })
}

const createQuotationApi = ({ Quatation }) => {
  return post("/quotation/quotation/", Quatation)
}

const getOrderDetailsAPi = orderId => {
  return get(`/order/order/${orderId}/`)
}

const getOrderRawmaterialAPi = orderId => {
  return post(`/order/order_rawmaterials/`, { "id": orderId })
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
  if (order.qc_status === "QC_Approved") {
    return patch(`order/orderitem/${orderItemId}/`, order)
  } else {
    return ApiPut(`order/orderitem/${orderItemId}/`, order)
  }
}
const deleteOrderApi = ({ orderId }) => {
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
function* fetchOrderItemsByFiltered({ payload }) {
  try {
    const response = yield call(getOrdersItemsByFilterdAPi, payload)
    yield put(getOrderItemsByFiltedSuccess(response))
  } catch (error) {
    yield put(getOrderItemsByFiltedFail(error))
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
function* fetchOrderRawmaterial({ orderId }) {
  try {
    const response = yield call(getOrderRawmaterialAPi, orderId)
    yield put(getOrderRawmaterailSuccess(response))
  } catch (error) {
    yield put(getOrderRawmaterailFail(error))
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

    if (response.response === "No Stocks Available") {
      Notification({
        type: "warning",
        message: "No Stocks Available",
        title: "",
      })
    }
    if (response.response === "Invalid input") {
      Notification({
        type: "error",
        message: "Invalid input",
        title: "",
      })
    } else {
      yield put(createOrderSuccess(response))
      payload.history.push("/orders")
      Notification({
        type: "success",
        message: "Successfully Created Order",
        title: "Created!",
      })
    }
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
      doneNotification()
    }
  } catch (error) {
    yield put(updateOrderFail(error))
    errorNotification()
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

function* onDeleteOrder({ payload }) {
  try {
    const response = yield call(deleteOrderApi, payload)
    yield put(deleteOrderSuccess(response))
    payload.history.push("/orders")
    doneNotification()
  } catch (error) {
    yield put(deleteOrderFail(error))
    errorNotification()
  }
}

function* fetchQuotationClientDetails({ clientId }) {
  try {
    const response = yield call(getQuotationClientDetailsAPi, clientId)
    yield put(getQuotationClientIdSuccess(response))
  } catch (error) {
    yield put(getQuotationClientIdFail(error))
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
  yield takeEvery(GET_QUOTATION_CLIENT_ID, fetchQuotationClientDetails)
  yield takeEvery(GET_ORDERSITEMS_BYFILTERED, fetchOrderItemsByFiltered)
  yield takeEvery(GET_ORDER_RAWMATERIAL, fetchOrderRawmaterial)
}

export default ordersSaga
