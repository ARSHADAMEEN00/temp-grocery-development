import React, { useEffect, useState } from "react"
import ProductDetails from "../../components/ecommerce/ProductDetails"
import Layout from "../../components/layout/Layout"
import { server } from "../../config/index"
import { findProductIndex } from "../../util/util"
import PropTypes from "prop-types"
import { useParams } from "react-router-dom"

const ProductId = () => {
  const [product, setProduct] = useState()

  const params = useParams()

  const fetchProd = async () => {
    const request = await fetch(`${server}/static/product.json`)

    const data = await request.json()
    const index = findProductIndex(data, params.id)

    setProduct(data[index])
  }

  useEffect(() => {
    fetchProd()
  }, [])

  return (
    <>
      <Layout parent="Home" sub="Shop" subChild={product?.title}>
        <div className="container">
          {product?.slug ? <ProductDetails product={product} /> : ""}
        </div>
      </Layout>
    </>
  )
}

// ProductId.getInitialProps = async params => {
//   const request = await fetch(`${server}/static/product.json`)

//   const data = await request.json()
//   const index = findProductIndex(data, params.query.slug)

//   return { product: data[index] }
// }

export default ProductId

ProductId.propTypes = {
  product: PropTypes.any,
}
