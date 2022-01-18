import { all, fork } from "redux-saga/effects"

//public
import AuthSaga from "./auth/login/saga"
import LayoutSaga from "./layout/saga"
import contactsSaga from "./profile/saga"
import supervisorsSaga from "./supervisor/saga"
import storeItemsSaga from "./storeItem/saga"
import productsSaga from "./product/saga"
import ordersSaga from "./orders/saga"
import storemngrsSaga from "./storemanager/saga"
import qltcheckersSaga from "./qltchecker/saga"
import productionmngrsSaga from "./productionmngr/saga"
import finishedProdChartSaga from "./Dashboard/saga"
import generalmngrSaga from "./generalmngr/saga"
import ClientsSaga from "./client/saga"
import salesmansSaga from "./salesman/saga"
import workStagesSaga from "./workStages/saga"

export default function* rootSaga() {
  yield all([
    //public
    fork(AuthSaga),
    fork(LayoutSaga),
    fork(contactsSaga),
    fork(generalmngrSaga),
    fork(supervisorsSaga),
    fork(storeItemsSaga),
    fork(ClientsSaga),
    fork(productsSaga),
    fork(ordersSaga),
    fork(storemngrsSaga),
    fork(qltcheckersSaga),
    fork(salesmansSaga),
    fork(productionmngrsSaga),
    fork(finishedProdChartSaga),
    fork(workStagesSaga)
  ])
}
