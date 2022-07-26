import React from "react"
import { Link } from "react-router-dom"

import category1 from "../../assets/imgs/theme/icons/category-1.svg"
import category2 from "../../assets/imgs/theme/icons/category-2.svg"
import category3 from "../../assets/imgs/theme/icons/category-3.svg"
import category4 from "../../assets/imgs/theme/icons/category-4.svg"
import category5 from "../../assets/imgs/theme/icons/category-5.svg"

import thumb1 from "../../assets/imgs/shop/thumbnail-1.jpg"
import thumb2 from "../../assets/imgs/shop/thumbnail-2.jpg"
import thumb3 from "../../assets/imgs/shop/thumbnail-3.jpg"
import thumb4 from "../../assets/imgs/shop/thumbnail-4.jpg"
import thumb5 from "../../assets/imgs/shop/thumbnail-5.jpg"
import thumb6 from "../../assets/imgs/shop/thumbnail-6.jpg"

import banner11 from "../../assets/imgs/banner/banner-11.png"

const BlogSidebar = () => {
  return (
    <>
      <div className="widget-area">
        <div className="sidebar-widget-2 widget_search mb-50">
          <div className="search-form">
            <form action="#">
              <input type="text" placeholder="Search…" />
              <button type="submit">
                <i className="fi-rs-search"></i>
              </button>
            </form>
          </div>
        </div>
        <div className="sidebar-widget widget-category-2 mb-50">
          <h5 className="section-title style-1 mb-30">Category</h5>
          <ul>
            <li>
              <Link to="/products">
                <img src={category1} alt="" />
                Milks & Dairies
              </Link>
              <span className="count">30</span>
            </li>
            <li>
              <Link to="/products">
                <img src={category2} alt="" />
                Clothing
              </Link>
              <span className="count">35</span>
            </li>
            <li>
              <Link to="/products">
                <img src={category3} alt="" />
                Pet Foods
              </Link>
              <span className="count">42</span>
            </li>
            <li>
              <Link to="/products">
                <img src={category4} alt="" />
                Baking material
              </Link>
              <span className="count">68</span>
            </li>
            <li>
              <Link to="/products">
                <img src={category5} alt="" />
                Fresh Fruit
              </Link>
              <span className="count">87</span>
            </li>
          </ul>
        </div>

        <div className="sidebar-widget product-sidebar mb-50 p-30 bg-grey border-radius-10">
          <h5 className="section-title style-1 mb-30">Trending Now</h5>
          <div className="single-post clearfix">
            <div className="image">
              <img src={thumb3} alt="#" />
            </div>
            <div className="content pt-10">
              <h5>
                <Link to="/shop-product-detail">Chen Cardigan</Link>
              </h5>
              <p className="price mb-0 mt-5">$99.50</p>
              <div className="product-rate">
                <div className="product-rating" style={{ width: "90%" }}></div>
              </div>
            </div>
          </div>
          <div className="single-post clearfix">
            <div className="image">
              <img src={thumb4} alt="#" />
            </div>
            <div className="content pt-10">
              <h6>
                <Link to="/products">Chen Sweater</Link>
              </h6>
              <p className="price mb-0 mt-5">$89.50</p>
              <div className="product-rate">
                <div className="product-rating" style={{ width: "80%" }}></div>
              </div>
            </div>
          </div>
          <div className="single-post clearfix">
            <div className="image">
              <img src={thumb5} alt="#" />
            </div>
            <div className="content pt-10">
              <h6>
                <Link to="/products">Colorful Jacket</Link>
              </h6>
              <p className="price mb-0 mt-5">$25</p>
              <div className="product-rate">
                <div className="product-rating" style={{ width: "60%" }}></div>
              </div>
            </div>
          </div>
          <div className="single-post clearfix">
            <div className="image">
              <img src={thumb6} alt="#" />
            </div>
            <div className="content pt-10">
              <h6>
                <Link to="/products">Lorem, ipsum</Link>
              </h6>
              <p className="price mb-0 mt-5">$25</p>
              <div className="product-rate">
                <div className="product-rating" style={{ width: "60%" }}></div>
              </div>
            </div>
          </div>
        </div>
        <div className="sidebar-widget widget_instagram mb-50">
          <h5 className="section-title style-1 mb-30">Gallery</h5>
          <div className="instagram-gellay">
            <ul className="insta-feed">
              <li>
                <Link to="#">
                  <img className="border-radius-5" src={thumb1} alt="" />
                </Link>
              </li>
              <li>
                <Link to="#">
                  <img className="border-radius-5" src={thumb2} alt="" />
                </Link>
              </li>
              <li>
                <Link to="#">
                  <img className="border-radius-5" src={thumb3} alt="" />
                </Link>
              </li>
              <li>
                <Link to="#">
                  <img className="border-radius-5" src={thumb4} alt="" />
                </Link>
              </li>
              <li>
                <Link to="#">
                  <img className="border-radius-5" src={thumb5} alt="" />
                </Link>
              </li>
              <li>
                <Link to="#">
                  <img className="border-radius-5" src={thumb6} alt="" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="sidebar-widget widget-tags mb-50 pb-10">
          <h5 className="section-title style-1 mb-30">Popular Tags</h5>
          <ul className="tags-list">
            <li className="hover-up">
              <Link to="/blog-category-grid">
                <i className="fi-rs-cross mr-10"></i>Cabbage
              </Link>
            </li>
            <li className="hover-up">
              <Link to="/blog-category-grid">
                <i className="fi-rs-cross mr-10"></i>Broccoli
              </Link>
            </li>
            <li className="hover-up">
              <Link to="/blog-category-grid">
                <i className="fi-rs-cross mr-10"></i>Smoothie
              </Link>
            </li>
            <li className="hover-up">
              <Link to="/blog-category-grid">
                <i className="fi-rs-cross mr-10"></i>Fruit
              </Link>
            </li>
            <li className="hover-up mr-0">
              <Link to="/blog-category-grid">
                <i className="fi-rs-cross mr-10"></i>Salad
              </Link>
            </li>
            <li className="hover-up mr-0">
              <Link to="/blog-category-grid">
                <i className="fi-rs-cross mr-10"></i>Appetizer
              </Link>
            </li>
          </ul>
        </div>
        <div className="banner-img wow fadeIn mb-50 animated d-lg-block d-none">
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
    </>
  )
}

export default BlogSidebar
