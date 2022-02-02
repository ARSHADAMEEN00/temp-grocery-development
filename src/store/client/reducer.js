import {
  GET_CLIENTS_SUCCESS,
  GET_CLIENTS_FAIL,
  GET_CLIENT_DETAIL_SUCCESS,
  GET_CLIENT_DETAIL_FAIL,
  CREATE_CLIENT_SUCCESS,
  CREATE_CLIENT_FAIL,
  UPDATE_CLIENT_SUCCESS,
  UPDATE_CLIENT_FAIL,
  DELETE_CLIENT_SUCCESS,
  DELETE_CLIENT_FAIL,
  GET_CLIENTS,
  GET_CLIENT_DETAIL,
  UPDATE_CLIENT,
  CREATE_CLIENT,
  DELETE_CLIENT,
} from "./actionTypes"

const INIT_STATE = {
  clients: [],
  clientDetail: {},
  error: {},
  loading: false,
  detailLoading: false,
  createdClient: {},
}

const Clients = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_CLIENTS:
    case UPDATE_CLIENT:
    case CREATE_CLIENT:
    case DELETE_CLIENT:
      return {
        ...state,
        loading: true,
      }
    case GET_CLIENT_DETAIL:
      return {
        ...state,
        loading: true,
        detailLoading: true,
      }
    case GET_CLIENTS_SUCCESS:
      return {
        ...state,
        clients: action.payload,
        loading: false,
      }

    case GET_CLIENTS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case CREATE_CLIENT_SUCCESS:
      return {
        ...state,
        clients: action.payload,
        createdClient: action.payload,
        loading: false,
      }

    case CREATE_CLIENT_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case GET_CLIENT_DETAIL_SUCCESS:
      return {
        ...state,
        clientDetail: action.payload,
        loading: false,
        detailLoading: false,
      }

    case GET_CLIENT_DETAIL_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        detailLoading: false,
      }

    case UPDATE_CLIENT_SUCCESS:
      return {
        ...state,
        clientDetail: action.payload,
        loading: false,
      }

    case UPDATE_CLIENT_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case DELETE_CLIENT_SUCCESS:
      return {
        ...state,
        clients: state.clients.filter(
          client => client.id.toString() !== action.payload.id.toString()
        ),
        loading: false,
      }

    case DELETE_CLIENT_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    default:
      return state
  }
}

export default Clients
