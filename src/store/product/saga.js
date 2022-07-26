import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import {
  GET_PRODUCTS,
  GET_PRODUCT_DETAIL,
  UPDATE_PRODUCT,
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  // other cost
  CREATE_OTHERCOST,
  DELETE_OTHERCOST,
  //rawmaterils
  GET_RAWMATERIALS,
  CREATE_RAWMATERIAL,
  DELETE_RAWMATERIAL,
  //finished product
  GET_FINISHEDPRODUCT,
  CREATE_FINISHEDPRODUCT,
  FINISHEDDETAILS,
  GET_PRODUCTDETAILS,
  CREATE_PRODUCTDETAIL_SUCCESS,
  CREATE_PRODUCTDETAIL,
  DELETE_PRODUCTDETAIL,
} from "./actionTypes"
import {
  getProductsSuccess,
  getProductsFail,
  getProductDetailSuccess,
  getProductDetailFail,
  createProductSuccess,
  createProductFail,
  updateProductSuccess,
  updateProductFail,
  deleteProductSuccess,
  deleteProductFail,
  // other cost
  createOtherCostSuccess,
  createOtherCostFail,
  deleteOtherCostSuccess,
  deleteOtherCostFail,
  //rawmaterils
  getRawmaterialsSuccess,
  getRawmaterialsFail,
  createRawmaterialSuccess,
  createRawmaterialFail,
  deleteRawmaterialSuccess,
  deleteRawmaterialFail,
  //finished prodcut
  getFinishedProductSuccess,
  getFinishedProductFail,
  createFinishedProductFail,
  createFinishedProductSuccess,
  finishedDetailsSuccess,
  finishedDetailsFail,
  getCurdProductDetailsSuccess,
  getCurdProductDetailsFail,
  createCurdProductDetailSuccess,
  createCurdProductDetailFail,
  deleteCurdProductDetailSuccess,
  deleteCurdProductDetailFail,
  //product detaails
} from "./actions"
import { get, post, ApiPut, del, patch } from "helpers/api_methods"
import { Notification } from "components/Common/Notification"

//products
function getProductsAPi({ searchText, page }) {
  if (searchText) {
    return get(`/store/product/?search=${searchText && searchText}`)
  } else {
    return get(`/store/product/?page=${page ? page : 1}`)
  }
}
const getProductDetailsAPi = productId => {
  return get(`/store/product/${productId}/`)
}
const createProductApi = product => {
  // return post("/store/product/", product)
}
const updateProductApi = ({ productId, product }) => {
  return ApiPut(`/store/product/${productId}/`, product)
}
const deleteProductApi = ({ productId }) => {
  return del(`/store/product/${productId}/`)
}

// other cost
const createOtherCostApi = otherCost => {
  return post("store/othercost/", otherCost)
}

const deleteOtherCostApi = otherCostId => {
  return del(`store/othercost/${otherCostId}/`)
}

//rawmateril
function getRawmaterialsAPi() {
  return get("/store/rawmaterial/")
}
const createRawmaterialApi = rawmaterial => {
  return post("/store/rawmaterial/", rawmaterial)
}

const deleteRawmaterialApi = rawmaterialId => {
  return del(`/store/rawmaterial/${rawmaterialId}/`)
}

//product details
function getCurdProductDetailsAPi() {
  return get("/store/productdetail/")
}
const createCurdProductDetailApi = CurdProductDetail => {
  return post("/store/productdetail/", CurdProductDetail)
}

const deleteCurdProductDetailApi = ({ payload }) => {
  return del(`/store/productdetail/${payload}/`)
}

//finished product
function getFinishedProductAPi({ searchText, page }) {
  if (searchText) {
    return get(
      `/supervisor/finishedproducts/?search=${searchText && searchText}`
    )
  } else {
    return get(`/supervisor/finishedproducts/?page=${page ? page : 1}`)
  }
}
const createFinishedProductApi = fproduct => {
  return post("/supervisor/finishedproducts/", fproduct)
}

const getFinishedProductDeatilAPi = id => {
  return post("/supervisor/finished-product-id/", { id: id })
}
//finishedDEatails
function* fetchFinishedProductDeatil({ payload }) {
  try {
    const response = yield call(getFinishedProductDeatilAPi, payload)
    yield put(finishedDetailsSuccess(response))
  } catch (error) {
    yield put(finishedDetailsFail(error))
  }
}

//products
function* fetchProducts({ payload }) {
  try {
    const response = yield call(getProductsAPi, payload)
    yield put(getProductsSuccess(response))
  } catch (error) {
    yield put(getProductsFail(error))
  }
}

function* fetchProductDetail({ productId }) {
  try {
    const response = yield call(getProductDetailsAPi, productId)
    yield put(getProductDetailSuccess(response))
  } catch (error) {
    yield put(getProductDetailFail(error))
  }
}
function* onCreateProduct({ payload: product }) {
  try {
    const response = yield call(createProductApi, product)
    if (response?.error_message) {
      yield put(createProductFail(response?.error_message))
    } else {
      yield put(createProductSuccess(response))
      yield put(getProductDetailSuccess(response))
    }
  } catch (error) {
    // yield put(createProductFail(error))
  }
}

function* onUpdateProduct({ payload }) {
  try {
    const response = yield call(updateProductApi, payload)
    yield put(updateProductSuccess(response))
  } catch (error) {
    yield put(updateProductFail(error))
  }
}

