import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import {
  GET_DASHBOARDDATA,
  GET_MONTHLY_CHART,
  GET_YEARLY_CHART,
  GET_STOCKREPORT
} from "./actionTypes"
import {
  getDashboardDataSuccess,
  getDashboardDataFail,
  getMonthlyChartSuccess,
  getMonthlyChartFail,
  getYearlyChartSuccess,
  getYearlyChartFail,
  getStockreportSuccess,
  getStockreportFail
} from "./actions"
import { get } from "helpers/api_methods"
import moment from "moment"

const getMonthlyChartAPi = ({ date }) => {
  return get(
    `/dashboard/yearly-products-graph/?date=${date ? date : moment(Date.now()).format("YYYY")
    }`
  )
}
const getYearlyChartAPi = ({ date }) => {
  return get(
    `/dashboard/yearly-revenue-graph/?date=${date ? date : moment(Date.now()).format("YYYY")
    }`
  )
}

function* fetchYearlyChart({ payload }) {
  try {
    const response = yield call(getYearlyChartAPi, payload)
    yield put(getYearlyChartSuccess(response))
  } catch (error) {
    yield put(getYearlyChartFail(error))
  }
}

function* fetchMonthlyChart({ payload }) {
  try {
    const response = yield call(getMonthlyChartAPi, payload)
    yield put(getMonthlyChartSuccess(response))
  } catch (error) {
    yield put(getMonthlyChartFail(error))
  }
}

const getDashboardDataAPi = () => {
  return get("/dashboard/dashboard-data/")
}

function* fetchDashboardData() {
  try {
    const response = yield call(getDashboardDataAPi)
    yield put(getDashboardDataSuccess(response))
  } catch (error) {
    yield put(getDashboardDataFail(error))
  }
}

const getStockreportAPi = () => {
  return get("/dashboard/stockreport/")
}

function* fetchStockreport() {
  try {
    const response = yield call(getStockreportAPi)
    yield put(getStockreportSuccess(response))
  } catch (error) {
    yield put(getStockreportFail(error))
  }
}


function* finishedProdChartSaga() {
  yield takeEvery(GET_DASHBOARDDATA, fetchDashboardData)
  yield takeEvery(GET_MONTHLY_CHART, fetchMonthlyChart)
  yield takeEvery(GET_YEARLY_CHART, fetchYearlyChart)
  yield takeEvery(GET_STOCKREPORT, fetchStockreport)
}

export default finishedProdChartSaga
