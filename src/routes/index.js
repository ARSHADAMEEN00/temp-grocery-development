// Dashboard
import Pages500 from "pages/404/pages-500"
import Pages404 from "pages/404/pages-404"
import Home from "pages/Home"

// const commonRoute = [
//   { path: "/profile", component: UserProfile },
//   {
//     path: "/",
//     exact: true,
//     component: function dashboard() {
//       return <Redirect to="/" />
//     },
//   },
// ]

const publicRoutes = [
  { path: "/404", component: Pages404 },
  { path: "/500", component: Pages500 },
  { path: "/", component: Home },
]

export { publicRoutes }