function* onDeleteProduct({ payload }) {
  try {
    const response = yield call(deleteProductApi, payload)
    yield put(deleteProductSuccess({ ...response, id: payload.productId }))
    doneNotification()
    payload.history.push("/products")
  } catch (error) {
    yield put(deleteProductFail(error))
    errorNotification()
  }
}

// other cost
function* onCreateOtherCost({ payload: otherCost }) {
  try {
    const response = yield call(createOtherCostApi, otherCost)
    if (response?.error_message) {
      yield put(createOtherCostFail(response?.error_message))
    } else {
      yield put(createOtherCostSuccess(response))
      doneNotification()
    }
  } catch (error) {
    yield put(createOtherCostFail(error))
    errorNotification()
  }
}

function* onDeleteOtherCost({ payload }) {
  try {
    const response = yield call(deleteOtherCostApi, payload)
    yield put(deleteOtherCostSuccess({ ...response, id: payload }))
    doneNotification()
  } catch (error) {
    yield put(deleteOtherCostFail(error))
    errorNotification()
  }
}

//rawmateril
function* fetchRawmaterials() {
  try {
    const response = yield call(getRawmaterialsAPi)
    yield put(getRawmaterialsSuccess(response))
  } catch (error) {
    yield put(getRawmaterialsFail(error))
  }
}

function* onCreateRawmaterial({ payload: rawmaterial }) {
  try {
    const response = yield call(createRawmaterialApi, rawmaterial)
    if (response?.error_message) {
      yield put(createRawmaterialFail(response?.error_message))
    } else {
      yield put(createRawmaterialSuccess(response))
      doneNotification()
    }
  } catch (error) {
    yield put(createRawmaterialFail(error))
    errorNotification()
  }
}

function* onDeleteRawmaterial({ rawmaterialId }) {
  try {
    const response = yield call(deleteRawmaterialApi, rawmaterialId)
    yield put(deleteRawmaterialSuccess({ ...response, id: rawmaterialId }))
    doneNotification()
  } catch (error) {
    errorNotification()
    yield put(deleteRawmaterialFail(error))
  }
}

//product deatils
function* fetchCurdProductDetails() {
  try {
    const response = yield call(getCurdProductDetailsAPi)
    yield put(getCurdProductDetailsSuccess(response))
  } catch (error) {
    yield put(getCurdProductDetailsFail(error))
  }
}

function* onCreateCurdProductDetails({ payload: productDetal }) {
  try {
    const response = yield call(createCurdProductDetailApi, productDetal)
    yield put(createCurdProductDetailSuccess(response))
    doneNotification()
  } catch (error) {
    errorNotification()
    yield put(createCurdProductDetailFail(error))
  }
}

function* onDeleteCurdProductDetails(payload) {
  try {
    const response = yield call(deleteCurdProductDetailApi, payload)
    yield put(
      deleteCurdProductDetailSuccess({ ...response, id: payload.payload })
    )
    doneNotification()
  } catch (error) {
    errorNotification()
    yield put(deleteCurdProductDetailFail(error))
  }
}

//finished product
function* fetchFinishedProduct({ payload }) {
  try {
    const response = yield call(getFinishedProductAPi, payload)
    yield put(getFinishedProductSuccess(response))
  } catch (error) {
    yield put(getFinishedProductFail(error))
  }
}
function* onCreateFinishedProduct({ payload: product }) {
  try {
    const response = yield call(createFinishedProductApi, product)
    if (response?.error_message) {
      yield put(createFinishedProductFail(response?.error_message))
    } else {
      yield put(createFinishedProductFail(""))
      yield put(createFinishedProductSuccess(response))
      doneNotification()
    }
  } catch (error) {
    yield put(createProductFail(error))
    errorNotification()
  }
}

function errorNotification() {
  Notification({
    type: "error",
    message: "Something Went Wrong",
    title: "Try Again",
  })
}

function doneNotification() {
  Notification({
    type: "success",
    message: "Done",
    title: "",
  })
}

function* productsSaga() {
  yield takeEvery(GET_PRODUCTS, fetchProducts)
  yield takeEvery(GET_PRODUCT_DETAIL, fetchProductDetail)
  yield takeEvery(CREATE_PRODUCT, onCreateProduct)
  yield takeEvery(UPDATE_PRODUCT, onUpdateProduct)
  yield takeEvery(DELETE_PRODUCT, onDeleteProduct)
  // other cost
  yield takeEvery(CREATE_OTHERCOST, onCreateOtherCost)
  yield takeEvery(DELETE_OTHERCOST, onDeleteOtherCost)
  //rawmateril
  yield takeEvery(GET_RAWMATERIALS, fetchRawmaterials)
  yield takeEvery(CREATE_RAWMATERIAL, onCreateRawmaterial)
  yield takeEvery(DELETE_RAWMATERIAL, onDeleteRawmaterial)
  //product deatils
  yield takeEvery(GET_PRODUCTDETAILS, fetchCurdProductDetails)
  yield takeEvery(CREATE_PRODUCTDETAIL, onCreateCurdProductDetails)
  yield takeEvery(DELETE_PRODUCTDETAIL, onDeleteCurdProductDetails)
  //finshed product
  yield takeEvery(GET_FINISHEDPRODUCT, fetchFinishedProduct)
  yield takeEvery(CREATE_FINISHEDPRODUCT, onCreateFinishedProduct)
  yield takeEvery(FINISHEDDETAILS, fetchFinishedProductDeatil)
}

export default productsSaga
