import React from "react"
import Link from "next/link"

import banner9 from "../../assets/imgs/banner/banner-9.png"
import icon1 from "../../assets/imgs/theme/icons/icon-1.svg"
import icon2 from "../../assets/imgs/theme/icons/icon-2.svg"
import icon3 from "../../assets/imgs/theme/icons/icon-3.svg"
import icon4 from "../../assets/imgs/theme/icons/icon-4.svg"
import icon5 from "../../assets/imgs/theme/icons/icon-5.svg"
import icon6 from "../../assets/imgs/theme/icons/icon-6.svg"
import logo from "../../assets/imgs/theme/logo.svg"
import location from "../../assets/imgs/theme/icons/icon-location.svg"
import contact from "../../assets/imgs/theme/icons/icon-contact.svg"
import email from "../../assets/imgs/theme/icons/icon-email-2.svg"
import clock from "../../assets/imgs/theme/icons/icon-clock.svg"
import appStore from "../../assets/imgs/theme/app-store.jpg"
import playStore from "../../assets/imgs/theme/google-play.jpg"
import payment from "../../assets/imgs/theme/payment-method.png"
import phone from "../../assets/imgs/theme/icons/phone-call.svg"
import facebook from "../../assets/imgs/theme/icons/icon-facebook-white.svg"
import twitter from "../../assets/imgs/theme/icons/icon-twitter-white.svg"
import instagram from "../../assets/imgs/theme/icons/icon-instagram-white.svg"
import piterest from "../../assets/imgs/theme/icons/icon-pinterest-white.svg"
import youtube from "../../assets/imgs/theme/icons/icon-youtube-white.svg"

