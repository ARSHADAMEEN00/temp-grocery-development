import React from "react"
import CategoryProduct from "./Filter/CategoryProduct"
import PriceRangeSlider from "./Filter/PriceRangeSlider"
import SizeFilter from "./Filter/SizeFilter"
import VendorFilter from "./Filter/VendorFilter"

import banner11 from "../../assets/imgs/banner/banner-11.png"
import thumbnail5 from "../../assets/imgs/shop/thumbnail-5.jpg"
import thumbnail4 from "../../assets/imgs/shop/thumbnail-4.jpg"
import thumbnail3 from "../../assets/imgs/shop/thumbnail-3.jpg"

function SideFilter() {
  return (
    <div className="col-lg-1-5 primary-sidebar sticky-sidebar pt-30">
      <div className="sidebar-widget widget-category-2 mb-30">
        <h5 className="section-title style-1 mb-30">Category</h5>
        <CategoryProduct />
      </div>

      <div className="sidebar-widget price_range range mb-30">
        <h5 className="section-title style-1 mb-30">Fill by price</h5>
        <div className="bt-1 border-color-1"></div>

        <div className="price-filter">
          <div className="price-filter-inner">
            <br />
            <PriceRangeSlider />

            <br />
          </div>
        </div>

        <div className="list-group">
          <div className="list-group-item mb-10 mt-10">
            <label className="fw-900">Color</label>
            <VendorFilter />
            <label className="fw-900 mt-15">Item Condition</label>
            <SizeFilter />
          </div>
        </div>
        <br />
      </div>

      <div className="sidebar-widget product-sidebar  mb-30 p-30 bg-grey border-radius-10">
        <h5 className="section-title style-1 mb-30">New products</h5>
        <div className="bt-1 border-color-1"></div>

        <div className="single-post clearfix">
          <div className="image">
            <img src={thumbnail3} alt="#" />
          </div>
          <div className="content pt-10">
            <h5>
              <a>Chen Cardigan</a>
            </h5>
            <p className="price mb-0 mt-5">$99.50</p>
            <div className="product-rate">
              <div className="product-rating" style={{ width: "90%" }}></div>
            </div>
          </div>
        </div>
        <div className="single-post clearfix">
          <div className="image">
            <img src={thumbnail4} alt="#" />
          </div>
          <div className="content pt-10">
            <h6>
              <a>Chen Sweater</a>
            </h6>
            <p className="price mb-0 mt-5">$89.50</p>
            <div className="product-rate">
              <div className="product-rating" style={{ width: "80%" }}></div>
            </div>
          </div>
        </div>
        <div className="single-post clearfix">
          <div className="image">
            <img src={thumbnail5} alt="#" />
          </div>
          <div className="content pt-10">
            <h6>
              <a>Colorful Jacket</a>
            </h6>
            <p className="price mb-0 mt-5">$25</p>
            <div className="product-rate">
              <div className="product-rating" style={{ width: "60%" }}></div>
            </div>
          </div>
        </div>
      </div>
      <div className="banner-img wow fadeIn mb-lg-0 animated d-lg-block d-none">
        <img src={banner11} alt="" />
        <div className="banner-text">
          <span>Oganic</span>
          <h4>
            Save 17% <br />
            on <span className="text-brand">Oganic</span>
            <br />
            Juice
          </h4>
        </div>
      </div>
    </div>
  )
}

export default SideFilter
