import React from "react"
import Tags from "../ecommerce/Filter/Tags"
import { Link, useLocation } from "react-router-dom"
import PropTypes from "prop-types"
const Breadcrumb2 = ({ parent, sub, subChild, noBreadcrumb }) => {
  const location = useLocation()

  const titlex = location.cat
  return (
    <>
      <div className="page-header mt-30 mb-50">
        <div className="container">
          <div className="archive-header">
            <div className="row align-items-center">
              <div className="col-xl-3">
                <h1 className="mb-15 text-capitalize">
                  {titlex ? titlex : "Category"}
                </h1>
                <div className="breadcrumb">
                  <Link to="/">
                    <span rel="nofollow">
                      <i className="fi-rs-home mr-5"></i>Home
                    </span>
                  </Link>
                  <span></span> Shop <span></span> {titlex}
                </div>
              </div>
              <div className="col-xl-9 text-end d-none d-xl-block">
                <Tags />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Breadcrumb2

Breadcrumb2.propTypes = {
  parent: PropTypes.any,
  sub: PropTypes.any,
  subChild: PropTypes.any,
  noBreadcrumb: PropTypes.any,
}
