import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  Row,
  Col,
  Card,
  CardBody,
  Form,
  CardTitle,
  Spinner,
  Button,
} from "reactstrap"
import { useParams } from "react-router"

//actions
import {
  createOtherCost,
  getProductDetail,
  getStoreItems,
} from "store/actions"

import CrudProductDetail from "./ProductDetail"

function PreviewCard() {
  const dispatch = useDispatch()
  const params = useParams()

  //redux state
  const { loading } = useSelector(state => ({
    storeItems: state.StoreItems.storeItems,
    loading: state.StoreItems.loading,
    productLoading: state.Products.productDetail.loading,
  }))

  useEffect(() => {
    dispatch(getStoreItems(1))
    dispatch(getProductDetail(params.id))
  }, [dispatch])


  //   other cost
  const [cost, setCost] = useState({
    product: params.id || "",
    note: "",
    amount: "",
  })
  const onAddCost = () => {
    dispatch(createOtherCost(cost))
  }
  return (
    <>
      {/* uploading */}
      <CrudProductDetail />


      {/* other cost */}
      <Row>
        <Col lg={12}>
          <Card>
            <CardBody>
              <CardTitle className="h4 mb-4">Other Costs</CardTitle>
              {loading ? (
                <Spinner type="grow" color="gray" />
              ) : (
                <Form className="repeater" encType="multipart/form-data">
                  <div>
                    <Row>
                      <Col lg={6} className="mb-3">
                        <label>Description</label>
                        <textarea
                          rows="1"
                          type="text"
                          className="form-control"
                          id="resume"
                          onChange={e =>
                            setCost({
                              ...cost,
                              ["note"]: e.target.value,
                            })
                          }
                        />
                      </Col>

                      <Col lg={3} className="mb-3">
                        <label>Price</label>
                        <input
                          type="number" min={0}
                          className="form-control"
                          id="resume"
                          onChange={e =>
                            setCost({
                              ...cost,
                              ["amount"]: e.target.value,
                            })
                          }
                          required
                        />
                      </Col>
                      <Col lg={3}>
                        <Button
                          type="button"
                          className="btn btn-dark mt-4 mr-lg-0"
                          onClick={() => onAddCost()}
                        >
                          Add
                        </Button>
                      </Col>
                    </Row>
                  </div>
                </Form>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>

    </>
  )
}

export default PreviewCard
