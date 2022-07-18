import React from "react"
import { Redirect } from "react-router-dom"

// Profile
import UserProfile from "../pages/Authentication/user-profile"

// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"

//pages

// Dashboard
import Home from "../pages/Home/index"
import Pages500 from "pages/404/pages-500"
import Pages404 from "pages/404/pages-404"
import ForgetPwd from "pages/Authentication/ForgetPwd"

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
  { path: "/", component: Home },
  { path: "/profile", component: UserProfile },

  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPwd },
  { path: "/404", component: Pages404 },
  { path: "/500", component: Pages500 },
]

export { publicRoutes }
