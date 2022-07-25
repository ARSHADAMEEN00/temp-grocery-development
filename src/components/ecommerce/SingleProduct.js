import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import PropTypes from "prop-types"
import { server } from "../../config/index"

// import { addToCart } from "../../redux/action/cart";
// import { addToCompare } from "../../redux/action/compareAction";
// import { openQuickView } from "../../redux/action/quickViewAction";
// import { addToWishlist } from "../../redux/action/wishlistAction";

const SingleProduct = ({
  product,
  addToCart,
  addToCompare,
  addToWishlist,
  openQuickView,
}) => {
  const handleCart = product => {
    // addToCart(product);
    toast("Product added to Cart !")
  }

  const handleCompare = product => {
    // addToCompare(product);
    toast("Added to Compare list !")
  }

  const handleWishlist = product => {
    // addToWishlist(product);
    toast("Added to Wishlist !")
  }
  return (
    <>
      <div className="product-cart-wrap mb-30">
        <div className="product-img-action-wrap">
          <div className="product-img product-img-zoom">
            <Link to="/products/slug" as={`/products/${product.slug}`}>
              <span>
                <img
                  className="default-img"
                  src={`${server}/${product.images[0].img}`}
                  alt=""
                />
                <img className="hover-img" src={product.images[1].img} alt="" />
              </span>
            </Link>
          </div>
          <div className="product-action-1">
            <a
              aria-label="Quick view"
              className="action-btn hover-up"
              data-bs-toggle="modal"
              onClick={e => openQuickView(product)}
            >
              <i className="fi-rs-eye"></i>
            </a>
            <a
              aria-label="Add To Wishlist"
              className="action-btn hover-up"
              onClick={e => handleWishlist(product)}
            >
              <i className="fi-rs-heart"></i>
            </a>
            <a
              aria-label="Compare"
              className="action-btn hover-up"
              onClick={e => handleCompare(product)}
            >
              <i className="fi-rs-shuffle"></i>
            </a>
          </div>

          <div className="product-badges product-badges-position product-badges-mrg">
            {product.trending && <span className="hot">Hot</span>}
            {product.created && <span className="new">New</span>}
            {product.totalSell > 100 && <span className="best">Best Sell</span>}
            {product.discount.isActive && <span className="sale">Sale</span>}
            {product.discount.percentage >= 5 && (
              <span className="hot">{product.discount.percentage}%</span>
            )}
          </div>
        </div>
        <div className="product-content-wrap">
          <div className="product-category">
            <Link to="/products">
              <span>{product.brand}</span>
            </Link>
          </div>
          <h2>
            <Link to="/products/slug" as={`/products/${product.slug}`}>
              <span>{product.title}</span>
            </Link>
          </h2>

          <div className="product-rate-cover">
            <div className="product-rate d-inline-block">
              <div className="product-rating" style={{ width: "90%" }}></div>
            </div>
            <span className="font-small ml-5 text-muted">
              {" "}
              ({product.ratingScore})
            </span>
          </div>

          <div>
            <span className="font-small text-muted">
              By{" "}
              <Link to="/vendor/1">
                <span>NestFood</span>
              </Link>
            </span>
          </div>

          <div className="product-card-bottom">
            <div className="product-price">
              <span>${product.price} </span>
              <span className="old-price">
                {product.oldPrice && `$ ${product.oldPrice}`}
              </span>
            </div>
            <div className="add-cart">
              <a className="add" onClick={e => handleCart(product)}>
                <i className="fi-rs-shopping-cart mr-5"></i> Add
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const mapDispatchToProps = {
  //   addToCart,
  //   addToCompare,
  //   addToWishlist,
  //   openQuickView,
}

export default connect(null, mapDispatchToProps)(SingleProduct)

SingleProduct.propTypes = {
  product: PropTypes.any,
  addToCart: PropTypes.any,
  addToCompare: PropTypes.any,
  addToWishlist: PropTypes.any,
  openQuickView: PropTypes.any,
}
