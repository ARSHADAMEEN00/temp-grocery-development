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
  GET_QPRODUCTPRICE_FAIL,
  GET_QUOTATION_DETAIL_SUCCESS,
  GET_QUOTATION_DETAIL_FAIL,
  GET_QUOTATION_DETAIL,
  GET_ORDERSITEMS,
  GET_ORDERSITEMS_SUCCESS,
  GET_ORDERSITEMS_FAIL,
  GET_ORDERSITEMS_DETAIL_SUCCESS,
  GET_ORDERSITEMS_DETAIL_FAIL,
  GET_ORDERSITEMS_DETAIL,
  GET_QUOTATION_CLIENT_ID,
  GET_QUOTATION_CLIENT_ID_SUCCESS,
  GET_QUOTATION_CLIENT_ID_FAIL,
  GET_ORDERSITEMS_BYFILTERED,
  GET_ORDERSITEMS_BYFILTERED_SUCCESS,
  GET_ORDERSITEMS_BYFILTERED_FAIL,
  GET_ORDER_RAWMATERIAL,
  GET_ORDER_RAWMATERIAL_SUCCESS,
  GET_ORDER_RAWMATERIAL_FAIL,
  GET_BANKDETAILS,
  GET_BANKDETAILS_SUCCESS,
  GET_BANKDETAILS_FAIL,
} from "./actionTypes"

const INIT_STATE = {
  orders: [],
  orderItems: [],
  orderItemFiltered: [],
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
  orderRawmaterials: [],
  bankDetails: [],
  QclientDetails: {},
  orderItemDetail: {},
  quotation: [],
  quotationCurd: {},
  QProductPrice: {},
  quotationDetails: {},
  AllQProducts: [],
  error: {},
  loading: false,
  orderitemLoading: false,
  createOrdererror: null,
  quotationLoading: false,
  quotationDetailLoading: false,
  QProductPriceLoading: false,
  QclientDetailsLoding: false,
  bankDetailLoading: false
}

const Orders = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_ORDERS:
    case GET_ORDER_DETAIL:
    case UPDATE_ORDER:
    case CREATE_ORDER:
    case DELETE_ORDER:
    case GET_ORDERSITEMS:
    case GET_ORDERSITEMS_BYFILTERED:
    case GET_ORDER_RAWMATERIAL:
      return {
        ...state,
        loading: true,
      }
    case GET_BANKDETAILS:
      return {
        ...state,
        bankDetailLoading: true
      }
    case GET_BANKDETAILS_SUCCESS:
      return {
        ...state,
        bankDetails: action.payload,
        bankDetailLoading: false,
      }
    case GET_BANKDETAILS_FAIL:
      return {
        ...state,
        bankDetails: action.payload,
        bankDetailLoading: false,
      }
    case GET_QUOTATION_CLIENT_ID:
      return {
        ...state,
        QclientDetailsLoding: true,
      }
    case GET_QUOTATION_CLIENT_ID_SUCCESS:
      return {
        ...state,
        QclientDetails: action.payload,
        QclientDetailsLoding: false,
      }
    case GET_QUOTATION_CLIENT_ID_FAIL:
      return {
        ...state,
        error: action.payload,
        QclientDetailsLoding: false,
      }

    case UPDATE_ORDER_ITEM:
    case GET_ORDERSITEMS_DETAIL:
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

    case GET_ORDERSITEMS_SUCCESS:
      return {
        ...state,
        orderItems: action.payload,
        loading: false,
      }

    case GET_ORDERSITEMS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case GET_ORDERSITEMS_BYFILTERED_SUCCESS:
      return {
        ...state,
        orderItemFiltered: action.payload,
        loading: false,
      }

    case GET_ORDERSITEMS_BYFILTERED_FAIL:
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

    case GET_ORDER_RAWMATERIAL_SUCCESS:
      return {
        ...state,
        orderRawmaterials: action.payload,
        loading: false,
      }

    case GET_ORDER_RAWMATERIAL_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case GET_ORDERSITEMS_DETAIL_SUCCESS:
      return {
        ...state,
        orderItemDetail: action.payload,
        orderitemLoading: false,
      }

    case GET_ORDERSITEMS_DETAIL_FAIL:
      return {
        ...state,
        error: action.payload,
        orderitemLoading: false,
      }

    case UPDATE_ORDER_SUCCESS:
      return {
        ...state,
        orderDetail: {
          ...state.orderDetail,
          status: action.payload.response,
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
        // orders: state.orders.filter(
        //   order => order.id.toString() !== action.payload.id.toString()
        // ),
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
        quotationLoading: true,
      }
    case GET_QUOTATION_DETAIL:
      return {
        ...state,
        quotationDetailLoading: true,
      }
    case GET_QUOTATIONS_SUCCESS:
      return {
        ...state,
        quotation: action.payload,
        quotationLoading: false,
      }
    case GET_QUOTATIONS_FAIL:
      return {
        ...state,
        error: action.payload,
        quotationLoading: false,
      }

    case GET_QUOTATION_DETAIL_SUCCESS:
      return {
        ...state,
        quotationDetails: action.payload,
        quotationDetailLoading: false,
      }

    case GET_QUOTATION_DETAIL_FAIL:
      return {
        ...state,
        error: action.payload,
        quotationDetailLoading: false,
      }

    case CREATE_QUOTATION_SUCCESS:
      return {
        ...state,
        quotation: action.payload,
        quotationCurd: action.payload,
        quotationLoading: false,
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
        QProductPriceLoading: true,
      }
    case GET_QPRODUCTPRICE_SUCCESS:
      return {
        ...state,
        QProductPrice: action.payload,
        AllQProducts: [...state.AllQProducts, action.payload],
        QProductPriceLoading: false,
      }
    case GET_QPRODUCTPRICE_FAIL:
      return {
        ...state,
        error: action.payload,
        QProductPriceLoading: false,
      }

    default:
      return state
  }
}

export default Orders
