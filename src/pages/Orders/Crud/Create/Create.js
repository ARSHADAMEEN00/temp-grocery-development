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
import { createOrder, getClients, getProducts } from "store/actions"

import Breadcrumbs from "../../../../components/Common/Breadcrumb"

const CreateOrder = ({ history }) => {
  const dispatch = useDispatch()
  //redux state
  const { products, loading, orderLoading, clients } = useSelector(state => ({
    products: state.Products.products,
    loading: state.StoreItems.loading,
    orderLoading: state.Orders.loading,

    // clients: state.Clients.clients,

  }))

  const [selectedOrder, setselectedOrder] = useState("Search a Product")
  const [selectedClient, setSelectedClient] = useState("Search a Client")
  const [searchClientText, setSearchClientText] = useState("")
  const [searchText, setSearchText] = useState("")
  const [orderitem, setNewOrders] = useState([])
  const [rawData, setRawData] = useState({
    client: "",
    start_date: "",
    end_date: "",
    orderitem: [],
  })


  useEffect(() => {
    dispatch(getProducts(searchText))
    dispatch(getClients(searchClientText, ""))
  }, [searchText, dispatch, searchClientText])

  const onAddFormRow = () => {
    const modifiedRows = [...orderitem]
    modifiedRows.push({
      id: modifiedRows.length + 1,
      ...rawData.orderitem,
    })
    setNewOrders(modifiedRows)
  }

  const onDeleteFormRow = id => {
    if (id !== 0) {
      var modifiedRows = [...orderitem]
      modifiedRows = modifiedRows.filter(x => x["id"] !== id)
      setNewOrders(modifiedRows)
    }
  }
  // orderitem
  const onSubmitOrder = () => {
    dispatch(createOrder({ client: rawData.client, orderitem }, history))
  }

  //setore item from and search
  function handlerFinalValue(event) {
    setselectedOrder(event.label)
    setRawData({
      ...rawData,
      orderitem: {
        ["product"]: event.value,
        ["productName"]: event.label,
      },
    })
  }

  const productOptions = [
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

  function handlerClientFinalValue(event) {
    setSelectedClient(event.label)
    setRawData({
      ...rawData,
      ["client"]: event.value,
    })
  }
  const clientOptions = [
    {
      options: clients?.results?.map((result, index) => ({
        key: index,
        label: result.account.username,
        value: result.id,
      })),
    },
  ]

  const handleClientEnters = textEntered => {
    setSearchClientText(textEntered)
  }

  const Role = sessionStorage.getItem("role")

  return (
    <>
      <MetaTags>
        <title>Order | Indtech </title>
      </MetaTags>

      <div className="page-content">
        <Breadcrumbs title="Orders" breadcrumbItem="Create Order" />

        <Container fluid>
          <div className="container-fluid">
            {/* uploading */}
            <Row>
              <Col lg={orderitem.length > 0 ? "6" : "12"}>
                <Card>
                  <CardBody>
                    <CardTitle className="h4 mb-4">Add Order</CardTitle>

                    <Form className="repeater" encType="multipart/form-data">
                      <div>
                        <Row>
                          {Role == "client" ? (
                            <></>
                          ) : (
                            <Col lg={12} className="mb-3">
                              <FormGroup className="mb-3">
                                <Label>Client</Label>

                                <div className="col-md-12"></div>
                                <div className="mb-3 ajax-select mt-3 mt-lg-0 select2-container">
                                  <Select
                                    onInputChange={handleClientEnters}
                                    value={selectedClient}
                                    placeholder={selectedClient}
                                    onChange={handlerClientFinalValue}
                                    options={clientOptions}
                                    classNamePrefix="select2-selection"
                                    isLoading={true}
                                    requied
                                  />
                                </div>
                              </FormGroup>
                            </Col>
                          )}
                          <Col lg={6} className="mb-3">
                            <label htmlFor="date1">Start Date</label>
                            <input
                              type="date"
                              className="form-control"
                              id="date1"
                              requied
                              min={1}
                              value={rawData.start_date}
                              onChange={e =>
                                setRawData({
                                  ...rawData,
                                  ["start_date"]: e.target.value,
                                })
                              }
                            />
                          </Col>
                          <Col lg={6} className="mb-3">
                            <label htmlFor="date2">End Date</label>
                            <input
                              type="date"
                              className="form-control"
                              id="date2"
                              requied
                              min={1}
                              value={rawData.end_date}
                              onChange={e =>
                                setRawData({
                                  ...rawData,
                                  ["end_date"]: e.target.value,
                                })
                              }
                            />
                          </Col>

                          <Col lg={12} className="mb-3">
                            <FormGroup className="mb-3">
                              <Label>Products</Label>

                              <div className="col-md-12"></div>
                              <div className="mb-3 ajax-select mt-3 mt-lg-0 select2-container">
                                <Select
                                  onInputChange={handleEnters}
                                  value={selectedOrder}
                                  placeholder={selectedOrder}
                                  onChange={handlerFinalValue}
                                  options={productOptions}
                                  classNamePrefix="select2-selection"
                                  isLoading={true}
                                  requied

                                />
                              </div>
                            </FormGroup>
                          </Col>

                          <Col lg={8} className="mb-3">
                            <label htmlFor="resume">Quantity</label>
                            <input
                              type="number"
                              className="form-control"
                              id="resume"
                              requied
                              min={1}
                              value={rawData.quantity}
                              onChange={e =>
                                setRawData({
                                  ...rawData,
                                  orderitem: {
                                    ...rawData.orderitem,
                                    ["quantity"]: e.target.value,
                                  },
                                })
                              }
                            />
                          </Col>
                          <Col
                            lg={4}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "flex-end",
                            }}
                          >
                            <input
                              type="button"
                              className="btn btn-dark mr-lg-0 "
                              value="Add to Orders"
                              onClick={() => onAddFormRow()}
                              style={{
                                marginTop: "1rem",
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
              {orderitem.length > 0 && (
                <Col lg={6}>
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
                            {map(orderitem, (item, index) => (
                              <Row key={index}>
                                <Row className="text-muted mt-4">
                                  <Col lg={6} md={5}>
                                    <p>
                                      <i className="mdi mdi-chevron-right text-primary me-1" />
                                      Product : {item?.productName || ""}
                                    </p>
                                  </Col>
                                  <Col lg={4} md={5}>
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
                                      <i
                                        className="fa fa-trash mt-1 mr-lg-0 mb-4 text-danger"
                                        onClick={() => onDeleteFormRow(item.id)}
                                      ></i>
                                    </div>
                                  </Col>
                                </Row>
                              </Row>
                            ))}
                          </div>
                          <div>
                            <Col sm="12">
                              <div className="text-sm-end mt-2">
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
              )}
            </Row>
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
