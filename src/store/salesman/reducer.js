import {
  GET_SALESMANS_SUCCESS,
  GET_SALESMANS_FAIL,
  GET_SALESMAN_DETAIL_SUCCESS,
  GET_SALESMAN_DETAIL_FAIL,
  CREATE_SALESMAN_SUCCESS,
  CREATE_SALESMAN_FAIL,
  UPDATE_SALESMAN_SUCCESS,
  UPDATE_SALESMAN_FAIL,
  DELETE_SALESMAN_SUCCESS,
  DELETE_SALESMAN_FAIL,
  GET_SALESMANS,
  GET_SALESMAN_DETAIL,
  UPDATE_SALESMAN,
  CREATE_SALESMAN,
  DELETE_SALESMAN,
} from "./actionTypes"

const INIT_STATE = {
  salesmans: [],
  salesmanDetail: {
    location: "",
    profit: "",
    account: {
      email: "",
      username: "",
      phone: "",
      first_name: "",
      last_name: "",
    },
    id: "",
  },
  error: {},
  loading: false,
  detailLoading: false,
  // createsalesmanerror: "",
}

const Salesmans = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_SALESMANS:
    case UPDATE_SALESMAN:
    case CREATE_SALESMAN:
    case DELETE_SALESMAN:
      return {
        ...state,
        loading: true,
      }
    case GET_SALESMAN_DETAIL:
      return {
        ...state,
        loading: true,
        detailLoading: true,
      }
    case GET_SALESMANS_SUCCESS:
      return {
        ...state,
        salesmans: action.payload,
        loading: false,
      }

    case GET_SALESMANS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case CREATE_SALESMAN_SUCCESS:
      return {
        ...state,
        salesmans: action.payload,
        loading: false,
      }

    case CREATE_SALESMAN_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case GET_SALESMAN_DETAIL_SUCCESS:
      return {
        ...state,
        salesmanDetail: action.payload,
        loading: false,
        detailLoading: false,
      }

    case GET_SALESMAN_DETAIL_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        detailLoading: false,
      }

    case UPDATE_SALESMAN_SUCCESS:
      return {
        ...state,
        error: {},
        salesmanDetail: action.payload,
        loading: false,
      }

    case UPDATE_SALESMAN_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case DELETE_SALESMAN_SUCCESS:
      return {
        ...state,
        salesmans: state.salesmans.filter(
          salesman => salesman.id.toString() !== action.payload.id.toString()
        ),
        loading: false,
      }

    case DELETE_SALESMAN_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    default:
      return state
  }
}

export default Salesmans
