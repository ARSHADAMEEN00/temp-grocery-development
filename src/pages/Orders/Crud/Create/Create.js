import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { map } from "lodash"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"
import { MetaTags } from "react-meta-tags"
import { Container } from "reactstrap"
import {
  Row,
  Col,
  Card,
  CardBody,
  Form,
  Label,
  CardTitle,
  FormGroup,
  Spinner,
} from "reactstrap"
import Select from "react-select"

//actions
import { createOrder, getProducts } from "store/actions"

import Breadcrumbs from "../../../../components/Common/Breadcrumb"

const CreateOrder = ({ history }) => {
  const dispatch = useDispatch()
  //redux state
  const { products, loading, orderLoading } = useSelector(state => ({
    products: state.Products.products,
    loading: state.StoreItems.loading,
    orderLoading: state.Orders.loading,
  }))

  const [selectedOrder, setselectedOrder] = useState("Search a product")
  const [searchText, setSearchText] = useState("")
  const [newOrders, setNewOrders] = useState([])
  const [rawData, setRawData] = useState({
    product: "",
    quantity: "",
    productName: "",
  })

  useEffect(() => {
    dispatch(getProducts(searchText))
  }, [searchText, dispatch])

  const onAddFormRow = () => {
    const modifiedRows = [...newOrders]
    modifiedRows.push({
      id: modifiedRows.length + 1,
      ...rawData,
    })
    setNewOrders(modifiedRows)
  }

  const onDeleteFormRow = id => {
    if (id !== 0) {
      var modifiedRows = [...newOrders]
      modifiedRows = modifiedRows.filter(x => x["id"] !== id)
      setNewOrders(modifiedRows)
    }
  }

  const onSubmitOrder = () => {
    dispatch(createOrder(newOrders, history))
    setRawData("")
  }

  //setore item from and search
  function handlerFinalValue(event) {
    setselectedOrder(event.label)
    setRawData({
      ...rawData,
      ["product"]: event.value,
      ["productName"]: event.label,
    })
  }

  const optionGroup1 = [
    {
      options: products?.results?.map((result, index) => ({
        key: index,
        label: result.name,
        value: result.id,
      })),
    },
  ]

  const handleEnters = textEntered => {
    setSearchText(textEntered)
  }

  return (
    <>
      <MetaTags>
        <title>Order | Loha </title>
      </MetaTags>

      <div className="page-content">
        <Breadcrumbs title="Orders" breadcrumbItem="Create Order" />
        <Container fluid>
          <div className="container-fluid">
            {/* uploading */}
            <Row>
              <Col xl="1"></Col>
              <Col lg={10}>
                <Card>
                  <CardBody>
                    <CardTitle className="h4 mb-4">Add Order</CardTitle>

                    <Form className="repeater" encType="multipart/form-data">
                      <div>
                        <Row>
                          <Col lg={8} className="mb-3">
                            <FormGroup className="mb-3">
                              <Label>Products</Label>

                              <div className="col-md-12"></div>
                              <div className="mb-3 ajax-select mt-3 mt-lg-0 select2-container">
                                <Select
                                  onInputChange={handleEnters}
                                  value={selectedOrder}
                                  placeholder={selectedOrder}
                                  onChange={handlerFinalValue}
                                  options={optionGroup1}
                                  classNamePrefix="select2-selection"
                                  isLoading={true}
                                />
                              </div>
                            </FormGroup>
                          </Col>

                          <Col lg={3} className="mb-3">
                            <label htmlFor="resume">Quantity</label>
                            <input
                              type="number"
                              className="form-control"
                              id="resume"
                              min={1}
                              value={rawData.quantity}
                              onChange={e =>
                                setRawData({
                                  ...rawData,
                                  ["quantity"]: e.target.value,
                                })
                              }
                            />
                          </Col>
                          <Col lg={3}>
                            <input
                              type="button"
                              className="btn btn-dark mt-4 mr-lg-0 "
                              value="Add to Orders"
                              onClick={() => onAddFormRow()}
                              style={{
                                pointerEvents:
                                  rawData.product == false && "none",
                              }}
                            />
                          </Col>
                        </Row>
                      </div>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
              <Col xl="1"></Col>
            </Row>
            {newOrders.length > 0 && (
              <Row>
                <Col xl="1"></Col>
                <Col lg={10}>
                  <Card>
                    <CardBody>
                      <CardTitle className="h4 mb-4">All Orders </CardTitle>
                      {loading ? (
                        <Spinner type="grow" color="gray" />
                      ) : (
                        <Form
                          className="repeater"
                          encType="multipart/form-data"
                        >
                          <div>
                            {map(newOrders, (item, index) => (
                              <Row key={index}>
                                <Row className="text-muted mt-4">
                                  <Col lg={4} md={4}>
                                    <p>
                                      <i className="mdi mdi-chevron-right text-primary me-1" />
                                      Product : {item?.productName || ""}
                                    </p>
                                  </Col>
                                  <Col lg={3} md={4}>
                                    <p>Quantity : {item?.quantity || ""}</p>
                                  </Col>

                                  <Col
                                    lg={2}
                                    md={2}
                                    className="align-self-center m-auto"
                                  >
                                    <div
                                      className="d-grid "
                                      style={{ maxWidth: "200px" }}
                                    >
                                      <input
                                        type="button"
                                        className="btn btn-danger mt-0 mr-lg-0 mb-4"
                                        value="Remove"
                                        style={{ maxWidth: "100px" }}
                                        onClick={() => onDeleteFormRow(item.id)}
                                      />
                                    </div>
                                  </Col>
                                </Row>
                              </Row>
                            ))}
                          </div>
                          <div>
                            <Col sm="6">
                              <div className="text-sm-end">
                                <Link
                                  to="#"
                                  className="btn btn-success"
                                  onClick={onSubmitOrder}
                                >
                                  Confirm Order
                                  {orderLoading ? (
                                    <>
                                      <i className="bx bx-loader bx-spin font-size-16 align-middle me-2"></i>
                                    </>
                                  ) : (
                                    <i className="mdi mdi-truck-fast mx-2" />
                                  )}
                                </Link>
                              </div>
                            </Col>
                          </div>
                        </Form>
                      )}
                    </CardBody>
                  </Card>
                </Col>
                <Col xl="1"></Col>
              </Row>
            )}
          </div>
        </Container>
      </div>
    </>
  )
}

export default CreateOrder

CreateOrder.propTypes = {
  history: PropTypes.object,
}
