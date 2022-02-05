import React, { Fragment, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { map } from "lodash"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"
import { MetaTags } from "react-meta-tags"
import { Alert, Badge, Container, Media, Table } from "reactstrap"
import {
  Row,
  Col,
  Card,
  CardBody,
  Form,
  Label,
  CardTitle,
  FormGroup,
} from "reactstrap"
import Select from "react-select"

//actions
import {
  createOrder,
  getClients,
  getProducts,
  getQProductPrice,
  getQuotationClientId,
  getQuotations,
} from "store/actions"

import Breadcrumbs from "../../../../components/Common/Breadcrumb"
import CreateClientModal from "./CreateClientModal"

const CreateOrder = ({ history }) => {
  const dispatch = useDispatch()
  //redux state
  const {
    products,
    orderLoading,
    clients,
    quotation,
    QProductPrice,
    QProductDetail,
    QclientDetails,
    createOrdererror,
  } = useSelector(state => ({
    products: state.Products.products,
    orderLoading: state.Orders.loading,
    clients: state.Clients.clients,
    quotation: state.Orders.quotation,
    QProductPrice: state.Orders.QProductPrice.cost,
    QProductDetail: state.Orders.QProductPrice,
    QclientDetails: state.Orders.QclientDetails,
    createOrdererror: state.Orders.createOrdererror,
  }))

  const [selectedOrder, setselectedOrder] = useState("Search a Product")
  const [selectedClient, setSelectedClient] = useState("Search a Client")
  const [selectedQuotation, setSelectedQuotation] = useState(
    "Search a Quotation Id"
  )
  const [searchClientText, setSearchClientText] = useState("")
  const [searchText, setSearchText] = useState("")
  const [searchQuotationText, setSearchQuotationText] = useState("")
  const [orderitem, setNewOrders] = useState([])
  const [percentage, setPercentage] = useState(0)
  const [qty, setQty] = useState(1)
  const [rawData, setRawData] = useState({
    client: "",
    start_date: "",
    end_date: "",
    quotation_id: null,
    duration: "",
    orderitem: [
      {
        product: "",
        quantity: "",
        total_price: "",
        selling_price: "",
        profit_percentage: "",
        cost: "",
      },
    ],
  })

  const ProductPrice = parseInt(QProductPrice)

  const sellingPrice = (ProductPrice * percentage) / 100 + ProductPrice

  const totelPriceCalc = sellingPrice * qty

  useEffect(() => {
    setRawData({
      ...rawData,
      orderitem: {
        ...rawData.orderitem,
        ["total_price"]: totelPriceCalc,
        ["selling_price"]: sellingPrice,
        ["profit_percentage"]: percentage,
        ["cost"]: QProductPrice,
        ["quantity"]: qty,
      },
    })
  }, [totelPriceCalc, sellingPrice])

  useEffect(() => {
    setPercentage(QProductDetail?.profit)
  }, [QProductDetail?.profit])

  useEffect(() => {
    dispatch(getProducts(searchText))
    dispatch(getClients(searchClientText, ""))
    dispatch(getQuotations(searchQuotationText, ""))
  }, [searchText, dispatch, searchClientText, searchQuotationText])

  useEffect(() => {
    setSelectedClient(QclientDetails?.client_name)
    setRawData({
      ...rawData,
      ["client"]: QclientDetails?.client,
    })
  }, [QclientDetails.client_name])

  const onAddFormRow = async () => {
    const modifiedRows = [...orderitem]
    modifiedRows.push({
      id: modifiedRows.length + 1,
      ...rawData.orderitem,
    })
    setNewOrders(modifiedRows)

    setPercentage(0)
    setselectedOrder("Search a Product")
    setQty(1)
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

  //setore item from and search
  function handlerFinalValue(event) {
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

  const quotationOptions = [
    {
      options: quotation?.results?.map((result, index) => ({
        key: index,
        label: result.auto_id,
        value: result.auto_id,
        quotationId: result.id,
      })),
    },
  ]

  //quotation
  function handlerQuotationFinalValue(event) {
    dispatch(getQuotationClientId(event.quotationId))
    setSelectedQuotation(event.label)
    setRawData({
      ...rawData,
      ["quotation_id"]: event.value,
    })
  }

  const handleQuotationEnters = textEntered => {
    setSearchQuotationText(textEntered)
  }

  const Role = sessionStorage.getItem("role")

  const [isOpen, setIsOpen] = useState(false)

  const handleCreateCLient = () => {
    setIsOpen(true)
  }

  const handleQty = e => {
    setQty(e.target.value),
      setRawData({
        ...rawData,
        orderitem: {
          ...rawData.orderitem,
          ["quantity"]: e.target.value,
        },
      })
  }

  const subTotel = orderitem?.reduce(
    (accumulator, current) => accumulator + current.total_price,
    0
  )

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
                  <Row>
                    <Col lg={QclientDetails?.client_name ? 8 : 12}>
                      <Card>
                        <CardBody>
                          <Row>
                            <Col lg={12} className="mb-3">
                              <CardTitle className="h4 mb-4">
                                Add Order
                              </CardTitle>
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
                            ) : (
                              <>
                                <Col
                                  lg={9}
                                  md={8}
                                  sm={6}
                                  xs={12}
                                  className="mb-3"
                                >
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
                                <Col
                                  lg={3}
                                  md={4}
                                  sm={6}
                                  xs={12}
                                  className="m-0 createClintBtnCont "
                                >
                                  <button
                                    type="button"
                                    className="btn btn-light text-info"
                                    onClick={handleCreateCLient}
                                  >
                                    Create New
                                  </button>
                                </Col>
                              </>
                            )}
                            <Col lg={4} className="mb-3">
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
                            <Col lg={4} className="mb-3">
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

                            <Col lg={4} className="mb-3">
                              <label htmlFor="Duration">
                                Duration (In Days)
                              </label>
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
                    </Col>
                    {QclientDetails?.client_name && (
                      <Col lg={4}>
                        <Card>
                          <CardBody className="bg">
                            <div className="media">
                              <div className="media-body">
                                <Media>
                                  <div className="media-body">
                                    <div className="text-muted">
                                      <h6 className="mb-1">
                                        {QclientDetails?.client_name}
                                      </h6>
                                      <p className="mb-0">
                                        {QclientDetails?.auto_id}
                                      </p>
                                    </div>
                                  </div>
                                </Media>

                                <hr />
                                <Row>
                                  <Col>
                                    <div>
                                      <p className="text-muted text-truncate mb-3">
                                        Quotation Items :
                                      </p>

                                      {map(
                                        QclientDetails?.quotationitem,
                                        (item, key) => (
                                          <Fragment key={key}>
                                            <h6 className="mb-0 d-flex">
                                              <i className="mdi mdi-circle align-middle font-size-10 me-2 text-warning"></i>
                                              <span>{item.product_name}</span>
                                            </h6>
                                            <p className="pt-2 mb-0 text-muted mx-3">
                                              cost : {item.cost}
                                            </p>

                                            <p className="pt-2 mb-0 text-muted mx-3">
                                              Profit : {item.profit}%
                                            </p>
                                            <p className="pt-2 mb-4 text-muted mx-3">
                                              Price : {item.price}
                                            </p>
                                          </Fragment>
                                        )
                                      )}
                                    </div>
                                  </Col>
                                </Row>
                              </div>
                            </div>
                          </CardBody>
                        </Card>
                      </Col>
                    )}
                  </Row>

                  <Card>
                    <CardBody>
                      <div>
                        <Row>
                          <Col lg={6} md={6} sm={12} className="mb-3">
                            <FormGroup className="mb-3">
                              <Label>OrderItem </Label>

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
                            </FormGroup>
                          </Col>
                          {selectedOrder === "Search a Product" ? (
                            <></>
                          ) : (
                            <Col lg={2} md={6} sm={12} className="">
                              <label htmlFor="resume">Production Cost </label>
                              <input
                                type="number"
                                className="form-control mt-1 mt-lg-0 text-info"
                                id="resume"
                                requied="true"
                                min={1}
                                // defaultValue={QProductPrice}
                                // value={QProductPrice}
                                value={ProductPrice ? ProductPrice : ""}
                                readOnly
                              />
                            </Col>
                          )}

                          <Col lg={2} md={6} sm={12} className="">
                            <label htmlFor="resume">Profit %</label>
                            <input
                              type="number"
                              className="form-control mt-1 mt-lg-0"
                              id="resume"
                              requied="true"
                              min={1}
                              value={
                                QProductDetail?.profit
                                  ? QProductDetail?.profit
                                  : percentage
                              }
                              // defaultValue={percentage}
                              onChange={e => setPercentage(e.target.value)}
                            />
                          </Col>
                          <Col lg={2} md={6} sm={12} className="mb-3">
                            <label htmlFor="resume">Quantity</label>
                            <input
                              type="number"
                              className="form-control"
                              id="resume"
                              requied="true"
                              min={1}
                              value={qty}
                              onChange={handleQty}
                            />
                          </Col>

                          <Col lg={8} md={8}></Col>
                          <Col lg={4} md={4}>
                            {selectedOrder === "Search a Product" ? (
                              <></>
                            ) : (
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  width: "fit-content",
                                  marginLeft: "auto",
                                }}
                              >
                                {sellingPrice && (
                                  <span className=" text-muted">
                                    Selling Price :
                                    <Badge
                                      className={
                                        "font-size-14 p-2 mx-3 badge-soft-info"
                                      }
                                      pill
                                    >
                                      <i className="bx bx-rupee text-info font-size-14" />{" "}
                                      {sellingPrice}
                                    </Badge>
                                  </span>
                                )}

                                {totelPriceCalc ? (
                                  <>
                                    <span
                                      className="mt-2 text-muted text-end"
                                      style={{ fontWeight: "700" }}
                                    >
                                      Sub Total :
                                      <Badge
                                        className={
                                          "font-size-14 p-2 mx-3 badge-soft-success"
                                        }
                                        pill
                                      >
                                        <i className="bx bx-rupee text-success font-size-14" />{" "}
                                        {totelPriceCalc}
                                      </Badge>
                                    </span>
                                    <p className="text-end text-muted p-3">
                                      (sellingPrice * qty)
                                    </p>
                                  </>
                                ) : (
                                  <></>
                                )}
                              </div>
                            )}
                          </Col>
                          <Col lg={4} md={4}></Col>
                          <Col
                            lg={8}
                            md={8}
                            sm={12}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "flex-end",
                            }}
                            className="mt-4"
                          >
                            <input
                              type="button"
                              className="btn btn-light mr-lg-0 "
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
                    </CardBody>
                  </Card>
                </Form>
              </Col>
              {orderitem.length > 0 && (
                <Col lg={12}>
                  <Card>
                    <CardBody>
                      <CardTitle className="mb-4">Orders </CardTitle>

                      <div className="table-responsive">
                        <Table className="table align-middle table-nowrap">
                          <thead className="table-light">
                            <tr>
                              <th>Product</th>
                              <th>Quantity</th>
                              <th>Price</th>
                              <th>Remove</th>
                            </tr>
                          </thead>
                          <tbody>
                            {map(orderitem, (item, index) => (
                              <tr key={index}>
                                <td>
                                  <h5 className="font-size-13 m-0">
                                    <Link
                                      to={`/orderItem/${item?.id}`}
                                      className="text-dark"
                                    >
                                      {item.productName}
                                    </Link>
                                  </h5>
                                </td>
                                <td>
                                  <h5
                                    className="font-size-13 m-0"
                                    style={{ whiteSpace: "break-spaces" }}
                                  >
                                    <Link to="" className="text-dark">
                                      {item?.quantity}
                                    </Link>
                                  </h5>
                                </td>
                                <td>
                                  <div className="d-flex">
                                    <Link to="#" className="font-size-11 me-1">
                                      <span className="font-size-14 text-info ">
                                        {" "}
                                        <i className="bx bx-rupee text-info font-size-14" />
                                        {item?.total_price || ""}
                                      </span>
                                    </Link>
                                  </div>
                                </td>

                                <td>
                                  <h5 className="font-size-13 m-0">
                                    <Link to="#" className="text-dark">
                                      <i
                                        className="fa fa-trash mt-1 mr-lg-0 mb-4 text-danger"
                                        onClick={() => onDeleteFormRow(item.id)}
                                      ></i>
                                    </Link>
                                  </h5>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </div>
                      <div>
                        <Col sm="12">
                          <div className="text-sm-end mt-2">
                            <span
                              className="mt-2 text-muted font-size-16"
                              style={{ fontWeight: "700" }}
                            >
                              Sub Total :
                              <Badge
                                className={
                                  "font-size-16 p-2 mx-3 badge-soft-light text-dark"
                                }
                                pill
                              >
                                <i className="bx bx-rupee text-dark font-size-16" />{" "}
                                {subTotel}
                              </Badge>
                            </span>
                          </div>
                        </Col>
                      </div>
                      <div>
                        <Col sm="12" lg={12}>
                          <div className="text-sm-end mt-2 width-fit">
                            <Link
                              to="#"
                              className="btn btn-success"
                              onClick={onSubmitOrder}
                              style={{ width: "100%" }}
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
                            {createOrdererror?.response ? (
                              <Alert
                                color="light"
                                className="text-danger mt-2 w-auto "
                              >
                                {createOrdererror?.response}
                              </Alert>
                            ) : null}
                          </div>
                        </Col>
                      </div>
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
