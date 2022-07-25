import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"

const Breadcrumb = ({ parent, sub, subChild, noBreadcrumb }) => {
  return (
    <>
      <div className={`page-header breadcrumb-wrap ${noBreadcrumb}`}>
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">
              <span>{parent}</span>
            </Link>
            <span></span> {sub}
            <span></span> {subChild}
          </div>
        </div>
      </div>
    </>
  )
}

export default Breadcrumb

Breadcrumb.propTypes = {
  parent: PropTypes.any,
  sub: PropTypes.any,
  subChild: PropTypes.any,
  noBreadcrumb: PropTypes.any,
}
