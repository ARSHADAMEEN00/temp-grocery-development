import React, { useEffect, useState } from "react"
import MetaTags from 'react-meta-tags';
import { Link } from "react-router-dom"
import { Col, Container, Form, Row, Input, Alert } from "reactstrap"
import PropTypes from "prop-types"

//redux
import { useSelector, useDispatch } from "react-redux"

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation"

// actions
import { loginUser, apiError } from "../../store/actions"

// import images
import logo from "assets/images/logo/Indtech.png"

import { Notification } from "../../components/Common/Notification"
import LoginDetails from "./LoginDetails";

import "toastr/build/toastr.min.css"

const Login = ({ history }) => {
  const dispatch = useDispatch()
  const [toggleShow, setToggleShow] = useState(false)
  const { error, user, loading } = useSelector(state => ({
    error: state.Login.error,
    user: state.Login.user,
    loading: state.Login.loading,
  }))
  // handleValidSubmit
  const handleValidSubmit = values => {
    dispatch(loginUser(values, history))
  }

  useEffect(() => {
    dispatch(apiError(""))
    if (user) {
      Notification({
        type: "success",
        message: user?.response,
        title: "",
      })
    }

    if (user?.token) {
      history.push("/dashboard")
    }
  }, [user])
  return (
    <React.Fragment>
      <div>
        <MetaTags>
          <title>Login | Indtech </title>
        </MetaTags>
        <Container fluid className="p-0">
          <Row className="g-0">
            <LoginDetails />


            <Col xl={4}>
              <div className="auth-full-page-content p-md-5 p-4">
                <div className="w-100">
                  <div className="d-flex flex-column h-100">
                    <div className="mb-4 mb-md-5">
                      <Link to="/dashboard" className="d-block auth-logo">
                        <img
                          src={logo}
                          alt=""
                          height="35"
                          className="auth-logo-dark"
                        />
                        <img
                          src={logo}
                          alt=""
                          height="35"
                          className="auth-logo-light"
                        />
                      </Link>
                    </div>
                    <div className="my-auto">
                      <div>
                        <h5 className="text-primary">Welcome Back !</h5>
                        <p className="text-muted">Sign in to continue</p>

                      </div>

                      <div className="mt-4">
                        <AvForm
                          className="form-horizontal"
                          onValidSubmit={(e, v) => {
                            handleValidSubmit(v)
                          }}
                        >
                          {error ? <Alert color="danger">{error}</Alert> : null}

                          <div className="mb-3">
                            <AvField
                              name="username"
                              label="Username"
                              // value="admin@themesbrand.com"
                              className="form-control"
                              placeholder="Enter username"
                              type="text"
                              required
                            />
                          </div>

                          <div className="mb-3">
                            <AvField
                              name="password"
                              label="Password"
                              type={`${toggleShow == true ? "text" : "password"}`}
                              required
                              placeholder="Enter Password"
                              title="click to show passwoard"
                              className="position-relative"
                            />

                            <input
                              type="checkbox"
                              checked={toggleShow ? true : false}
                              className="mt-2"
                              onClick={() => setToggleShow(!toggleShow)}
                            />
                            <label className="mx-2 ">Show password</label>
                          </div>

                          <div className="mt-3 d-grid">
                            <button
                              className="btn btn-primary btn-block"
                              type="submit"
                            >
                              {loading && (
                                <>
                                  <i className="bx bx-loader bx-spin font-size-16 align-middle me-2"></i>
                                </>
                              )}
                              Log In
                            </button>
                          </div>

                          <div className="mt-4 text-center">
                            <Link to="/forgot-password" className="text-muted">
                              <i className="mdi mdi-lock me-1" />
                              Forgot your password?
                            </Link>
                          </div>
                        </AvForm>
                      </div>
                    </div>

                    <div className="mt-4 mt-md-5 text-center">
                      <p>
                        © {new Date().getFullYear()} Indtech. All Rights Reserved |
                        Developed by <a style={{ color: "#1781BB" }} href="https://osperb.com/">
                          Osperb
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Login

Login.propTypes = {
  history: PropTypes.object,
}