import {
  GET_STOREMNGRS_SUCCESS,
  GET_STOREMNGRS_FAIL,
  GET_STOREMNGR_DETAIL_SUCCESS,
  GET_STOREMNGR_DETAIL_FAIL,
  CREATE_STOREMNGR_SUCCESS,
  CREATE_STOREMNGR_FAIL,
  UPDATE_STOREMNGR_SUCCESS,
  UPDATE_STOREMNGR_FAIL,
  DELETE_STOREMNGR_SUCCESS,
  DELETE_STOREMNGR_FAIL,
  GET_STOREMNGRS,
  GET_STOREMNGR_DETAIL,
  UPDATE_STOREMNGR,
  CREATE_STOREMNGR,
  DELETE_STOREMNGR,
} from "./actionTypes"

const INIT_STATE = {
  storemngrs: {
    count: "",
    next: "",
    previous: "",
    results: [],
  },
  storemngrDetail: {
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
  // createstoremngrerror: "",
}

const Storemngrs = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_STOREMNGRS:
    case UPDATE_STOREMNGR:
    case CREATE_STOREMNGR:
    case DELETE_STOREMNGR:
      return {
        ...state,
        loading: true,
      }
    case GET_STOREMNGR_DETAIL:
      return {
        ...state,
        loading: true,
        detailLoading: true,
      }
    case GET_STOREMNGRS_SUCCESS:
      return {
        ...state,
        storemngrs: action.payload,
        loading: false,
      }

    case GET_STOREMNGRS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case CREATE_STOREMNGR_SUCCESS:
      return {
        ...state,
        storemngrs: action.payload,
        loading: false,
        error: {},
      }

    case CREATE_STOREMNGR_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case GET_STOREMNGR_DETAIL_SUCCESS:
      return {
        ...state,
        storemngrDetail: action.payload,
        loading: false,
        detailLoading: false,
      }

    case GET_STOREMNGR_DETAIL_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        detailLoading: false,
      }

    case UPDATE_STOREMNGR_SUCCESS:
      return {
        ...state,
        storemngrDetail: action.payload,
        loading: false,
        error: {},
      }

    case UPDATE_STOREMNGR_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case DELETE_STOREMNGR_SUCCESS:
      return {
        ...state,
        storemngrs: state.storemngrs.results.filter(
          storemngr => storemngr.id !== action.payload.id
        ),
        loading: false,
      }

    case DELETE_STOREMNGR_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    default:
      return state
  }
}

export default Storemngrs
