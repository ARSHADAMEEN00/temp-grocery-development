import React, { useState } from "react"
import { Col, Container, Row } from "reactstrap"
import { MetaTags } from "react-meta-tags"
import { Card, CardBody, Media, Spinner } from "reactstrap"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import PropTypes from "prop-types"
import { useEffect } from "react"

//actions
import { deleteProduct, getProductDetail } from "store/actions"

//components
import Breadcrumbs from "../../../components/Common/Breadcrumb"
import ItemList from "./ItemList"
import DeleteModal from "components/Common/DeleteModal"
import { map } from "lodash"

const ProductDetails = ({ history }) => {
  const dispatch = useDispatch()
  const params = useParams()
  const [roleHandle, setroleHandle] = useState(false)

  const { productDetail, loading } = useSelector(state => ({
    productDetail: state.Products.productDetail,
    loading: state.Products.loading,
  }))

  const [isOpen, setIsOpen] = useState(false)

  const handleDelete = () => {
    setIsOpen(true)
  }

  const handleDeleteEvent = () => {
    dispatch(deleteProduct(productDetail.id, history))
    setIsOpen(false)
    // history.push("/products")
  }

  useEffect(() => {
    dispatch(getProductDetail(params.id))
  }, [])

  const Role = sessionStorage.getItem("role")

  useEffect(() => {
    if (Role == "admin") {
      setroleHandle(true)
    }
    if (Role == "productionmanager") {
      setroleHandle(true)
    }
  }, [roleHandle])

  const discription = productDetail?.productdetail?.filter(
    item => item?.is_description == true
  )
  const NotDiscription = productDetail?.productdetail?.filter(
    item => item?.is_description == false
  )

  const ProductPrice = parseInt(productDetail?.cost)

  const ProductMRP = (ProductPrice * productDetail?.profit) / 100 + ProductPrice

  const handleProductCost = () => {
    if (Role === "admin" || Role === "generalmanager") {
      return true
    }
  }

  return (
    <>
      <DeleteModal
        show={isOpen}
        onCloseClick={() => setIsOpen(false)}
        onDeleteClick={handleDeleteEvent}
      />
      <MetaTags>
        <title>Product | Indtech </title>
      </MetaTags>

      <div className="page-content">
        <Breadcrumbs title="Products" breadcrumbItem="Product" />
        <Container fluid>
          <div className="container-fluid">
            <Row>
              <Col>
                <Card>
                  <CardBody>
                    {loading ? (
                      <Spinner type="grow" color="gray" />
                    ) : (
                      <>
                        <Media>
                          <Col md={{ size: 7, offset: 0 }} xs="9">
                            <div>
                              <img
                                src={productDetail?.image}
                                alt=""
                                id="expandedImg1"
                                className="img-fluid mx-auto d-block"
                              />
                            </div>
                          </Col>
                        </Media>

                        <div className="text-muted mt-4">
                          <Media className="overflow-hidden" body>
                            <h4
                              className="text-truncate font-size-15 mt-3"
                              style={{ fontWeight: 900 }}
                            >
                              Procuct Code : {productDetail?.product_code}
                            </h4>
                            <h5 className="text-truncate font-size-15 mt-3">
                              {productDetail?.name}
                            </h5>
                            <p className="text-muted">
                              {productDetail?.unit_type}
                            </p>
                          </Media>
                          {handleProductCost() === true ? (
                            <p>
                              <i className="mdi mdi-chevron-right text-primary me-1" />
                              Cost :
                              <span className="text-info mx-2 font-size-17">
                                <i className="bx bx-rupee" />
                                {productDetail?.cost}
                              </span>
                            </p>
                          ) : (
                            <p>
                              <i className="mdi mdi-chevron-right text-primary me-1" />
                              MRP :
                              <span className="text-info mx-2 font-size-17">
                                <i className="bx bx-rupee" />
                                {ProductMRP}
                              </span>
                            </p>
                          )}

                          {discription?.length > 0 &&
                            map(discription, (detail, key) => (
                              <p key={key}>{detail.title}</p>
                            ))}
                          {NotDiscription?.length > 0 &&
                            map(NotDiscription, (detail, key) => (
                              <div key={key}>
                                <p className="text-muted">
                                  <i className="fa fa-caret-right  font-size-16 align-middle text-primary me-2"></i>
                                  {detail.title}
                                </p>
                              </div>
                            ))}
                        </div>
                      </>
                    )}

                    {roleHandle && (
                      <Row className="task-dates">
                        <Col sm="4" xs="6">
                          <div className="mt-4">
                            <Link
                              to={`/product/update/${productDetail?.id}`}
                              className={`btn btn-secondary ${
                                loading && "disabled"
                              } btn-m`}
                            >
                              Edit{" "}
                              <i className="mdi mdi-arrow-right ms-1 bx-fade-right" />
                            </Link>
                          </div>
                        </Col>
                        <Col sm="4" xs="6"></Col>
                        <Col sm="4" xs="6">
                          <div className="mt-4">
                            <Link
                              style={{ opacity: 0.8 }}
                              to="#"
                              className={`btn btn-outline-light ${
                                loading && "disabled"
                              }  btn-m`}
                              onClick={handleDelete}
                            >
                              Remove
                              <i className="fas fa-trash text-danger ms-1 bx-tada-hover"></i>
                            </Link>
                          </div>
                        </Col>
                      </Row>
                    )}
                    {Role == "dealer" && (
                      <Row>
                        <Col sm="4" xs="6"></Col>
                        <Col sm="4" xs="6"></Col>

                        <Col sm="4" xs="6">
                          <div className="mt-4">
                            <Link
                              style={{ opacity: 0.8 }}
                              to="/order/create"
                              className={`btn text-light bg-success ${
                                loading && "disabled"
                              }  btn-m`}
                              onClick={handleDelete}
                            >
                              Order Now
                            </Link>
                          </div>
                        </Col>
                      </Row>
                    )}
                  </CardBody>
                </Card>
              </Col>

              <Col lg="4" className="overflow-div">
                {Role === "salesman" ? <></> : <ItemList />}
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  )
}

export default ProductDetails

ProductDetails.propTypes = {
  history: PropTypes.object,
}
