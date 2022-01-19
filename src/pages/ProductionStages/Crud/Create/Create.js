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
  Button,
} from "reactstrap"
import Select from "react-select"

//actions
import {
  createOrder,
  getClients,
  getProducts,
  getQltcheckers,
  getQuotations,
} from "store/actions"

import Breadcrumbs from "../../../../components/Common/Breadcrumb"

const CreatStage = ({ history }) => {
  const dispatch = useDispatch()
  //redux state
  const { loading, qltcheckers } = useSelector(state => ({
    loading: state.WorkStage.loading,
    qltcheckers: state.Qltcheckers.qltcheckers,
  }))
  const [selectedQc, setSelectedQc] = useState("Search a Quotation")
  const [searchQltcheckerText, setSearchQltcheckerText] = useState("")
  const [orderitem, setNewOrders] = useState([])
  const [rawData, setRawData] = useState({
    client: "",
    start_date: "",
    end_date: "",
    quotation_id: null,
    duration: "",
    orderitem: [],
  })

  useEffect(() => {
    dispatch(getQltcheckers(searchQltcheckerText, ""))
  }, [dispatch, searchQltcheckerText])

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

  //quotation
  function handlerQuotationFinalValue(event) {
    setSelectedQc(event.label)
    setRawData({
      ...rawData,
      ["qualitychecker"]: event.value,
    })
  }

  const qcOptions = [
    {
      options: qltcheckers?.results?.map((result, index) => ({
        key: index,
        label: result.client_name,
        value: result.auto_id,
      })),
    },
  ]

  const handleQltcheckerEnters = textEntered => {
    setSearchQltcheckerText(textEntered)
  }

  return (
    <>
      <MetaTags>
        <title>Stage | Indtech </title>
      </MetaTags>

      <div className="page-content">
        <Breadcrumbs title="Stage" breadcrumbItem="Create Stage" />

        <Container fluid>
          <div className="container-fluid">
            {/* uploading */}
            <Row>
              <Col lg={orderitem.length > 0 ? "6" : "12"}>
                <Card>
                  <CardBody>

                    <Form className="repeater" encType="multipart/form-data">
                      <div>
                        <Row>
                          <Col lg={6} className="mb-3">
                            <label htmlFor="Duration">Stage</label>
                            <input
                              type="text"
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
                          <Col lg={6} className="mb-3">
                            <label htmlFor="Duration">Order item auto id</label>
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
                          <Col lg={6} className="mb-3">
                            <FormGroup className="mb-3">
                              <Label>Quality Checker</Label>
                              <div className="col-md-12"></div>
                              <div className="mb-3 ajax-select mt-3 mt-lg-0 select2-container">
                                <Select
                                  onInputChange={handleQltcheckerEnters}
                                  value={selectedQc}
                                  placeholder={selectedQc}
                                  onChange={handlerQuotationFinalValue}
                                  options={qcOptions}
                                  classNamePrefix="select2-selection"
                                  isLoading={true}
                                />
                              </div>
                            </FormGroup>
                          </Col>
                          <Col lg={6} className="mb-3">
                            <FormGroup className="mb-3">
                              <Label>Status</Label>
                              <div className="col-md-12"></div>
                              <div className="mb-3 ajax-select mt-3 mt-lg-0 select2-container">
                                <Select
                                  onInputChange={handleQltcheckerEnters}
                                  value={selectedQc}
                                  placeholder={selectedQc}
                                  onChange={handlerQuotationFinalValue}
                                  options={qcOptions}
                                  classNamePrefix="select2-selection"
                                  isLoading={true}
                                />
                              </div>
                            </FormGroup>
                          </Col>

                          <Col lg={12} className="mb-3">
                            <label htmlFor="Duration">Note</label>
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
                              className="btn btn-success mr-lg-0 "
                              value="Create Stage"
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

export default CreatStage

CreatStage.propTypes = {
  history: PropTypes.object,
}
