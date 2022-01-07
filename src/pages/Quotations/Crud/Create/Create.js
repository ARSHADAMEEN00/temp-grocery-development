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
import { getClients, createQuatation, getProducts, getQProductPrice } from "store/actions"

import Breadcrumbs from "../../../../components/Common/Breadcrumb"
import moment from "moment"

const CreateQuotations = ({ history }) => {
  const dispatch = useDispatch()
  //redux state
  const { loading, quotationLaoding, clients, products } = useSelector(state => ({
    loading: state.StoreItems.loading,
    quotationLaoding: state.Orders.loading,
    clients: state.Clients.clients,
    products: state.Products.products,

  }))
  const [selectedProduct, setSelectedProduct] = useState("Search a product")
  const [selectedClient, setSelectedClient] = useState("Search a Client")
  const [searchText, setSearchText] = useState("")
  const [searchClientText, setSearchClientText] = useState("")
  const [quotationitems, setQuotationitems] = useState([])
  const [rawData, setRawData] = useState({
    client: "",
    date: "",
    quotationitem: [],
  })

  console.log("sended:", { client: rawData.client, date: rawData.date, quotationitems });


  useEffect(() => {
    dispatch(getProducts(searchText, ""))
    dispatch(getClients(searchClientText, ""))
  }, [dispatch, searchClientText])

  const onAddFormRow = () => {
    const modifiedRows = [...quotationitems]
    modifiedRows.push({
      id: modifiedRows.length + 1,
      ...rawData.quotationitem,
    })
    setQuotationitems(modifiedRows)
  }

  const onDeleteFormRow = id => {
    if (id !== 0) {
      var modifiedRows = [...quotationitems]
      modifiedRows = modifiedRows.filter(x => x["id"] !== id)
      setQuotationitems(modifiedRows)
    }
  }
  // quotationitems
  const onSubmitQuotation = () => {
    dispatch(createQuatation({ client: rawData.client, quotationitems }, history))
  }

  //setore item from and search
  function handlerFinalValue(event) {
    dispatch(getQProductPrice(event.value))
    setSelectedProduct(event.label)
    setRawData({
      ...rawData,
      quotationitem: {
        ["product"]: event.value,
        ["productName"]: event.label,
      },
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

  function handlerClientFinalValue(event) {
    setSelectedClient(event.label)
    setRawData({
      ...rawData,
      ["client"]: event.value,
    })
  }
  const optionGroup2 = [
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

  const Role = sessionStorage.getItem("role")

  const disabledBtn = () => {
    if (rawData?.orderitem?.product && rawData.orderitem.quantity && rawData.client) {
      return true
    } else {
      return false
    }
  }

  return (
    <>
      <MetaTags>
        <title>Quotation | Indtech </title>
      </MetaTags>

      <div className="page-content">
        <Breadcrumbs title="Quotation" breadcrumbItem="Create Quotation" />

        <Container fluid>
          <div className="container-fluid">
            {/* uploading */}
            <Row>
              <Col lg={quotationitems.length > 0 ? "6" : "12"}>
                <Card>
                  <CardBody>
                    <CardTitle className="h4 mb-4">Add Quotation</CardTitle>

                    <Form className="repeater" encType="multipart/form-data">
                      <div>
                        <Row>
                          <Col className="mb-3">
                            <Label>Date</Label>
                            <input
                              type="date"
                              className="form-control mt-1 mt-lg-0"
                              id="resume"
                              requied="true"
                              min={1}
                              value={rawData.date}
                              onChange={e => setRawData({
                                ...rawData,
                                date: e.target.value
                              })
                              }
                            />
                          </Col>

                          {Role == "client" ? (
                            <></>
                          ) : (

                            <Col lg={12} className="mb-3">
                              <FormGroup className="mb-3">
                                <Label>Client</Label>

                                <div className="col-md-12"></div>
                                <div className="mb-3 ajax-select mt-1 mt-lg-0 select2-container">
                                  <Select
                                    onInputChange={handleClientEnters}
                                    value={selectedClient}
                                    placeholder={selectedClient}
                                    onChange={handlerClientFinalValue}
                                    options={optionGroup2}
                                    classNamePrefix="select2-selection"
                                    isLoading={true}
                                    requied
                                  />
                                </div>
                              </FormGroup>
                            </Col>
                          )}

                          <Col lg={6} md={6} sm={12} className="mb-3">
                            <FormGroup className="mb-3">
                              <Label>Products</Label>
                              <div className="col-md-12"></div>
                              <div className="ajax-select mt-1 mt-lg-0 select2-container">
                                <Select
                                  onInputChange={handleEnters}
                                  value={selectedProduct}
                                  placeholder={selectedProduct}
                                  onChange={handlerFinalValue}
                                  options={optionGroup1}
                                  classNamePrefix="select2-selection"
                                  isLoading={true}
                                  requied

                                />
                              </div>
                            </FormGroup>
                          </Col>
                          <Col lg={6} md={6} sm={12} className="">
                            <label htmlFor="resume">Quantity</label>
                            <input
                              type="number"
                              className="form-control mt-1 mt-lg-0"
                              id="resume"
                              requied="true"
                              min={1}
                              value={rawData?.quantity}
                              onChange={e =>
                                setRawData({
                                  ...rawData,
                                  quotationitem: {
                                    ...rawData.quotationitem,
                                    ["quantity"]: e.target.value,
                                  },
                                })
                              }
                            />
                          </Col>
                          <Col
                            lg={12}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "flex-end",
                            }}
                          >
                            <input
                              type="button"

                              className={`btn btn-dark mr-lg-0 ${disabledBtn() == false && "disabled"}`}
                              value="Add to Quotation"
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
              {quotationitems?.length > 0 && (
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
                            {map(quotationitems, (item, index) => (
                              <Row key={index}>
                                <Row className="text-muted mt-4">
                                  <Col lg={7} md={7}>
                                    <p>
                                      <i className="mdi mdi-chevron-right text-primary me-1" />
                                      Product : {item?.productName || ""}
                                    </p>
                                  </Col>
                                  <Col lg={3} md={3}>
                                    <p>Quantity : {item?.quantity || ""}</p>
                                  </Col>

                                  <Col
                                    lg={2}
                                    md={2}
                                    className="align-self-start"
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
                                  onClick={onSubmitQuotation}
                                >
                                  Confirm Quotation
                                  {quotationLaoding ? (
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

export default CreateQuotations

CreateQuotations.propTypes = {
  history: PropTypes.object,
}
