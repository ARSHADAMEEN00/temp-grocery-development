import React from "react"
import { Redirect } from "react-router-dom"

// Profile
import UserProfile from "../pages/Authentication/user-profile"

// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"

//pages

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

// Dashboard
import Dashboard from "../pages/Dashboard/index"
import Pages500 from "pages/404/pages-500"
import Pages404 from "pages/404/pages-404"
import ProductionManager from "pages/ProductionMngr"
import ProductionManagerDetails from "pages/ProductionMngr/SingleView"
import CreateProductionManager from "pages/ProductionMngr/Crud/Create"
import StoreSupply from "pages/Store/StoreSupply"
import ForgetPwd from "pages/Authentication/ForgetPwd"
import GeneralManager from "pages/GeneralManger"
import GeneralManagerDetails from "pages/GeneralManger/SingleView"
import GeneralManagerCreate from "pages/GeneralManger/Crud/Create"
import Client from "pages/Clients"
import ClientDetails from "pages/Clients/SingleView"
import CreateClient from "pages/Clients/Crud/Create"
import Quotations from "pages/Quotations"
import CreateQuotations from "pages/Quotations/Crud/Create/Create"
import Salesman from "pages/Salesman"
import SalesmanDetails from "pages/Salesman/SingleView"
import CreateSalesman from "pages/Salesman/Crud/Create"
import PDFGenerator from "components/Pdf/report"
import ProductionStages from "pages/ProductionStages"
import OrderItemSingleView from "pages/QcInscpection/SingleView/index"
import stageDetail from "pages/ProductionStages/SingleView"
import WorkOrderPDFGenerator from "components/Pdf/WorkOrderReport"
import ProductionOrder from "pages/QcInscpection"

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

//for md(managing Director) only
const MDProtectedRoutes = [
  { path: "/dashboard", component: Dashboard },
  { path: "/quotation/pdf", component: PDFGenerator },
  { path: "/order/work/pdf", component: WorkOrderPDFGenerator },

  // //profile Clients
  { path: "/profile", component: UserProfile },

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

  { path: "/salesmans", component: Salesman },
  { path: "/salesmans/:id", component: SalesmanDetails },
  { path: "/salesman/create", component: CreateSalesman },

  { path: "/clients", component: Client },
  { path: "/clients/:id", component: ClientDetails },
  { path: "/client/create", component: CreateClient },

  { path: "/stores", component: Store },
  { path: "/store/create", component: CreateStore },
  { path: "/store/update/:id", component: UpdateStore },
  { path: "/store", component: StoreSupply },

  { path: "/products", component: Product },
  { path: "/products/:id", component: ProductDetails },
  { path: "/product/create", component: CreateProduct },
  { path: "/product/update/:id", component: UpdateProduct },

  { path: "/orders", component: Orders },
  { path: "/orders/:id", component: OrderDetails },
  { path: "/order/create", component: CreateOrder },
  { path: "/orderItem/:id", component: OrderItemSingleView },

  { path: "/quotations", component: Quotations },
  { path: "/quotation/create", component: CreateQuotations },

  { path: "/orderItems", component: ProductionOrder },
  { path: "/stages", component: ProductionStages },

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
]

//for GM(general manager) only
const GMRoutes = MDProtectedRoutes?.filter(
  route =>
    route.path !== "/generalmanagers" &&
    route.path !== "/generalmanagers/:id" &&
    route.path !== "/generalmanager/create"
)

//for productionManager only
const productionManagerRoutes = MDProtectedRoutes?.filter(
  route =>
    route.path !== "/productionmanagers" &&
    route.path !== "/productionmanagers/:id" &&
    route.path !== "/productionmanager/create" &&
    route.path !== "/generalmanagers" &&
    route.path !== "/generalmanagers/:id" &&
    route.path !== "/generalmanager/create" &&
    route.path !== "/product/create" &&
    route.path !== "/client/create" &&
    route.path !== "/storemanagers" &&
    route.path !== "/qualitycheckers" &&
    route.path !== "/salesmans"
)

//for storemanager only
const storemanagerRoutes = [
  { path: "/dashboard", component: Dashboard },

  { path: "/profile", component: UserProfile },

  //components
  { path: "/products", component: Product },
  { path: "/products/:id", component: ProductDetails },

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

//for qualitychecker only
const qualitycheckerRoutes = [
  { path: "/dashboard", component: Dashboard },

  { path: "/profile", component: UserProfile },

  //components
  { path: "/orderItems", component: ProductionOrder },
  { path: "/orderItem/:id", component: OrderItemSingleView },

  { path: "/stages", component: ProductionStages },
  { path: "/stages/:id", component: stageDetail },

  {
    path: "/",
    exact: true,
    component: function dashboard() {
      return <Redirect to="/dashboard" />
    },
  },
]
const salesmanRouts = [
  { path: "/dashboard", component: Dashboard },

  { path: "/profile", component: UserProfile },

  { path: "/products/:id", component: ProductDetails },

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
  commonRoute,
  MDProtectedRoutes,
  GMRoutes,
  productionManagerRoutes,
  storemanagerRoutes,
  qualitycheckerRoutes,
  salesmanRouts,
}
