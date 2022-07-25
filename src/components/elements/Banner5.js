import React from "react"
import { Link } from "react-router-dom"

import banner1 from "../../assets/imgs/banner/banner-1.png"
import banner2 from "../../assets/imgs/banner/banner-2.png"
import banner3 from "../../assets/imgs/banner/banner-3.png"

const Banner5 = () => {
  return (
    <>
      <div className="col-lg-4 col-md-6">
        <div
          className="banner-img wow animate__animated animate__fadeInUp"
          data-wow-delay="0"
        >
          <img src={banner1} alt="" />
          <div className="banner-text">
            <h4>
              Everyday Fresh & <br />
              Clean with Our
              <br />
              Products
            </h4>
            <Link to="/products">
              <span className="btn btn-xs">
                Shop Now <i className="fi-rs-arrow-small-right"></i>
              </span>
            </Link>
          </div>
        </div>
      </div>
      <div className="col-lg-4 col-md-6">
        <div
          className="banner-img wow animate__animated animate__fadeInUp"
          data-wow-delay=".2s"
        >
          <img src={banner2} alt="" />
          <div className="banner-text">
            <h4>
              Make your Breakfast
              <br />
              Healthy and Easy
            </h4>
            <Link to="/products">
              <span className="btn btn-xs">
                Shop Now <i className="fi-rs-arrow-small-right"></i>
              </span>
            </Link>
          </div>
        </div>
      </div>
      <div className="col-lg-4 d-md-none d-lg-flex">
        <div
          className="banner-img mb-sm-0 wow animate__animated animate__fadeInUp"
          data-wow-delay=".4s"
        >
          <img src={banner3} alt="" />
          <div className="banner-text">
            <h4>
              The best Organic <br />
              Products Online
            </h4>
            <Link to="/products">
              <span className="btn btn-xs">
                Shop Now <i className="fi-rs-arrow-small-right"></i>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Banner5
