import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { map } from "lodash"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"
import { MetaTags } from "react-meta-tags"
import { Badge, Container, Nav, NavItem, TabContent, TabPane, NavLink } from "reactstrap"
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
import classnames from "classnames"

//actions
import {
  getClients,
  createQuatation,
  getProducts,
  getQProductPrice,
  getQuotationDetail,
  getBankDetails,
} from "store/actions"

import Breadcrumbs from "../../../../components/Common/Breadcrumb"

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import FormEditors from "./Editor"
import { Button } from "bootstrap"
import { Notification } from "components/Common/Notification"

const CreateQuotations = ({ history }) => {
  const dispatch = useDispatch()
  //redux state
  const {
    loading,
    quotationLoading,
    clients,
    products,
    QProductPrice,
    quotationCurd,
    bankDetailsData
  } = useSelector(state => ({
    loading: state.StoreItems.loading,
    quotationLoading: state.Orders.quotationLoading,
    clients: state.Clients.clients,
    products: state.Products.products,
    QProductPrice: state.Orders.QProductPrice,
    quotationCurd: state.Orders.quotationCurd,
    bankDetailsData: state.Orders.bankDetails
  }))
  const [selectedProduct, setSelectedProduct] = useState("Search a product")
  const [selectedClient, setSelectedClient] = useState("Search a Client")
  const [searchText, setSearchText] = useState("")
  const [searchClientText, setSearchClientText] = useState("")
  const [quotationitem, setQuotationitems] = useState([])
  const [percentage, setPercentage] = useState(0)
  const [rawData, setRawData] = useState({
    client: "",
    quotationitem: [],
  })

  //EDITOR
  const [letter_head, setLetterHead] = useState(`<p><strong>Dear sir,</strong></p><p></p>`)
  const [bank_details, setBankDetails] = useState(bankDetailsData?.bank_details);
  const [terms, setTerms] = useState(bankDetailsData?.trems_and_conditions)
  const [letter_middle, setLetter_middle] = useState("")
  const [warrenty, setWarrantyClause] = useState(bankDetailsData?.warrenty_clauses)

  const [activeTab, setactiveTab] = useState({
    id: "1",
  })

  useEffect(() => {
    setBankDetails(bankDetailsData?.bank_details)
    setTerms(bankDetailsData?.trems_and_conditions)
    setWarrantyClause(bankDetailsData?.warrenty_clauses)
  }, [bankDetailsData])

  useEffect(() => {
    dispatch(getBankDetails())
  }, [dispatch])

  const ProductPrice = parseInt(QProductPrice?.cost)

  const totelPriceCalc = (ProductPrice * percentage) / 100 + ProductPrice

  useEffect(() => {
    if (quotationCurd?.id) {
      dispatch(getQuotationDetail(quotationCurd?.id))
    }
  }, [quotationCurd])

  useEffect(() => {
    setPercentage(QProductPrice?.profit)
  }, [QProductPrice])


  useEffect(() => {
    setRawData({
      ...rawData,
      quotationitem: {
        ...rawData.quotationitem,
        ["profit"]: percentage,
        ["price"]: totelPriceCalc,
      },
    })
  }, [percentage])

  useEffect(() => {
    dispatch(getProducts(searchText, ""))
    dispatch(getClients(searchClientText, ""))
  }, [dispatch, searchClientText])

  const onAddFormRow = () => {
    const modifiedRows = [...quotationitem]
    modifiedRows.push({
      id: modifiedRows.length + 1,
      ...rawData.quotationitem,
    })
    if (!rawData.client) {
      Notification({
        type: "warning",
        message: "Please Select Client",
        title: "Try Again",
      })
    } else {
      setQuotationitems(modifiedRows)
    }
  }

  const onDeleteFormRow = id => {
    if (id !== 0) {
      var modifiedRows = [...quotationitem]
      modifiedRows = modifiedRows.filter(x => x["id"] !== id)
      setQuotationitems(modifiedRows)
    }
  }
  // quotationitem
  const onSubmitQuotation = () => {
    dispatch(
      createQuatation({
        client: rawData.client, letter_head: letter_head, bank_details: bank_details,
        terms: terms, letter_middle: letter_middle, warrenty: warrenty, quotationitem
      }, history)
    )
  }

  //setore item from and search
  function handlerFinalValue(event) {
    dispatch(getQProductPrice(event.value))
    // setProductId(event.value)
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
    setSelectedClient(event)
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
    if (rawData?.orderitem?.product && rawData?.client) {
      return true
    } else {
      return true
    }
  }

  const [total, setTotal] = useState()

  const handleTotal = (e) => {
    setRawData({
      ...rawData,
      quotationitem: {
        ...rawData.quotationitem,
        ["price"]: e.target.value,
      },
    })
    if (e) {
      setTotal(e.target.value)
    } else {
      setTotal(totelPriceCalc)
    }
  }

  useEffect(() => {
    setTotal(totelPriceCalc)

  }, [totelPriceCalc, QProductPrice])

  // const newPercentage = Math.abs(((total - QProductPrice.cost) * 100) / QProductPrice.cost)

  // useEffect(() => {
  //   setPercentage(newPercentage)
  // }, [])

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
              <Col lg={1}></Col>
              <Col lg={10}>
                <Card>
                  <CardBody>
                    <CardTitle className="h4 mb-4">Quotation Item</CardTitle>

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
                                <div className="mb-3 ajax-select mt-1 mt-lg-0 select2-container">
                                  <Select
                                    onInputChange={handleClientEnters}
                                    value={selectedClient}
                                    placeholder={selectedClient}
                                    onChange={handlerClientFinalValue}
                                    options={optionGroup2}
                                    classNamePrefix="select2-selection"
                                    isLoading={true}
                                    required={"required"}
                                  />
                                </div>
                              </FormGroup>
                            </Col>
                          )}

                          <Col lg={6} md={6} sm={12} className="mb-3">
                            <FormGroup className="mb-3">
                              <Label>Products</Label>
                              <div className="col-md-12"></div>
                              <div className="ajax-select mt-1 mb-3 mt-lg-0 select2-container">
                                <Select
                                  onInputChange={handleEnters}
                                  value={selectedProduct}
                                  placeholder={selectedProduct}
                                  onChange={handlerFinalValue}
                                  options={optionGroup1}
                                  classNamePrefix="select2-selection"
                                  isLoading={true}
                                  required="required"
                                />
                              </div>
                              {QProductPrice?.cost && (
                                <span className="mt-2 text-muted">
                                  Product Cost :
                                  <Badge
                                    className={
                                      "font-size-14 p-2 mx-3 badge-soft-success"
                                    }
                                    pill
                                  >
                                    {QProductPrice?.cost}
                                  </Badge>
                                </span>
                              )}
                            </FormGroup>
                          </Col>
                          <Col
                            lg={totelPriceCalc ? 3 : 6}
                            md={3}
                            sm={12}
                            className=""
                          >
                            <label htmlFor="resume">Profit Percentage</label>
                            <input
                              type="number"
                              className="form-control mt-1 mt-lg-0"
                              id="resume"
                              requied="true"
                              min={1}
                              defaultValue={QProductPrice.profit}
                              onChange={e => setPercentage(e.target.value)}
                            />
                          </Col>
                          {totelPriceCalc ? (
                            <Col lg={3} md={3} sm={12} className="">
                              <label htmlFor="resume">Total Price</label>
                              <input
                                type="number"
                                className="form-control mt-1 mt-lg-0 text-warning"
                                id="resume"
                                requied="true"
                                min={1}
                                value={total ? total : ''}
                                onChange={(e) => handleTotal(e)}
                              />
                            </Col>
                          ) : (
                            <></>
                          )}
                          {totelPriceCalc || total ? <p style={{
                            width: "fit-content",
                            marginLeft: "auto",
                            padding: "0"
                          }}>Total Price :
                            <Badge
                              className={
                                "font-size-14 p-2 mx-3 badge-soft-success"
                              }
                              pill
                            >
                              {total ? total : totelPriceCalc}
                            </Badge>
                          </p> : <></>}
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
                              className={`btn btn-dark mr-lg-0 ${disabledBtn() == false && "disabled"
                                }`}
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
              <Col lg={1}></Col>
              {quotationitem?.length > 0 && (
                <>
                  <Col lg={1}></Col>
                  <Col lg={10}>
                    <Card>
                      <CardBody>
                        <CardTitle className="h4 mb-4">
                          All Quotations{" "}
                        </CardTitle>
                        {loading ? (
                          <Spinner type="grow" color="gray" />
                        ) : (
                          <Form
                            className="repeater"
                            encType="multipart/form-data"
                          >
                            <div>
                              {map(quotationitem, (item, index) => (
                                <Row key={index}>
                                  <Row className="text-muted mt-4">
                                    <Col lg={7} md={7}>
                                      <p>
                                        <i className="mdi mdi-chevron-right text-primary me-1" />
                                        Product : {item?.productName || ""}
                                      </p>
                                    </Col>
                                    <Col lg={3} md={3}>
                                      <p>Price : {item?.price || ""}</p>
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
                                          style={{ cursor: "pointer" }}
                                          className="fa fa-trash mt-1 mr-lg-0 mb-4 text-danger"
                                          onClick={() =>
                                            onDeleteFormRow(item.id)
                                          }
                                        ></i>
                                      </div>
                                    </Col>
                                  </Row>
                                </Row>
                              ))}
                            </div>


                          </Form>
                        )}

                      </CardBody>
                    </Card>
                  </Col>
                  <Col lg={1}></Col>
                </>
              )}
              <Col lg={1}></Col>
              <Col lg={10}>
                <Card>
                  <CardBody>
                    <h4 className="card-title mb-4">{activeTab.title}</h4>

                    <Nav
                      pills className="bg-light rounded" role="tablist">
                      <NavItem className="mx-2">
                        <NavLink
                          className={classnames({ active: activeTab.id === "1" })}
                          onClick={() => {
                            setactiveTab({
                              ...activeTab,
                              id: "1",
                            })
                          }}
                        >
                          <div className="d-flex align-items-center justify-content-end">
                            Letter Head
                            <i className="bx bx-chevrons-right font-size-20 mx-2"></i>
                          </div>
                        </NavLink>
                      </NavItem>
                      <NavItem className="mx-2">
                        <NavLink
                          className={classnames({ active: activeTab.id === "2" })}
                          onClick={() => {
                            setactiveTab({
                              ...activeTab,
                              id: "2",

                            })
                          }}
                        >
                          <div className="d-flex align-items-center justify-content-end">
                            Bank Details

                            <i className="bx bx-chevrons-right font-size-20 mx-2"></i>
                          </div>
                        </NavLink>
                      </NavItem>
                      <NavItem className="mx-2">
                        <NavLink
                          className={classnames({ active: activeTab.id === "3" })}
                          onClick={() => {
                            setactiveTab({
                              ...activeTab,
                              id: "3",

                            })
                          }}
                        >
                          <div className="d-flex align-items-center justify-content-end">
                            Terms and Conditions
                            <i className="bx bx-chevrons-right font-size-20 mx-2"></i>
                          </div>
                        </NavLink>
                      </NavItem>
                      <NavItem className="mx-2">
                        <NavLink
                          className={classnames({ active: activeTab.id === "4" })}
                          onClick={() => {
                            setactiveTab({
                              ...activeTab,
                              id: "4",

                            })
                          }}
                        >
                          Warranty clause

                        </NavLink>
                      </NavItem>
                    </Nav>

                    <TabContent activeTab={activeTab.id} className="mt-4">
                      <TabPane tabId="1">
                        {activeTab.id === "1" && (<>
                          <FormEditors content={letter_head} setContent={setLetterHead} />

                          <div className="d-flex align-items-center justify-content-end mt-2">
                            <button
                              className="btn btn-light w-fit-content d-flex align-items-center justify-content-center"
                              onClick={() => {
                                setactiveTab({
                                  ...activeTab,
                                  id: "2",
                                })
                              }}
                            >
                              Next
                              <i className="bx bx-chevrons-right bx-fade-right font-size-20"></i>
                            </button>
                          </div>
                        </>
                        )}
                      </TabPane>

                      <TabPane tabId="2">
                        {activeTab.id === "2" && (
                          <Form method="post">
                            <FormEditors content={bank_details ? bank_details : ""} setContent={setBankDetails} />
                            <textarea
                              rows="5"
                              type="text"
                              className="form-control mt-4 pt-4"
                              id=""
                              placeholder={"We are expecting your valuable...."}
                              value={letter_middle}
                              onChange={(e) => setLetter_middle(e.target.value)}
                            />
                            <div className="d-flex align-items-center justify-content-end mt-2">
                              <button
                                className="btn btn-light w-fit-content d-flex align-items-center justify-content-center"
                                onClick={() => {
                                  setactiveTab({
                                    ...activeTab,
                                    id: "3",
                                  })
                                }}
                              >
                                Next
                                <i className="bx bx-chevrons-right bx-fade-right font-size-20"></i>
                              </button>
                            </div>
                          </Form>
                        )}
                      </TabPane>
                      <TabPane tabId="3">
                        {activeTab.id === "3" && (<>
                          <FormEditors content={terms ? terms : ""} setContent={setTerms} />
                          <div className="d-flex align-items-center justify-content-end mt-2">
                            <button
                              className="btn btn-light w-fit-content d-flex align-items-center justify-content-center"
                              onClick={() => {
                                setactiveTab({
                                  ...activeTab,
                                  id: "4",
                                })
                              }}
                            >
                              Next
                              <i className="bx bx-chevrons-right bx-fade-right font-size-20"></i>
                            </button>
                          </div>
                        </>
                        )}
                      </TabPane>
                      <TabPane tabId="4">
                        {activeTab.id === "4" && (<>
                          <FormEditors content={warrenty ? warrenty : ""} setContent={setWarrantyClause} />
                          <div>
                            <Row>
                              <Col lg="6" md="6"></Col>
                              <Col lg="3" md="3">
                                {quotationCurd?.id && (
                                  <div className="text-sm-end mt-2">
                                    <Link
                                      to={`/quotation/pdf/${quotationCurd?.id}`}
                                      type="button"
                                      className="btn btn-outline-light d-flex mt-4 w-auto"
                                      style={{
                                        marginLeft: "auto",
                                        alignItems: "center",
                                        width: "fit-content",
                                        border: "1px solid #cccc",
                                      }}
                                    >
                                      PDF
                                      <i className="mdi mdi-download d-block font-size-16 mx-1"></i>
                                    </Link>
                                  </div>
                                )}
                              </Col>
                              <Col lg="3" md="3">
                                <div className="text-sm-end mt-2">
                                  <Link
                                    to="#"
                                    className="btn btn-success"
                                    onClick={onSubmitQuotation}
                                  >
                                    Confirm Quotation
                                    {quotationLoading ? (
                                      <>
                                        <i className="bx bx-loader bx-spin font-size-16 align-middle me-2"></i>
                                      </>
                                    ) : (
                                      <i className="mdi mdi-truck-fast mx-2" />
                                    )}
                                  </Link>
                                </div>
                              </Col>
                            </Row>
                          </div>
                        </>
                        )}
                      </TabPane>

                    </TabContent>
                  </CardBody>
                </Card>
              </Col>

              <Col lg={1}></Col>
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
