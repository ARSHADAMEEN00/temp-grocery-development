import { useState } from "react"
import useClickOutside from "../../util/outsideClick"
import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"

const MobileMenu = ({ isToggled, toggleClick }) => {
  const [isActive, setIsActive] = useState({
    status: false,
    key: "",
  })

  const handleToggle = key => {
    if (isActive.key === key) {
      setIsActive({
        status: false,
      })
    } else {
      setIsActive({
        status: true,
        key,
      })
    }
  }

  let domNode = useClickOutside(() => {
    setIsActive({
      status: false,
    })
  })
  return (
    <>
      <div
        className={
          isToggled
            ? "mobile-header-active mobile-header-wrapper-style sidebar-visible"
            : "mobile-header-active mobile-header-wrapper-style"
        }
      >
        <div className="mobile-header-wrapper-inner">
          <div className="mobile-header-top">
            <div className="mobile-header-logo">
              <Link to="/">
                <img src="/assets/imgs/theme/logo.svg" alt="logo" />
              </Link>
            </div>
            <div className="mobile-menu-close close-style-wrap close-style-position-inherit">
              <button
                className="close-style search-close"
                onClick={toggleClick}
              >
                <i className="icon-top"></i>
                <i className="icon-bottom"></i>
              </button>
            </div>
          </div>
          <div className="mobile-header-content-area">
            <div className="mobile-search search-style-3 mobile-header-border">
              <form action="#">
                <input type="text" placeholder="Search for items…" />
                <button type="submit">
                  <i className="fi-rs-search"></i>
                </button>
              </form>
            </div>
            <div className="mobile-menu-wrap mobile-header-border">
              <div className="main-categori-wrap mobile-header-border">
                <Link to="#">
                  <span className="categori-button-active-2">
                    <span className="fi-rs-apps"></span> Browse Categories
                  </span>
                </Link>
                <div className="categori-dropdown-wrap categori-dropdown-active-small">
                  <ul>
                    <li>
                      <Link to="/shop-grid-right">
                        <i className="evara-font-dress"></i>
                        Women&apos;s Clothing
                      </Link>
                    </li>
                    <li>
                      <Link to="/shop-grid-right">
                        <i className="evara-font-tshirt"></i>
                        Men&apos;s Clothing
                      </Link>
                    </li>
                    <li>
                      {" "}
                      <Link to="/shop-grid-right">
                        <i className="evara-font-smartphone"></i> Cellphones
                      </Link>
                    </li>
                    <li>
                      <Link to="/shop-grid-right">
                        <i className="evara-font-desktop"></i>
                        Computer & Office
                      </Link>
                    </li>
                    <li>
                      <Link to="/shop-grid-right">
                        <i className="evara-font-cpu"></i>
                        Consumer Electronics
                      </Link>
                    </li>
                    <li>
                      <Link to="/shop-grid-right">
                        <i className="evara-font-home"></i>
                        Home & Garden
                      </Link>
                    </li>
                    <li>
                      <Link to="/shop-grid-right">
                        <i className="evara-font-high-heels"></i>
                        Shoes
                      </Link>
                    </li>
                    <li>
                      <Link to="/shop-grid-right">
                        <i className="evara-font-teddy-bear"></i>
                        Mother & Kids
                      </Link>
                    </li>
                    <li>
                      <Link to="/shop-grid-right">
                        <i className="evara-font-kite"></i>
                        Outdoor fun
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <nav>
                <ul className="mobile-menu" ref={domNode}>
                  <li
                    className={
                      isActive.key == 1
                        ? "menu-item-has-children active"
                        : "menu-item-has-children"
                    }
                  >
                    <span
                      className="menu-expand"
                      onClick={() => handleToggle(1)}
                    >
                      <i className="fi-rs-angle-small-down"></i>
                    </span>
                    <Link to="/index">Home</Link>
                    <ul className={isActive.key == 1 ? "dropdown" : "d-none"}>
                      <li>
                        <Link to="/index">Home 1</Link>
                      </li>
                      <li>
                        <Link to="/index-2">Home 2</Link>
                      </li>
                      <li>
                        <Link to="/index-3">Home 3</Link>
                      </li>
                      <li>
                        <Link to="/index-4">Home 4</Link>
                      </li>
                    </ul>
                  </li>
                  <li
                    className={
                      isActive.key == 2
                        ? "menu-item-has-children active"
                        : "menu-item-has-children"
                    }
                  >
                    <span
                      className="menu-expand"
                      onClick={() => handleToggle(2)}
                    >
                      <i className="fi-rs-angle-small-down"></i>
                    </span>
                    <Link to="/shop-grid-right">shop</Link>
                    <ul className={isActive.key == 2 ? "dropdown" : "d-none"}>
                      <li>
                        <Link to="/shop-grid-right">
                          Shop Grid – Right Sidebar
                        </Link>
                      </li>
                      <li>
                        <Link to="/shop-grid-left">
                          Shop Grid – Left Sidebar
                        </Link>
                      </li>
                      <li>
                        <Link to="/shop-list-right">
                          Shop List – Right Sidebar
                        </Link>
                      </li>
                      <li>
                        <Link to="/shop-list-left">
                          Shop List – Left Sidebar
                        </Link>
                      </li>
                      <li>
                        <Link to="/shop-fullwidth">Shop - Wide</Link>
                      </li>
                      <li>
                        <Link to="/shop-filter">Shop – Filter</Link>
                      </li>
                      <li>
                        <Link to="/shop-wishlist">Shop – Wishlist</Link>
                      </li>
                      <li>
                        <Link to="/shop-cart">Shop – Cart</Link>
                      </li>
                      <li>
                        <Link to="/shop-checkout">Shop – Checkout</Link>
                      </li>
                      <li>
                        <Link to="/shop-compare">Shop – Compare</Link>
                      </li>
                    </ul>
                  </li>
                  <li
                    className={
                      isActive.key == 3
                        ? "menu-item-has-children active"
                        : "menu-item-has-children"
                    }
                  >
                    <span
                      className="menu-expand"
                      onClick={() => handleToggle(3)}
                    >
                      <i className="fi-rs-angle-small-down"></i>
                    </span>
                    <Link to="#">Mega menu</Link>
                    <ul className={isActive.key == 3 ? "dropdown" : "d-none"}>
                      <li className="menu-item-has-children">
                        <span className="menu-expand"></span>
                        <Link to="#">Women&apos;s Fashion</Link>
                        <ul className="dropdown">
                          <li>
                            <Link to="/shop-product-right">Dresses</Link>
                          </li>
                          <li>
                            <Link to="/shop-product-right">
                              Blouses & Shirts
                            </Link>
                          </li>
                          <li>
                            <Link to="/shop-product-right">
                              Hoodies & Sweatshirts
                            </Link>
                          </li>
                          <li>
                            <Link to="/shop-product-right">
                              Women&apos;s Sets
                            </Link>
                          </li>
                        </ul>
                      </li>
                      <li className="menu-item-has-children">
                        <span className="menu-expand"></span>
                        <Link to="#">Men&apos;s Fashion</Link>
                        <ul className="dropdown">
                          <li>
                            <Link to="/shop-product-right">Jackets</Link>
                          </li>
                          <li>
                            <Link to="/shop-product-right">
                              Casual Faux Leather
                            </Link>
                          </li>
                          <li>
                            <Link to="/shop-product-right">
                              Genuine Leather
                            </Link>
                          </li>
                        </ul>
                      </li>
                      <li className="menu-item-has-children">
                        <span className="menu-expand"></span>
                        <Link to="#">Technology</Link>
                        <ul className="dropdown">
                          <li>
                            <Link to="/shop-product-right">Gaming Laptops</Link>
                          </li>
                          <li>
                            <Link to="/shop-product-right">
                              Ultraslim Laptops
                            </Link>
                          </li>
                          <li>
                            <Link to="/shop-product-right">Tablets</Link>
                          </li>
                          <li>
                            <Link to="/shop-product-right">
                              Laptop Accessories
                            </Link>
                          </li>
                          <li>
                            <Link to="/shop-product-right">
                              Tablet Accessories
                            </Link>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li
                    className={
                      isActive.key == 4
                        ? "menu-item-has-children active"
                        : "menu-item-has-children"
                    }
                  >
                    <span
                      className="menu-expand"
                      onClick={() => handleToggle(4)}
                    >
                      <i className="fi-rs-angle-small-down"></i>
                    </span>
                    <Link to="/blog-category-fullwidth">Blog</Link>
                    <ul className={isActive.key == 4 ? "dropdown" : "d-none"}>
                      <li>
                        <Link to="/blog-category-grid">Blog Category Grid</Link>
                      </li>
                      <li>
                        <Link to="/blog-category-list">Blog Category List</Link>
                      </li>
                      <li>
                        <Link to="/blog-category-big">Blog Category Big</Link>
                      </li>
                      <li>
                        <Link to="/blog-category-fullwidth">
                          Blog Category Wide
                        </Link>
                      </li>
                      <li className="menu-item-has-children">
                        <span className="menu-expand"></span>
                        <Link to="#">Single Product Layout</Link>
                        <ul className="dropdown">
                          <li>
                            <Link to="/blog-post-left">Left Sidebar</Link>
                          </li>
                          <li>
                            <Link to="/blog-post-right">Right Sidebar</Link>
                          </li>
                          <li>
                            <Link to="/blog-post-fullwidth">No Sidebar</Link>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li
                    className={
                      isActive.key == 5
                        ? "menu-item-has-children active"
                        : "menu-item-has-children"
                    }
                  >
                    <span
                      className="menu-expand"
                      onClick={() => handleToggle(5)}
                    >
                      <i className="fi-rs-angle-small-down"></i>
                    </span>
                    <Link to="#">Pages</Link>
                    <ul className={isActive.key == 5 ? "dropdown" : "d-none"}>
                      <li>
                        <Link to="/page-about">About Us</Link>
                      </li>
                      <li>
                        <Link to="/page-contact">Contact</Link>
                      </li>
                      <li>
                        <Link to="/page-account">My Account</Link>
                      </li>
                      <li>
                        <Link to="/page-login-register">login/register</Link>
                      </li>
                      <li>
                        <Link to="/page-purchase-guide">Purchase Guide</Link>
                      </li>
                      <li>
                        <Link to="/page-privacy-policy">Privacy Policy</Link>
                      </li>
                      <li>
                        <Link to="/page-terms">Terms of Service</Link>
                      </li>
                      <li>
                        <Link to="/page-404">404 Page</Link>
                      </li>
                    </ul>
                  </li>
                  <li
                    className={
                      isActive.key == 6
                        ? "menu-item-has-children active"
                        : "menu-item-has-children"
                    }
                  >
                    <span
                      className="menu-expand"
                      onClick={() => handleToggle(6)}
                    >
                      <i className="fi-rs-angle-small-down"></i>
                    </span>
                    <Link to="#">Language</Link>
                    <ul className={isActive.key == 6 ? "dropdown" : "d-none"}>
                      <li>
                        <Link to="#">English</Link>
                      </li>
                      <li>
                        <Link to="#">French</Link>
                      </li>
                      <li>
                        <Link to="#">German</Link>
                      </li>
                      <li>
                        <Link to="#">Spanish</Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="mobile-header-info-wrap mobile-header-border">
              <div className="single-mobile-header-info mt-30">
                <Link to="/page-contact">Our location</Link>
              </div>
              <div className="single-mobile-header-info">
                <Link to="/page-login-register">Log In / Sign Up</Link>
              </div>
              <div className="single-mobile-header-info">
                <Link to="#">(+01) - 2345 - 6789</Link>
              </div>
            </div>
            <div className="mobile-social-icon">
              <h5 className="mb-15 text-grey-4">Follow Us</h5>
              <Link to="#">
                <img src="/assets/imgs/theme/icons/icon-facebook.svg" alt="" />
              </Link>
              <Link to="#">
                <img src="/assets/imgs/theme/icons/icon-twitter.svg" alt="" />
              </Link>
              <Link to="#">
                <img src="/assets/imgs/theme/icons/icon-instagram.svg" alt="" />
              </Link>
              <Link to="#">
                <img src="/assets/imgs/theme/icons/icon-pinterest.svg" alt="" />
              </Link>
              <Link to="#">
                <img src="/assets/imgs/theme/icons/icon-youtube.svg" alt="" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MobileMenu

MobileMenu.propTypes = {
  isToggled: PropTypes.any,
  toggleClick: PropTypes.any,
}
