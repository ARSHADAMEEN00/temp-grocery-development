import React from "react"
import { Redirect } from "react-router-dom"

// Profile
import UserProfile from "../pages/Authentication/user-profile"

// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"

//pages
import Dealers from "../pages/Dealers"
import DealerDetails from "../pages/Dealers/SingleView"
import CreateDealer from "../pages/Dealers/Crud/Create"
import UpdateDealer from "../pages/Dealers/Crud/Update"

import Supervisors from "../pages/Supervisor"
import SupervisorDetails from "../pages/Supervisor/SingleView"
import CreateSupervisor from "pages/Supervisor/Crud/Create"
import UpdateSupervisor from "pages/Supervisor/Crud/Update"
import DailyWork from "pages/Supervisor/DailyWork"

import StoreManager from "pages/Storemngr"
import StoreManagerDetails from "pages/Storemngr/SingleView"
import CreateStoreManager from "pages/Storemngr/Crud/Create"

import QualityChecker from "pages/Qualitychecker"
import QltCheckerDetails from "pages/Qualitychecker/SingleView"
import CreateQltChecker from "pages/Qualitychecker/Crud/Create"

import Product from "pages/Product"
import ProductDetails from "pages/Product/SingleView"
import UpdateProduct from "pages/Product/Crud/Update/Update"
import CreateProduct from "pages/Product/Crud/Create/Create"

import Orders from "pages/Orders"
import OrderDetails from "pages/Orders/SingleView"
import CreateOrder from "pages/Orders/Crud/Create/Create"

import Store from "pages/Store"
import CreateStore from "pages/Store/Crud/Create"
import UpdateStore from "pages/Store/Crud/Update"

import FinishedProduct from "pages/Orders/FinishedProduct"

// Dashboard
import Dashboard from "../pages/Dashboard/index"
import Pages500 from "pages/404/pages-500"
import Pages404 from "pages/404/pages-404"
import ProductionManager from "pages/ProductionMngr"
import ProductionManagerDetails from "pages/ProductionMngr/SingleView"
import CreateProductionManager from "pages/ProductionMngr/Crud/Create"
import StoreSupply from "pages/Store/StoreSupply"
import ForgetPwd from "pages/Authentication/ForgetPwd"
import Tickets from "components/Pdf/report"
import GeneralManager from "pages/GeneralManger"
import GeneralManagerDetails from "pages/GeneralManger/SingleView"
import GeneralManagerCreate from "pages/GeneralManger/Crud/Create"

const commonRoute = [
  { path: "/dashboard", component: Dashboard },

  // //profile
  { path: "/profile", component: UserProfile },

  {
    path: "/",
    exact: true,
    component: function dashboard() {
      return <Redirect to="/dashboard" />
    },
  },
]

//for admin only
const AdminProtectedRoutes = [
  { path: "/report", component: Tickets },
  { path: "/dashboard", component: Dashboard },

  // //profile
  { path: "/profile", component: UserProfile },

  //components
  { path: "/dealers", component: Dealers },
  { path: "/dealers/:id", component: DealerDetails },
  { path: "/dealer/create", component: CreateDealer },
  { path: "/dealer/update/:id", component: UpdateDealer },

  { path: "/supervisors", component: Supervisors },
  { path: "/supervisors/:id", component: SupervisorDetails },
  { path: "/supervisor/create", component: CreateSupervisor },
  { path: "/supervisor/update/:id", component: UpdateSupervisor },

  { path: "/supervisor/dailywork", component: DailyWork },

  { path: "/generalmanagers", component: GeneralManager },
  { path: "/generalmanagers/:id", component: GeneralManagerDetails },
  { path: "/generalmanager/create", component: GeneralManagerCreate },

  { path: "/storemanagers", component: StoreManager },
  { path: "/storemanagers/:id", component: StoreManagerDetails },
  { path: "/storemanager/create", component: CreateStoreManager },

  { path: "/productionmanagers", component: ProductionManager },
  { path: "/productionmanagers/:id", component: ProductionManagerDetails },
  { path: "/productionmanager/create", component: CreateProductionManager },

  { path: "/qualitycheckers", component: QualityChecker },
  { path: "/qualitycheckers/:id", component: QltCheckerDetails },
  { path: "/qualitychecker/create", component: CreateQltChecker },

  { path: "/stores", component: Store },
  { path: "/store/create", component: CreateStore },
  { path: "/store/update/:id", component: UpdateStore },
  { path: "/store", component: StoreSupply },

  { path: "/products", component: Product },
  { path: "/products/:id", component: ProductDetails },
  { path: "/product/create", component: CreateProduct },
  { path: "/product/update/:id", component: UpdateProduct },

  { path: "/product/finished", component: FinishedProduct },

  { path: "/orders", component: Orders },
  { path: "/orders/:id", component: OrderDetails },
  { path: "/order/create", component: CreateOrder },

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
]

//for productionManager only
const productionManagerRoutes = AdminProtectedRoutes?.filter(
  route =>
    route.path !== "/productionmanagers" &&
    route.path !== "/productionmanagers/:id" &&
    route.path !== "/productionmanager/create"
)

// for supervisor only
const supervisorRoutes = [
  { path: "/dashboard", component: Dashboard },

  { path: "/profile", component: UserProfile },

  //components
  { path: "/products", component: Product },
  { path: "/products/:id", component: ProductDetails },

  { path: "/product/finished", component: FinishedProduct },

  {
    path: "/",
    exact: true,
    component: function dashboard() {
      return <Redirect to="/dashboard" />
    },
  },
]

//for storemanager only
const storemanagerRoutes = [
  { path: "/dashboard", component: Dashboard },

  { path: "/profile", component: UserProfile },

  //components
  { path: "/products", component: Product },
  { path: "/products/:id", component: ProductDetails },

  { path: "/product/finished", component: FinishedProduct },

  { path: "/store", component: StoreSupply },

  { path: "/stores", component: Store },
  { path: "/store/create", component: CreateStore },
  { path: "/store/update/:id", component: UpdateStore },

  {
    path: "/",
    exact: true,
    component: function dashboard() {
      return <Redirect to="/dashboard" />
    },
  },
]

//for dealer only
const dealerRoutes = [
  { path: "/dashboard", component: Dashboard },

  { path: "/profile", component: UserProfile },

  //components
  { path: "/products", component: Product },
  { path: "/products/:id", component: ProductDetails },

  { path: "/orders", component: Orders },
  { path: "/orders/:id", component: OrderDetails },
  { path: "/order/create", component: CreateOrder },

  {
    path: "/",
    exact: true,
    component: function dashboard() {
      return <Redirect to="/dashboard" />
    },
  },
]

//for qualitychecker only
const qualitycheckerRoutes = [
  { path: "/dashboard", component: Dashboard },

  { path: "/profile", component: UserProfile },

  //components
  { path: "/products", component: Product },
  { path: "/products/:id", component: ProductDetails },

  { path: "/product/finished", component: FinishedProduct },

  {
    path: "/",
    exact: true,
    component: function dashboard() {
      return <Redirect to="/dashboard" />
    },
  },
]

const publicRoutes = [
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPwd },
  { path: "/404", component: Pages404 },
  { path: "/500", component: Pages500 },
]

export {
  publicRoutes,
  AdminProtectedRoutes,
  dealerRoutes,
  commonRoute,
  productionManagerRoutes,
  supervisorRoutes,
  storemanagerRoutes,
  qualitycheckerRoutes,
}
