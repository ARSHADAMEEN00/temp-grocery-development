// Dashboard
import Pages500 from "pages/404/pages-500"
import Pages404 from "pages/404/pages-404"
import Home from "pages/Home/home1"
import ProductSingleView from "pages/product"
import Cart from "pages/product/shop-cart"

const publicRoutes = [
  { path: "/404", component: Pages404 },
  { path: "/500", component: Pages500 },
  { path: "/", component: Home },
  { path: "/product/:id", component: ProductSingleView },
  { path: "/shop-cart", component: Cart },
]

export { publicRoutes }
