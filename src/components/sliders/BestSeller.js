import { server } from "../../config/index"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
// import { fetchByCatagory } from "../../redux/action/product";

const BestSellerSlider = () => {
  const [bestSeller, setBestSeller] = useState([])

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    // With Category
    // const allProducts = await fetchByCatagory("/static/product.json")
    const request = await fetch(`${server}/static/product.json`)
    const allProducts = await request.json()

    // Best Seller
    // const bestSellerProducts = allProducts.sort(function (a, b) {
    //   return a.totalSell > b.totalSell ? -1 : 1
    // })

    const bestSellerProducts = allProducts.sort(function (a, b) {
      return a.totalSell > b.totalSell ? -1 : 1
    })

    setBestSeller(bestSellerProducts)
  }

  return (
    <>
      {bestSeller.slice(0, 3).map((product, i) => (
        <article className="row align-items-center hover-up" key={i}>
          <figure className="col-md-4 mb-0">
            <Link to="/products/[slug]" as={`/products/${product.slug}`}>
              <a>
                <img src={`${server}/${product.images[0].img}`} alt="" />
              </a>
            </Link>
          </figure>
          <div className="col-md-8 mb-0">
            <h6>
              <Link to="/products/[slug]" as={`/products/${product.slug}`}>
                <a>{product.title}</a>
              </Link>
            </h6>
            <div className="product-rate-cover">
              <div className="product-rate d-inline-block">
                <div className="product-rating" style={{ width: "90%" }}></div>
              </div>
              <span className="font-small ml-5 text-muted"> (4.0)</span>
            </div>
            <div className="product-price">
              <span>${product.price} </span>
              <span className="old-price">
                {product.oldPrice && `$ ${product.oldPrice}`}
              </span>
            </div>
          </div>
        </article>
      ))}
    </>
  )
}

export default BestSellerSlider
