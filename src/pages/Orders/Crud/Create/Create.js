import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { map } from "lodash"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"
import { MetaTags } from "react-meta-tags"
import { Badge, Container } from "reactstrap"
import {
  Row,
  Col,
  Card,
  CardBody,
  Form,
  Label,
  CardTitle,
  FormGroup,
  Spinner
} from "reactstrap"
import Select from "react-select"

//actions
import { createOrder, getClients, getProducts, getQProductPrice, getQuotations } from "store/actions"

import Breadcrumbs from "../../../../components/Common/Breadcrumb"
import CreateClientModal from "./CreateClientModal"

const CreateOrder = ({ history }) => {
  const dispatch = useDispatch()
  //redux state
  const { products, loading, orderLoading, clients, quotation,QProductPrice } = useSelector(state => ({
    products: state.Products.products,
    loading: state.StoreItems.loading,
    orderLoading: state.Orders.loading,
    clients: state.Clients.clients,
    quotation: state.Orders.quotation,
    QProductPrice: state.Orders.QProductPrice.cost,


  }))
  const [selectedOrder, setselectedOrder] = useState("Search a Product")
  const [selectedClient, setSelectedClient] = useState("Search a Client")
  const [selectedQuotation, setSelectedQuotation] = useState("Search a Quotation Id")
  const [searchClientText, setSearchClientText] = useState("")
  const [searchText, setSearchText] = useState("")
  const [searchQuotationText, setSearchQuotationText] = useState("")
  const [orderitem, setNewOrders] = useState([])
  const [percentage, setPercentage] = useState(0)
  const [qty, setQty] = useState(1);
  const [rawData, setRawData] = useState({
    client: "",
    start_date: "",
    end_date: "",
    quotation_id: null,
    duration: "",
    orderitem: [],
  })

  const ProductPrice = parseInt(QProductPrice)

  const totelPriceCalc = (ProductPrice * percentage / 100) + ProductPrice * qty

  useEffect(() => {
      setRawData({
        ...rawData,
        orderitem: {
          ...rawData.orderitem,
          ["price"]: totelPriceCalc,
        },
      })
  }, [totelPriceCalc]);
  


  useEffect(() => {
    dispatch(getProducts(searchText))
    dispatch(getClients(searchClientText, ""))
    dispatch(getQuotations(searchQuotationText, ""))
  }, [searchText, dispatch, searchClientText, searchQuotationText])

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
    dispatch(createOrder({ ...rawData, orderitem: orderitem }, history))
  }

  console.log({ ...rawData, orderitem: orderitem });

  //setore item from and search
  function handlerFinalValue(event) {
    console.log(event);
    dispatch(getQProductPrice(event.value))
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
        label: result.name,
        value: result.id,
      })),
    },
  ]

  const handleClientEnters = textEntered => {
    setSearchClientText(textEntered)
  }


  //quotation
  function handlerQuotationFinalValue(event) {
    setSelectedQuotation(event.label)
    setRawData({
      ...rawData,
      ["quotation_id"]: event.value,

    })
  }

  const quotationOptions = [
    {
      options: quotation?.results?.map((result, index) => ({
        key: index,
        label: result.auto_id,
        value: result.auto_id,
      })),
    },
  ]

  const handleQuotationEnters = textEntered => {
    setSearchQuotationText(textEntered)
  }

  const Role = sessionStorage.getItem("role")

  const [isOpen, setIsOpen] = useState(false)

  const handleCreateCLient = () => {
    setIsOpen(true)
  }

  const handleQty=(e)=>{
    setQty(e.target.value),
    setRawData({
      ...rawData,
      orderitem: {
        ...rawData.orderitem,
        ["quantity"]: e.target.value,
      },
    })
  }

  return (
    <>
      <CreateClientModal
        show={isOpen}
        onCloseClick={() => setIsOpen(false)}
        onDeleteClick={handleCreateCLient}
      />
      <MetaTags>
        <title>Order | Indtech </title>
      </MetaTags>

      <div className="page-content">
        <Breadcrumbs title="Orders" breadcrumbItem="Create Order" />

        <Container fluid>
          <div className="container-fluid">
            {/* uploading */}
            <Row>
              <Col lg={12}>
                    <Form className="repeater" encType="multipart/form-data">
                <Card>
                  <CardBody>
                    <CardTitle className="h4 mb-4">Add Order</CardTitle>
                        <Row>
                          <Col lg={12} className="mb-3">
                            <FormGroup className="mb-3">
                              <Label>Quotation</Label>

                              <div className="col-md-12"></div>
                              <div className="mb-3 ajax-select mt-3 mt-lg-0 select2-container">
                                <Select
                                  onInputChange={handleQuotationEnters}
                                  value={selectedQuotation}
                                  placeholder={selectedQuotation}
                                  onChange={handlerQuotationFinalValue}
                                  options={quotationOptions}
                                  classNamePrefix="select2-selection"
                                  isLoading={true}
                                />
                              </div>
                            </FormGroup>
                          </Col>
                          {Role == "client" ? (
                            <></>
                          ) : (<>
                            <Col lg={9} md={8} sm={6} xs={12} className="mb-3 createClintBtn"  >
                              <FormGroup className="mb-3">
                                <Label>Select Client / Create Now </Label>

                                <div className="ajax-select mt-3 mt-lg-0 select2-container">
                                  <Select
                                    onInputChange={handleClientEnters}
                                    value={selectedClient}
                                    placeholder={selectedClient}
                                    onChange={handlerClientFinalValue}
                                    options={clientOptions}
                                    classNamePrefix="select2-selection"
                                    isLoading={true}
                                    className="custome_select_rad"
                                  />
                                </div>
                              </FormGroup>
                            </Col>
                            <Col lg={3} md={4} sm={6} xs={12} className="m-0 createClintBtnCont " >
                              <button type="button" className="btn btn-light btn-label  custom_border_rad text-info"
                                onClick={handleCreateCLient} >
                                Create Client<i className="bx bx-user-plus label-icon text-info font-size-24"></i></button>
                            </Col>
                          </>
                          )}
                          <Col lg={6} className="mb-3">
                            <label htmlFor="date1">Start Date</label>
                            <input
                              type="date"
                              className="form-control"
                              id="date1"
                              requied="true"
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
                              requied="true"
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
                            <label htmlFor="Duration">Duration</label>
                            <input
                              type="number"
                              className="form-control"
                              id="Duration"
                              requied="true"
                              min={1}
                              value={rawData.duration}
                              onChange={e =>
                                setRawData({
                                  ...rawData,
                                  ["duration"]: e.target.value,
                                })
                              }
                            />
                          </Col>
                      
                          
                        </Row>
                        </CardBody>
                </Card>
                <Card >
                <CardBody >
                        <Row>
                          <Col lg={6} md={6} sm={12} className="mb-3">
                            <FormGroup className="mb-3">
                              <Label>Products</Label>

                              <div className="col-md-12"></div>
                              <div className="mb-3 ajax-select mt-lg-0 select2-container">
                                <Select
                                  onInputChange={handleEnters}
                                  value={selectedOrder}
                                  placeholder={selectedOrder}
                                  onChange={handlerFinalValue}
                                  options={productOptions}
                                  classNamePrefix="select2-selection"
                                  isLoading={true}
                                  requied="true"
                                />
                              </div>
                              {QProductPrice && <span className="mt-2 text-muted">
                                Product Cost :
                                <Badge
                                  className={"font-size-14 p-2 mx-3 badge-soft-success"}
                                  pill
                                >
                                 <i className="bx bx-rupee text-success font-size-14" /> {QProductPrice}
                                </Badge>
                              </span>}

                            </FormGroup>
                          </Col>

                          <Col lg={3} md={3} sm={12} className="">
                            <label htmlFor="resume">Profit Percentage</label>
                            <input
                              type="number"
                              className="form-control mt-1 mt-lg-0"
                              id="resume"
                              requied="true"
                              min={1}
                              value={percentage}
                              onChange={e =>
                                setPercentage(e.target.value)
                              }
                            />
                          </Col>
                          <Col lg={3} md={3} sm={12} className="mb-3">
                            <label htmlFor="resume">Quantity</label>
                            <input
                              type="number"
                              className="form-control"
                              id="resume"
                              requied="true"
                              min={1}
                              // value={rawData.quantity}
                              onChange={handleQty}
                            />
                          </Col>
                          {totelPriceCalc ? <Col lg={4} md={4} sm={12} className="">
                            <label htmlFor="resume">Total Price </label>
                            <input
                              type="number"
                              className="form-control mt-1 mt-lg-0 text-warning"
                              id="resume"
                              requied="true"
                              min={1}
                              value={totelPriceCalc}
                              onChange={e =>
                                setRawData({
                                  ...rawData,
                                  orderitem: {
                                    ...rawData.orderitem,
                                    ["price"]: e.target.value,
                                  },
                                })
                              }
                            />
                          </Col> : <></>}

                      
                          {/* <Col lg={4} className="mb-3">
                            <label htmlFor="resume">Price</label>
                            <input
                              type="number"
                              className="form-control"
                              id="resume"
                              requied="true"
                              min={1}
                              // value={rawData.quantity}
                              onChange={e =>
                                setRawData({
                                  ...rawData,
                                  orderitem: {
                                    ...rawData.orderitem,
                                    ["price"]: e.target.value,
                                  },
                                })
                              }
                            />
                          </Col> */}
                          <Col
                            lg={8}
                            md={8}
                            sm={12}
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
                  </CardBody>
                </Card>
                    </Form>
              </Col>
              {orderitem.length > 0 && (
                <Col lg={12}>
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
                                  <Col lg={2} md={5}>
                                    <p>Quantity : {item?.quantity || ""}</p>
                                  </Col>
                                  <Col lg={2} md={5}>
                                    <p >Price : <span className="font-size-14 text-info ">  <i className="bx bx-rupee text-info font-size-14" />{item?.price || ""}</span>
                                    </p>
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
