import {
  CREATE_ORDER,
  CREATE_ORDER_FAIL,
  CREATE_ORDER_SUCCESS,
  DELETE_ORDER,
  DELETE_ORDER_FAIL,
  DELETE_ORDER_SUCCESS,
  GET_ORDERS,
  GET_ORDERS_FAIL,
  GET_ORDERS_SUCCESS,
  GET_ORDER_DETAIL,
  GET_ORDER_DETAIL_FAIL,
  GET_ORDER_DETAIL_SUCCESS,
  UPDATE_ORDER,
  UPDATE_ORDER_FAIL,
  UPDATE_ORDER_ITEM,
  UPDATE_ORDER_ITEM_FAIL,
  UPDATE_ORDER_ITEM_SUCCESS,
  UPDATE_ORDER_SUCCESS,
  GET_QUOTATIONS,
  GET_QUOTATIONS_SUCCESS,
  GET_QUOTATIONS_FAIL,
  CREATE_QUOTATION,
  CREATE_QUOTATION_SUCCESS,
  CREATE_QUOTATION_FAIL,
  GET_QPRODUCTPRICE,
  GET_QPRODUCTPRICE_SUCCESS,
  GET_QPRODUCTPRICE_FAIL
} from "./actionTypes"

export const getQProductPrice = (prodId) => ({
  type: GET_QPRODUCTPRICE,
  payload: { prodId }
})

export const getQProductPriceSuccess = (qProdPrice) => ({
  type: GET_QPRODUCTPRICE_SUCCESS,
  payload: qProdPrice,
})
export const getQProductPriceFail = error => ({
  type: GET_QPRODUCTPRICE_FAIL,
  payload: error,
})

export const getQuotations = (searchText, page) => ({
  type: GET_QUOTATIONS,
  payload: { searchText, page },
})

export const getQuotationsSuccess = orders => ({
  type: GET_QUOTATIONS_SUCCESS,
  payload: orders,
})
export const getQuotationsFail = error => ({
  type: GET_QUOTATIONS_FAIL,
  payload: error,
})
export const createQuatation = (Quatation, history) => ({
  type: CREATE_QUOTATION,
  payload: { Quatation, history },
})

export const createQuatationSuccess = Quatation => ({
  type: CREATE_QUOTATION_SUCCESS,
  payload: Quatation,
})

export const createQuatationFail = error => ({
  type: CREATE_QUOTATION_FAIL,
  payload: error,
})

export const getOrders = (searchText, page) => ({
  type: GET_ORDERS,
  payload: { searchText, page },
})

export const getOrdersSuccess = orders => ({
  type: GET_ORDERS_SUCCESS,
  payload: orders,
})
export const getOrdersFail = error => ({
  type: GET_ORDERS_FAIL,
  payload: error,
})

export const getOrderDetail = orderId => ({
  type: GET_ORDER_DETAIL,
  orderId,
})

export const getOrderDetailSuccess = orderDetail => ({
  type: GET_ORDER_DETAIL_SUCCESS,
  payload: orderDetail,
})

export const getOrderDetailFail = error => ({
  type: GET_ORDER_DETAIL_FAIL,
  payload: error,
})

export const createOrder = (order, history) => ({
  type: CREATE_ORDER,
  payload: { order, history },
})

export const createOrderSuccess = order => ({
  type: CREATE_ORDER_SUCCESS,
  payload: order,
})

export const createOrderFail = error => ({
  type: CREATE_ORDER_FAIL,
  payload: error,
})

export const updateOrder = (order, orderId, history, statusUpdate) => ({
  type: UPDATE_ORDER,
  payload: { order, orderId, history, statusUpdate },
})

export const updateOrderSuccess = order => ({
  type: UPDATE_ORDER_SUCCESS,
  payload: order,
})

export const updateOrderFail = error => ({
  type: UPDATE_ORDER_FAIL,
  payload: error,
})

export const updateOrderItem = (order, orderItemId) => ({
  type: UPDATE_ORDER_ITEM,
  payload: { order, orderItemId },
})

export const updateOrderItemSuccess = order => ({
  type: UPDATE_ORDER_ITEM_SUCCESS,
  payload: order,
})

export const updateOrderItemFail = error => ({
  type: UPDATE_ORDER_ITEM_FAIL,
  payload: error,
})

export const deleteOrder = (orderId, history) => ({
  type: DELETE_ORDER,
  orderId,
  history,
})

export const deleteOrderSuccess = order => ({
  type: DELETE_ORDER_SUCCESS,
  payload: order,
})

export const deleteOrderFail = error => ({
  type: DELETE_ORDER_FAIL,
  payload: error,
})
