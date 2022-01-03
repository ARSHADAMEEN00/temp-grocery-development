import { combineReducers } from "redux"

// Front
import Layout from "./layout/reducer"

// Authentication
import Login from "./auth/login/reducer"

//contacts
import Contacts from "./profile/reducer"

//Dealer
import Dealers from "./dealers/reducer"

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

//general manager
import GeneralManager from "pages/GeneralManger"

const rootReducer = combineReducers({
  // public
  Layout,
  Login,
  Contacts,
  Dealers,
  Storemngrs,
  Supervisors,
  Qltcheckers,
  StoreItems,
  Products,
  Orders,
  Productionmngrs,
  Dashboard,
  GeneralManager,
})

export default rootReducer
