import {
  GET_WORKSTAGES_SUCCESS,
  GET_WORKSTAGES_FAIL,
  GET_WORKSTAGE_DETAIL_SUCCESS,
  GET_WORKSTAGE_DETAIL_FAIL,
  CREATE_WORKSTAGE_SUCCESS,
  CREATE_WORKSTAGE_FAIL,
  UPDATE_WORKSTAGE_SUCCESS,
  UPDATE_WORKSTAGE_FAIL,
  DELETE_WORKSTAGE_SUCCESS,
  DELETE_WORKSTAGE_FAIL,
  GET_WORKSTAGES,
  GET_WORKSTAGE_DETAIL,
  UPDATE_WORKSTAGE,
  CREATE_WORKSTAGE,
  DELETE_WORKSTAGE,
} from "./actionTypes"

const INIT_STATE = {
  workStages: {
    count: "",
    next: "",
    previous: "",
    results: [],
  },
  workStageDetail: {
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
  // createworkStageerror: "",
}

const WorkStages = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_WORKSTAGES:
    case UPDATE_WORKSTAGE:
    case CREATE_WORKSTAGE:
    case DELETE_WORKSTAGE:
      return {
        ...state,
        loading: true,
      }
    case GET_WORKSTAGE_DETAIL:
      return {
        ...state,
        loading: true,
        detailLoading: true,
      }
    case GET_WORKSTAGES_SUCCESS:
      return {
        ...state,
        workStages: action.payload,
        loading: false,
      }

    case GET_WORKSTAGES_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case CREATE_WORKSTAGE_SUCCESS:
      return {
        ...state,
        workStages: action.payload,
        loading: false,
      }

    case CREATE_WORKSTAGE_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case GET_WORKSTAGE_DETAIL_SUCCESS:
      return {
        ...state,
        workStageDetail: action.payload,
        loading: false,
        detailLoading: false,
      }

    case GET_WORKSTAGE_DETAIL_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        detailLoading: false,
      }

    case UPDATE_WORKSTAGE_SUCCESS:
      console.log(state.workStages)
      console.log(state.workStages.results)
      console.log(action.payload)
      console.log(action.payload.id)
      return {
        ...state,
        workStages: {
          ...state.workStages,
          results: state.workStages.results.map(workStage =>
            workStage.id === action.payload.id
              ? { workStage, ...action.payload }
              : workStage
          ),
        },
        workStageDetail: action.payload,
        loading: false,
      }

    case UPDATE_WORKSTAGE_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case DELETE_WORKSTAGE_SUCCESS:
      return {
        ...state,
        workStages: state.workStages.filter(
          workStage => workStage.id.toString() !== action.payload.id.toString()
        ),
        loading: false,
      }

    case DELETE_WORKSTAGE_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    default:
      return state
  }
}

export default WorkStages
