import { all, fork } from "redux-saga/effects"

//public
import AuthSaga from "./auth/login/saga"
import LayoutSaga from "./layout/saga"
import contactsSaga from "./profile/saga"
import storeItemsSaga from "./store/saga"
import productsSaga from "./product/saga"
import ordersSaga from "./orders/saga"

export default function* rootSaga() {
  yield all([
    //public
    fork(AuthSaga),
    fork(LayoutSaga),
    fork(contactsSaga),
    fork(storeItemsSaga),
    fork(productsSaga),
    fork(ordersSaga),
  ])
}
