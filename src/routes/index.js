// Dashboard
import Pages500 from "pages/404/pages-500"
import Pages404 from "pages/404/pages-404"
import Home from "pages/Home/home1"
import ProductSingleView from "pages/product"
import Cart from "pages/product/shop-cart"
import ProductsList from "pages/shop/shop-list-left"
import dashboard from "pages/user/dashboard"
import Account from "pages/user/page-account"
import Contact from "pages/user/page-contact"
import WishlistModal from "pages/shop/shop-wishlist"
import shopCompare from "pages/shop/shop-compare"
import About from "pages/static/page-about"
import Privacy from "pages/static/page-privacy-policy"
import Terms from "pages/static/page-terms"
import Guide from "pages/static/page-purchase-guide"

const publicRoutes = [
  { path: "/404", component: Pages404 },
  { path: "/500", component: Pages500 },
  { path: "/", component: Home },
  { path: "/product/:id", component: ProductSingleView },
  { path: "/shop-cart", component: Cart },
  { path: "/shop-list", component: ProductsList },
  { path: "/user-dashbaord", component: dashboard },
  { path: "/user-account", component: Account },
  { path: "/user-contact", component: Contact },
  { path: "/user-wishlist", component: WishlistModal },
  { path: "/user-compare-product", component: shopCompare },
  { path: "/about", component: About },
  { path: "/privacy-policy", component: Privacy },
  { path: "/purchase-guide", component: Guide },
  { path: "/page-terms", component: Terms },
]

export { publicRoutes }
