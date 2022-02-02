import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Row, Col, Card, CardBody, Form, CardTitle, Spinner } from "reactstrap"
import { map } from "lodash"

//actions
import {
  createCurdProductDetail,
  createOtherCost,
  deleteOtherCost,
} from "store/actions"

import AvField from "availity-reactstrap-validation/lib/AvField"
import AvForm from "availity-reactstrap-validation/lib/AvForm"

function CrudProductDetail(myDisabled) {
  const dispatch = useDispatch()

  const { loading, productDetail, createdProductDetail } = useSelector(
    state => ({
      loading: state.StoreItems.loading,
      productDetail: state.Products.productDetail,
      createdProductDetail: state.Products.createdProductDetail,
    })
  )

  const [newDetail, setNewDetail] = useState([])
  const [rawData, setRawData] = useState({
    product: productDetail.id || "",
    title: "",
    detail: "",
    is_description: false,
  })

  useEffect(() => {
    setRawData({ ...rawData, product: productDetail.id })
  }, [productDetail])

  const onAddFormRow = () => {
    dispatch(createCurdProductDetail(rawData))
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
        <Col lg={"12"}>
          <Card>
            <CardBody>
              <CardTitle className="h4 mb-4">Product Details</CardTitle>
              {loading ? (
                <Spinner type="grow" color="gray" />
              ) : (
                <AvForm className="repeater" encType="multipart/form-data">
                  <div>
                    <Row>
                      <Col lg={"3"} className="mb-3">
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

                      <Col lg={"3"} className="mb-3">
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
                      <Col lg={"3"} className="mb-3">
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
      </Row>
    </>
  )
}

export default CrudProductDetail
