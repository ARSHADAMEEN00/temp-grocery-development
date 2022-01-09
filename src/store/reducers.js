import { combineReducers } from "redux"

// Front
import Layout from "./layout/reducer"

// Authentication
import Login from "./auth/login/reducer"

//contacts
import Contacts from "./profile/reducer"

//General manager
import GeneralMngr from "./generalmngr/reducer"

//supervisor
import Supervisors from "./supervisor/reducer"

//store item
import StoreItems from "./storeItem/reducer"

//product
import Products from "./product/reducer"

//orders
import Orders from "./orders/reducer"

//storemngr
import Storemngrs from "./storemanager/reducer"

//qualitychecker
import Qltcheckers from "./qltchecker/reducer"

//prodcution manager
import Productionmngrs from "./productionmngr/reducer"

//finished Prod Chart
import Dashboard from "./Dashboard/reducer"

//client
import Clients from "./client/reducer"

//salesman
import Salesmans from "./salesman/reducer"

const rootReducer = combineReducers({
  // public
  Layout,
  Login,
  Contacts,
  GeneralMngr,
  Storemngrs,
  Supervisors,
  Qltcheckers,
  Salesmans,
  Clients,
  StoreItems,
  Products,
  Orders,
  Productionmngrs,
  Dashboard,
})

export default rootReducer
