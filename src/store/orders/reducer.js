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
  GET_QUOTATIONS,
  GET_QUOTATIONS_FAIL,
  GET_QUOTATIONS_SUCCESS,
  UPDATE_ORDER,
  UPDATE_ORDER_FAIL,
  UPDATE_ORDER_ITEM,
  UPDATE_ORDER_ITEM_FAIL,
  UPDATE_ORDER_ITEM_SUCCESS,
  UPDATE_ORDER_SUCCESS,
  CREATE_QUOTATION,
  CREATE_QUOTATION_SUCCESS,
  CREATE_QUOTATION_FAIL,
  GET_QPRODUCTPRICE,
  GET_QPRODUCTPRICE_SUCCESS,
  GET_QPRODUCTPRICE_FAIL
} from "./actionTypes"

const INIT_STATE = {
  orders: [],
  orderDetail: {
    id: "",
    auto_id: "",
    dealer_name: "",
    start_date: "",
    end_date: "",
    total_amount: "",
    status: "",
    orderitem: [],
  },
  quotation: [],
  quotationCurd: {},
  QProductPrice: {},
  error: {},
  loading: false,
  orderitemLoading: false,
  createOrdererror: null,
  quotationLoading: false,
  QProductPriceLoading: false
}

const Orders = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_ORDERS:
    case GET_ORDER_DETAIL:
    case UPDATE_ORDER:
    case CREATE_ORDER:
    case DELETE_ORDER:
      return {
        ...state,
        loading: true,
      }
    case UPDATE_ORDER_ITEM:
      return {
        ...state,
        orderitemLoading: true,
      }
    case GET_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.payload,
        loading: false,
      }

    case GET_ORDERS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case CREATE_ORDER_SUCCESS:
      return {
        ...state,
        orders: action.payload,
        createOrdererror: null,
        loading: false,
      }

    case CREATE_ORDER_FAIL:
      return {
        ...state,
        createOrdererror: action.payload,
        loading: false,
      }

    case GET_ORDER_DETAIL_SUCCESS:
      return {
        ...state,
        orderDetail: action.payload,
        loading: false,
      }

    case GET_ORDER_DETAIL_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case UPDATE_ORDER_SUCCESS:
      return {
        ...state,
        orderDetail: {
          ...state.orderDetail,
          status: action.payload.status,
          start_date: action.payload.start_date,
        },
        error: {},
        loading: false,
      }

    case UPDATE_ORDER_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case DELETE_ORDER_SUCCESS:
      return {
        ...state,
        orders: state.orders.filter(
          order => order.id.toString() !== action.payload.id.toString()
        ),
        loading: false,
      }

    case DELETE_ORDER_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case UPDATE_ORDER_ITEM_SUCCESS:
      return {
        ...state,
        orderDetail: {
          ...state.orderDetail,
          orderitem: state.orderDetail.orderitem.map(order =>
            order.id === action.payload.id
              ? { ...order, ...action.payload }
              : order
          ),
        },
        orderitemLoading: false,
      }

    case UPDATE_ORDER_ITEM_FAIL:
      return {
        ...state,
        error: action.payload,
        orderitemLoading: false,
      }
    case GET_QUOTATIONS:
    case CREATE_QUOTATION:
      return {
        ...state,
        quotationLoading: true
      }
    case GET_QUOTATIONS_SUCCESS:
      return {
        ...state,
        quotation: action.payload,
        quotationLoading: false
      }
    case GET_QUOTATIONS_FAIL:
      return {
        ...state,
        error: action.payload,
        quotationLoading: false
      }
    case CREATE_QUOTATION_SUCCESS:
      return {
        ...state,
        quotation: action.payload,
        quotationCurd: action.payload,
        quotationLoading: false,
        QProductPrice: {}
      }

    case CREATE_QUOTATION_FAIL:
      return {
        ...state,
        error: action.payload,
        quotationLoading: false,
      }
    case GET_QPRODUCTPRICE:
      return {
        ...state,
        QProductPriceLoading: true
      }
    case GET_QPRODUCTPRICE_SUCCESS:
      return {
        ...state,
        QProductPrice: action.payload,
        QProductPriceLoading: false
      }
    case GET_QPRODUCTPRICE_FAIL:
      return {
        ...state,
        error: action.payload,
        QProductPriceLoading: false

      }

    default:
      return state
  }
}

export default Orders