const Footer = () => {
  return (
    <>
      <footer className="main">
        <section className="newsletter mb-15  wow animate__animated animate__fadeIn">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="position-relative newsletter-inner">
                  <div className="newsletter-content">
                    <h2 className="mb-20">
                      Stay home & get your daily <br />
                      needs from our shop
                    </h2>
                    <p className="mb-45">
                      Start You&apos;r Daily Shopping with{" "}
                      <span className="text-brand">Nest Mart</span>
                    </p>
                    <form className="form-subcriber d-flex">
                      <input type="email" placeholder="Your emaill address" />
                      <button className="btn" type="submit">
                        Subscribe
                      </button>
                    </form>
                  </div>
                  <img src={banner9} alt="newsletter" />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="featured  section-padding">
          <div className="container">
            <div className="row">
              <div className="col-lg-1-5 col-md-4 col-12 col-sm-6 mb-md-4 mb-xl-0">
                <div
                  className="banner-left-icon d-flex align-items-center  wow animate__animated animate__fadeInUp"
                  data-wow-delay="0"
                >
                  <div className="banner-icon">
                    <img src={icon1} alt="" />
                  </div>
                  <div className="banner-text">
                    <h3 className="icon-box-title">Best prices & offers</h3>
                    <p>Orders $50 or more</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-1-5 col-md-4 col-12 col-sm-6">
                <div
                  className="banner-left-icon d-flex align-items-center  wow animate__animated animate__fadeInUp"
                  data-wow-delay=".1s"
                >
                  <div className="banner-icon">
                    <img src={icon2} alt="icon2" />
                  </div>
                  <div className="banner-text">
                    <h3 className="icon-box-title">Free delivery</h3>
                    <p>24/7 amazing services</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-1-5 col-md-4 col-12 col-sm-6">
                <div
                  className="banner-left-icon d-flex align-items-center  wow animate__animated animate__fadeInUp"
                  data-wow-delay=".2s"
                >
                  <div className="banner-icon">
                    <img src={icon3} alt="" />
                  </div>
                  <div className="banner-text">
                    <h3 className="icon-box-title">Great daily deal</h3>
                    <p>When you sign up</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-1-5 col-md-4 col-12 col-sm-6">
                <div
                  className="banner-left-icon d-flex align-items-center  wow animate__animated animate__fadeInUp"
                  data-wow-delay=".3s"
                >
                  <div className="banner-icon">
                    <img src={icon4} alt="" />
                  </div>
                  <div className="banner-text">
                    <h3 className="icon-box-title">Wide assortment</h3>
                    <p>Mega Discounts</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-1-5 col-md-4 col-12 col-sm-6">
                <div
                  className="banner-left-icon d-flex align-items-center  wow animate__animated animate__fadeInUp"
                  data-wow-delay=".4s"
                >
                  <div className="banner-icon">
                    <img src={icon5} alt="" />
                  </div>
                  <div className="banner-text">
                    <h3 className="icon-box-title">Easy returns</h3>
                    <p>Within 30 days</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-1-5 col-md-4 col-12 col-sm-6 d-xl-none">
                <div
                  className="banner-left-icon d-flex align-items-center  wow animate__animated animate__fadeInUp"
                  data-wow-delay=".5s"
                >
                  <div className="banner-icon">
                    <img src={icon6} alt="" />
                  </div>
                  <div className="banner-text">
                    <h3 className="icon-box-title">Safe delivery</h3>
                    <p>Within 30 days</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section-padding footer-mid">
          <div className="container pt-15 pb-20">
            <div className="row">
              <div className="col">
                <div
                  className="widget-about font-md mb-md-3 mb-lg-3 mb-xl-0  wow animate__animated animate__fadeInUp"
                  data-wow-delay="0"
                >
                  <div className="logo  mb-30">
                    <Link href="/">
                      <a className="mb-15">
                        <img src={logo} alt="logo" />
                      </a>
                    </Link>
                    <p className="font-lg text-heading">
                      Awesome grocery store website template
                    </p>
                  </div>
                  <ul className="contact-infor">
                    <li>
                      <img src={location} alt="" />
                      <strong>Address: </strong>{" "}
                      <span>
                        5171 W Campbell Ave undefined Kent, Utah 53127 United
                        States
                      </span>
                    </li>
                    <li>
                      <img src={contact} alt="" />
                      <strong>Call Us:</strong>
                      <span>(+91) - 540-025-124553</span>
                    </li>
                    <li>
                      <img src={email} alt="" />
                      <strong>Email:</strong>
                      <span>sale@Nest.com</span>
                    </li>
                    <li>
                      <img src={clock} alt="" />
                      <strong>Hours:</strong>
                      <span>10:00 - 18:00, Mon - Sat</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div
                className="footer-link-widget col  wow animate__animated animate__fadeInUp"
                data-wow-delay=".1s"
              >
                <h4 className="widget-title">Company</h4>
                <ul className="footer-list  mb-sm-5 mb-md-0">
                  <li>
                    <a href="#">About Us</a>
                  </li>
                  <li>
                    <a href="#">Delivery Information</a>
                  </li>
                  <li>
                    <a href="#">Privacy Policy</a>
                  </li>
                  <li>
                    <a href="#">Terms &amp; Conditions</a>
                  </li>
                  <li>
                    <a href="#">Contact Us</a>
                  </li>
                  <li>
                    <a href="#">Support Center</a>
                  </li>
                  <li>
                    <a href="#">Careers</a>
                  </li>
                </ul>
              </div>
              <div
                className="footer-link-widget col  wow animate__animated animate__fadeInUp"
                data-wow-delay=".2s"
              >
                <h4 className="widget-title ">Account</h4>
                <ul className="footer-list  mb-sm-5 mb-md-0">
                  <li>
                    <a href="#">Sign In</a>
                  </li>
                  <li>
                    <a href="#">View Cart</a>
                  </li>
                  <li>
                    <a href="#">My Wishlist</a>
                  </li>
                  <li>
                    <a href="#">Track My Order</a>
                  </li>
                  <li>
                    <a href="#">Help Ticket</a>
                  </li>
                  <li>
                    <a href="#">Shipping Details</a>
                  </li>
                  <li>
                    <a href="#">Compare products</a>
                  </li>
                </ul>
              </div>
              <div
                className="footer-link-widget col  wow animate__animated animate__fadeInUp"
                data-wow-delay=".3s"
              >
                <h4 className="widget-title ">Corporate</h4>
                <ul className="footer-list  mb-sm-5 mb-md-0">
                  <li>
                    <a href="#">Become a Vendor</a>
                  </li>
                  <li>
                    <a href="#">Affiliate Program</a>
                  </li>
                  <li>
                    <a href="#">Farm Business</a>
                  </li>
                  <li>
                    <a href="#">Farm Careers</a>
                  </li>
                  <li>
                    <a href="#">Our Suppliers</a>
                  </li>
                  <li>
                    <a href="#">Accessibility</a>
                  </li>
                  <li>
                    <a href="#">Promotions</a>
                  </li>
                </ul>
              </div>
              <div
                className="footer-link-widget col  wow animate__animated animate__fadeInUp"
                data-wow-delay=".4s"
              >
                <h4 className="widget-title ">Popular</h4>
                <ul className="footer-list  mb-sm-5 mb-md-0">
                  <li>
                    <a href="#">Milk & Flavoured Milk</a>
                  </li>
                  <li>
                    <a href="#">Butter and Margarine</a>
                  </li>
                  <li>
                    <a href="#">Eggs Substitutes</a>
                  </li>
                  <li>
                    <a href="#">Marmalades</a>
                  </li>
                  <li>
                    <a href="#">Sour Cream and Dips</a>
                  </li>
                  <li>
                    <a href="#">Tea & Kombucha</a>
                  </li>
                  <li>
                    <a href="#">Cheese</a>
                  </li>
                </ul>
              </div>
              <div
                className="footer-link-widget widget-install-app col  wow animate__animated animate__fadeInUp"
                data-wow-delay=".5s"
              >
                <h4 className="widget-title ">Install App</h4>
                <p className="">From App Store or Google Play</p>
                <div className="download-app ">
                  <a href="#" className="hover-up mb-sm-2 mb-lg-0">
                    <img className="active" src={appStore} alt="" />
                  </a>
                  <a href="#" className="hover-up mb-sm-2">
                    <img src={playStore} alt="" />
                  </a>
                </div>
                <p className="mb-20 ">Secured Payment Gateways</p>
                <img className="" src={payment} alt="" />
              </div>
            </div>
          </div>
        </section>
        <div
          className="container pb-30  wow animate__animated animate__fadeInUp"
          data-wow-delay="0"
        >
          <div className="row align-items-center">
            <div className="col-12 mb-30">
              <div className="footer-bottom"></div>
            </div>
            <div className="col-xl-4 col-lg-6 col-md-6">
              <p className="font-sm mb-0">
                &copy; 2021, <strong className="text-brand">Nest</strong> - HTML
                Ecommerce Template <br />
                All rights reserved
              </p>
            </div>
            <div className="col-xl-4 col-lg-6 text-center d-none d-xl-block">
              <div className="hotline d-lg-inline-flex mr-30">
                <img src={phone} alt="hotline" />
                <p>
                  1900 - 6666<span>Working 8:00 - 22:00</span>
                </p>
              </div>
              <div className="hotline d-lg-inline-flex">
                <img src={phone} alt="hotline" />
                <p>
                  1900 - 8888<span>24/7 Support Center</span>
                </p>
              </div>
            </div>
            <div className="col-xl-4 col-lg-6 col-md-6 text-end d-none d-md-block">
              <div className="mobile-social-icon">
                <h6>Follow Us</h6>
                <a href="#">
                  <img src={facebook} alt="" />
                </a>
                <a href="#">
                  <img src={twitter} alt="" />
                </a>
                <a href="#">
                  <img src={instagram} alt="" />
                </a>
                <a href="#">
                  <img src={piterest} alt="" />
                </a>
                <a href="#">
                  <img src={youtube} alt="" />
                </a>
              </div>
              <p className="font-sm">
                Up to 15% discount on your first subscribe
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
