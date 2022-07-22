// Dashboard
import Pages500 from "pages/404/pages-500"
import Pages404 from "pages/404/pages-404"
import Home from "pages/Home"

const publicRoutes = [
  { path: "/404", component: Pages404 },
  { path: "/500", component: Pages500 },
  { path: "/", component: Home },
]

export { publicRoutes }
