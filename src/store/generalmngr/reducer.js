import {
  GET_GENERALMNGRS_SUCCESS,
  GET_GENERALMNGRS_FAIL,
  GET_GENERALMNGR_DETAIL_SUCCESS,
  GET_GENERALMNGR_DETAIL_FAIL,
  CREATE_GENERALMNGR_SUCCESS,
  CREATE_GENERALMNGR_FAIL,
  UPDATE_GENERALMNGR_SUCCESS,
  UPDATE_GENERALMNGR_FAIL,
  DELETE_GENERALMNGR_SUCCESS,
  DELETE_GENERALMNGR_FAIL,
  GET_GENERALMNGRS,
  GET_GENERALMNGR_DETAIL,
  UPDATE_GENERALMNGR,
  CREATE_GENERALMNGR,
  DELETE_GENERALMNGR,
} from "./actionTypes"

const INIT_STATE = {
  generalmngrs: [],
  generalmngrDetail: {
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
  // creategeneralmngrerror: "",
}

const Generalmngrs = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_GENERALMNGRS:
    case UPDATE_GENERALMNGR:
    case CREATE_GENERALMNGR:
    case DELETE_GENERALMNGR:
      return {
        ...state,
        loading: true,
      }
    case GET_GENERALMNGR_DETAIL:
      return {
        ...state,
        loading: true,
        detailLoading: true,
      }
    case GET_GENERALMNGRS_SUCCESS:
      return {
        ...state,
        generalmngrs: action.payload,
        loading: false,
      }

    case GET_GENERALMNGRS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case CREATE_GENERALMNGR_SUCCESS:
      return {
        ...state,
        generalmngrs: action.payload,
        loading: false,
      }

    case CREATE_GENERALMNGR_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case GET_GENERALMNGR_DETAIL_SUCCESS:
      return {
        ...state,
        generalmngrDetail: action.payload,
        loading: false,
        detailLoading: false,
      }

    case GET_GENERALMNGR_DETAIL_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        detailLoading: false,
      }

    case UPDATE_GENERALMNGR_SUCCESS:
      return {
        ...state,
        generalmngrs: state.generalmngrs.map(generalmngr =>
          generalmngr.id.toString() === action.payload.id.toString()
            ? { generalmngr, ...action.payload }
            : generalmngr
        ),
        loading: false,
      }

    case UPDATE_GENERALMNGR_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case DELETE_GENERALMNGR_SUCCESS:
      return {
        ...state,
        generalmngrs: state.generalmngrs.filter(
          generalmngr =>
            generalmngr.id.toString() !== action.payload.id.toString()
        ),
        loading: false,
      }

    case DELETE_GENERALMNGR_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    default:
      return state
  }
}

export default Generalmngrs
