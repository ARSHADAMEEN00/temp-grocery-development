import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Row, Col, Card, CardBody, Form, CardTitle, Spinner } from "reactstrap"
import { map } from "lodash"

//actions
import { createCurdProductDetail, createOtherCost, deleteOtherCost } from "store/actions"

import AvField from "availity-reactstrap-validation/lib/AvField"
import AvForm from "availity-reactstrap-validation/lib/AvForm"

function CrudProductDetail(myDisabled) {
  const dispatch = useDispatch()

  const { loading, productDetail, createdProductDetail } = useSelector(state => ({
    loading: state.StoreItems.loading,
    productDetail: state.Products.productDetail,
    createdProductDetail: state.Products.createdProductDetail,
  }))

  const [newDetail, setNewDetail] = useState([])
  const [rawData, setRawData] = useState({
    product: productDetail.id || "",
    title: "",
    detail: "",
    is_description: false,
  })

  console.log(newDetail);

  useEffect(() => {
    setRawData({ ...rawData, product: productDetail.id })
  }, [productDetail])

  const onAddFormRow = () => {
    dispatch(createCurdProductDetail(rawData))
    console.log("add");
  }

  const onDeleteFormRow = id => {
    dispatch(deleteOtherCost(id))
    var modifiedRows = [...newDetail]
    modifiedRows = modifiedRows.filter(x => x["id"] !== id)
    setNewDetail(modifiedRows)
  }

  useEffect(() => {
    if (createdProductDetail?.id) {
      setNewDetail([...newDetail, createdProductDetail])
    }
  }, [createdProductDetail])

  return (
    <>
      <Row>
        <Col lg={newDetail.length > 0 ? "6" : "12"}>
          <Card>
            <CardBody>
              <CardTitle className="h4 mb-4">Product Details</CardTitle>
              {loading ? (
                <Spinner type="grow" color="gray" />
              ) : (
                <AvForm className="repeater" encType="multipart/form-data">
                  <div>
                    <Row>
                      <Col lg={newDetail.length > 0 ? "6" : "3"} className="mb-3">
                        <label>Title</label>
                        <AvField
                          name="title"
                          rows="1"
                          type="text"
                          className="form-control"
                          id="resume"
                          onChange={e =>
                            setRawData({
                              ...rawData,
                              ["title"]: e.target.value,
                            })
                          }
                          required
                        />
                      </Col>

                      <Col lg={newDetail.length > 0 ? "6" : "3"} className="mb-3">
                        <label>Detail</label>
                        <AvField
                          name="detail"
                          type="textarea"
                          className="form-control"
                          rows="1"
                          id="resume"
                          onChange={e =>
                            setRawData({
                              ...rawData,
                              ["detail"]: e.target.value,
                            })
                          }
                          required
                        />
                      </Col>
                      <Col lg={newDetail.length > 0 ? "6" : "3"} className={`mb-3 ${newDetail.length > 0 ? "d-flex" : "d-block"}`} >
                        <label className="me-4">Description</label>
                        <AvField
                          name="is_description"
                          type="checkbox"
                          className="form-control"
                          id="resume"
                          onChange={e =>
                            setRawData({
                              ...rawData,
                              ["is_description"]: e.target.checked,
                            })
                          }
                        />
                      </Col>
                      {newDetail.length > 0 && <Col lg={4}></Col>}
                      <Col lg={2}>
                        <input
                          type="button"
                          className="btn btn-dark mt-4 mr-lg-0"
                          value="Add"
                          style={{
                            pointerEvents:
                              myDisabled.myDisabled === true && "none",
                          }}
                          onClick={() => onAddFormRow()}
                        />
                      </Col>
                    </Row>
                  </div>
                </AvForm>
              )}
            </CardBody>
          </Card>
        </Col>
        {newDetail.length > 0 && (
          <Col lg={6}>
            <Card>
              <CardBody>
                <CardTitle className="h4 mb-4">Uploaded Product Details </CardTitle>
                <Form className="repeater" encType="multipart/form-data">
                  <div>
                    {map(newDetail, (item, index) => (
                      <Row key={index}>
                        <Row className="text-muted mt-4">
                          <Col lg={4} md={5}>
                            <p>
                              <i className="mdi mdi-chevron-right text-primary me-1" />
                              Discription : {item.detail}
                            </p>
                          </Col>

                          <Col lg={4} md={4}>
                            <p>Title : {item.title}</p>
                          </Col>
                          <Col
                            lg={3}
                            md={3}
                            className="align-self-center m-auto"
                          >
                            <div
                              className="d-grid "
                              style={{ maxWidth: "200px" }}
                            >
                              <input
                                type="button"
                                className="btn btn-danger mt-0 mr-lg-0 mb-4"
                                style={{ maxWidth: "120px" }}
                                value="Remove"
                                onClick={() => onDeleteFormRow(item.id)}
                              />
                            </div>
                          </Col>
                        </Row>
                      </Row>
                    ))}
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        )}
      </Row>

    </>
  )
}

export default CrudProductDetail
