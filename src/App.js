import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import {
  Switch,
  BrowserRouter as Router,
  Route,
  Redirect,
} from "react-router-dom"

// Import Routes all
import { publicRoutes } from "./routes"

// Import all middleware
import Authmiddleware from "./routes/route"

// layouts Format
import NonAuthLayout from "./components/NonAuthLayout"

import "react-perfect-scrollbar/dist/css/styles.css"
import "react-toastify/dist/ReactToastify.css"
import "react-responsive-modal/styles.css"
import "swiper/swiper-bundle.min.css"
import "swiper/swiper.min.css"
import "./assets/css/main.css"

const App = props => {
  const token = localStorage.getItem("token")

  return (
    <React.Fragment>
      <Router>
        <Switch>
          {publicRoutes.map((route, idx) => (
            <Authmiddleware
              path={route.path}
              layout={NonAuthLayout}
              component={route.component}
              key={idx}
              isAuthProtected={false}
              exact
            />
          ))}
          {!token && (
            <Route render={() => <Redirect to={{ pathname: "/" }} />} />
          )}
          <Route render={() => <Redirect to={{ pathname: "/404" }} />} />,
        </Switch>
      </Router>
    </React.Fragment>
  )
}

App.propTypes = {
  layout: PropTypes.any,
}

const mapStateToProps = state => {
  return {
    layout: state.Layout,
  }
}

export default connect(mapStateToProps, null)(App)
