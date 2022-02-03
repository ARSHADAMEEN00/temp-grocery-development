import {
  GET_GEN_MANAGERS_SUCCESS,
  GET_GEN_MANAGERS_FAIL,
  GET_GEN_MANAGER_DETAIL_SUCCESS,
  GET_GEN_MANAGER_DETAIL_FAIL,
  CREATE_GEN_MANAGER_SUCCESS,
  CREATE_GEN_MANAGER_FAIL,
  UPDATE_GEN_MANAGER_SUCCESS,
  UPDATE_GEN_MANAGER_FAIL,
  DELETE_GEN_MANAGER_SUCCESS,
  DELETE_GEN_MANAGER_FAIL,
  GET_GEN_MANAGERS,
  GET_GEN_MANAGER_DETAIL,
  UPDATE_GEN_MANAGER,
  CREATE_GEN_MANAGER,
  DELETE_GEN_MANAGER,
} from "./actionTypes"

const INIT_STATE = {
  GeneralManagers: {
    count: "",
    next: "",
    previous: "",
    results: [],
  },
  GMDetail: {
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
}

const GeneralManagers = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_GEN_MANAGERS:
    case UPDATE_GEN_MANAGER:
    case CREATE_GEN_MANAGER:
    case DELETE_GEN_MANAGER:
      return {
        ...state,
        loading: true,
      }
    case GET_GEN_MANAGER_DETAIL:
      return {
        ...state,
        loading: true,
        detailLoading: true,
      }
    case GET_GEN_MANAGERS_SUCCESS:
      return {
        ...state,
        GeneralManagers: action.payload,
        loading: false,
      }

    case GET_GEN_MANAGERS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case CREATE_GEN_MANAGER_SUCCESS:
      return {
        ...state,
        GeneralManagers: action.payload,
        loading: false,
      }

    case CREATE_GEN_MANAGER_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case GET_GEN_MANAGER_DETAIL_SUCCESS:
      return {
        ...state,
        GMDetail: action.payload,
        loading: false,
        detailLoading: false,
      }

    case GET_GEN_MANAGER_DETAIL_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        detailLoading: false,
      }

    case UPDATE_GEN_MANAGER_SUCCESS:
      return {
        ...state,
        GMDetail: action.payload,
        loading: false,
        error: {},
      }

    case UPDATE_GEN_MANAGER_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case DELETE_GEN_MANAGER_SUCCESS:
      return {
        ...state,
        GeneralManagers: state.GeneralManagers.results.filter(
          gm => gm.id !== action.payload.id
        ),
        loading: false,
      }

    case DELETE_GEN_MANAGER_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    default:
      return state
  }
}

export default GeneralManagers
