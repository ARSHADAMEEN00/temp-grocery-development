import { combineReducers } from "redux"

// Front
import Layout from "./layout/reducer"

// Authentication
import Login from "./auth/login/reducer"

//contacts
import Contacts from "./profile/reducer"

//store item
import StoreItems from "./store/reducer"

//product
import Products from "./product/reducer"

//orders
import Orders from "./orders/reducer"

const rootReducer = combineReducers({
  // public
  Layout,
  Login,
  Contacts,
  StoreItems,
  Products,
  Orders,
})

export default rootReducer
