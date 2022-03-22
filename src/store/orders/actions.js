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
  //quotation
  GET_QUOTATIONS,
  GET_QUOTATIONS_SUCCESS,
  GET_QUOTATIONS_FAIL,
  GET_QUOTATION_DETAIL,
  GET_QUOTATION_DETAIL_SUCCESS,
  GET_QUOTATION_DETAIL_FAIL,
  CREATE_QUOTATION,
  CREATE_QUOTATION_SUCCESS,
  CREATE_QUOTATION_FAIL,
  GET_QPRODUCTPRICE,
  GET_QPRODUCTPRICE_SUCCESS,
  GET_QPRODUCTPRICE_FAIL,
  GET_ORDERSITEMS,
  GET_ORDERSITEMS_SUCCESS,
  GET_ORDERSITEMS_FAIL,
  GET_ORDERSITEMS_DETAIL_SUCCESS,
  GET_ORDERSITEMS_DETAIL,
  GET_ORDERSITEMS_DETAIL_FAIL,
  GET_QUOTATION_CLIENT_ID,
  GET_QUOTATION_CLIENT_ID_SUCCESS,
  GET_QUOTATION_CLIENT_ID_FAIL,
  GET_ORDERSITEMS_BYFILTERED,
  GET_ORDERSITEMS_BYFILTERED_FAIL,
  GET_ORDERSITEMS_BYFILTERED_SUCCESS,
  GET_ORDER_RAWMATERIAL,
  GET_ORDER_RAWMATERIAL_SUCCESS,
  GET_ORDER_RAWMATERIAL_FAIL,
  GET_BANKDETAILS,
  GET_BANKDETAILS_SUCCESS,
  GET_BANKDETAILS_FAIL,
} from "./actionTypes"

export const getBankDetails = () => ({
  type: GET_BANKDETAILS,
})

export const getBankDetailsSuccess = bankDetails => ({
  type: GET_BANKDETAILS_SUCCESS,
  payload: bankDetails,
})
export const getBankDetailsFail = error => ({
  type: GET_BANKDETAILS_FAIL,
  payload: error,
})

export const getQuotationClientId = clientId => ({
  type: GET_QUOTATION_CLIENT_ID,
  clientId,
})

export const getQuotationClientIdSuccess = qClientDetails => ({
  type: GET_QUOTATION_CLIENT_ID_SUCCESS,
  payload: qClientDetails,
})
export const getQuotationClientIdFail = error => ({
  type: GET_QUOTATION_CLIENT_ID_FAIL,
  payload: error,
})

export const getOrderItems = (searchText, page) => ({
  type: GET_ORDERSITEMS,
  payload: { searchText, page },
})

export const getOrderItemsSuccess = orders => ({
  type: GET_ORDERSITEMS_SUCCESS,
  payload: orders,
})
export const getOrderItemsFail = error => ({
  type: GET_ORDERSITEMS_FAIL,
  payload: error,
})

export const getOrderItemsByFilted = (sort, searchText, page) => ({
  type: GET_ORDERSITEMS_BYFILTERED,
  payload: { sort, searchText, page },
})

export const getOrderItemsByFiltedSuccess = orders => ({
  type: GET_ORDERSITEMS_BYFILTERED_SUCCESS,
  payload: orders,
})
export const getOrderItemsByFiltedFail = error => ({
  type: GET_ORDERSITEMS_BYFILTERED_FAIL,
  payload: error,
})

export const getQProductPrice = prodId => ({
  type: GET_QPRODUCTPRICE,
  payload: { prodId },
})

export const getQProductPriceSuccess = qProdPrice => ({
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

export const getQuotationDetail = quotationId => ({
  type: GET_QUOTATION_DETAIL,
  quotationId,
})
export const getQuotationDetailSuccess = quotationDetail => ({
  type: GET_QUOTATION_DETAIL_SUCCESS,
  payload: quotationDetail,
})

export const getQuotationDetailFail = error => ({
  type: GET_QUOTATION_DETAIL_FAIL,
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

export const getOrders = (searchText, page, status) => ({
  type: GET_ORDERS,
  payload: { searchText, page, status },
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

export const getOrderRawmaterail = orderId => ({
  type: GET_ORDER_RAWMATERIAL,
  orderId,
})

export const getOrderRawmaterailSuccess = orderRawmaterail => ({
  type: GET_ORDER_RAWMATERIAL_SUCCESS,
  payload: orderRawmaterail,
})

export const getOrderRawmaterailFail = error => ({
  type: GET_ORDER_RAWMATERIAL_FAIL,
  payload: error,
})

export const getOrderItemDetail = orderItemId => ({
  type: GET_ORDERSITEMS_DETAIL,
  orderItemId,
})

export const getOrderItemDetailSuccess = orderItemDetail => ({
  type: GET_ORDERSITEMS_DETAIL_SUCCESS,
  payload: orderItemDetail,
})

export const getOrderItemDetailFail = error => ({
  type: GET_ORDERSITEMS_DETAIL_FAIL,
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
  payload: { orderId, history },
})

export const deleteOrderSuccess = order => ({
  type: DELETE_ORDER_SUCCESS,
  payload: order,
})

export const deleteOrderFail = error => ({
  type: DELETE_ORDER_FAIL,
  payload: error,
})
