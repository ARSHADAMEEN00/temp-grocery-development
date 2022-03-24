import React, { useEffect, useState } from "react"
import {
  Badge,
  Card,
  CardBody,
  Col,
  Row,
  Spinner,
  Button,
  Alert,
  Media,
} from "reactstrap"
import { Link, useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import moment from "moment"
import PropTypes from "prop-types"

//actions
import { getOrderDetail, updateOrder, deleteOrder } from "store/actions"

//css
import "react-datepicker/dist/react-datepicker.css"

const OrderStatus = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const params = useParams()
  const [startDate, setStartDate] = useState(Date.now())
  const [newStatus, setNewStatus] = useState({
    status: "",
    start_date: moment(startDate).format("YYYY-MM-DD"),
  })
  const { orderDetail, loading, error } = useSelector(state => ({
    orderDetail: state.Orders.orderDetail,
    error: state.Orders.error,
    loading: state.Orders.loading,
  }))
  useEffect(() => {
    dispatch(getOrderDetail(params.id))
  }, [dispatch])

  function handlerFinalValue(event) {
    setNewStatus({
      ...newStatus,
      ["status"]: event.target.value,
    })

    dispatch(updateOrder("", params.id, "", { status: event.target.value }))
  }

  function handlerCancel(event) {
    dispatch(deleteOrder(params.id, history))
  }

  const Status = status => {
    if (status == "Pending") {
      return "info"
    }
    if (status == "Started") {
      return "success"
    }
    if (status == "Canceled") {
      return "danger"
    }
    if (status == "Shipped") {
      return "success"
    }
    if (status == "Delivered") {
      return "success"
    }
  }
  const Role = sessionStorage.getItem("role")

  const Handler = () => {
    if (orderDetail?.status == "Canceled") {
      return false
    } else if (Role == "dealer") {
      return false
    } else if (orderDetail?.status == "Delivered") {
      return false
    } else {
      return true
    }
  }

  return (
    <>
      <Col lg={12}>
        <Card>
          <CardBody>
            {loading ? (
              <Spinner type="grow" color="gray" />
            ) : (
              <>
                <Media>
                  <Media className="overflow-hidden" body>
                    <h5 className="text-truncate font-size-15">
                      {orderDetail?.auto_id}
                    </h5>
                    <p className="text-muted">{orderDetail?.quotation_id}</p>
                  </Media>
                </Media>

                <div className="text-muted mt-4">
                  <p>
                    <i className="mdi mdi-chevron-right text-primary me-1" />
                    Start Date : {orderDetail.start_date}
                  </p>
                  <p>
                    <i className="mdi mdi-chevron-right text-primary me-1" />
                    Finish Date : {orderDetail.end_date}
                  </p>
                  <p>
                    <i className="mdi mdi-chevron-right text-primary me-1" />
                    Duration : {orderDetail.duration}
                  </p>
                  <p>
                    <i className="mdi mdi-chevron-right text-primary me-1" />
                    Total Amount :{" "}
                    <span className="text-info mx-2 font-size-17">
                      <i className="bx bx-rupee" />
                      {orderDetail.bill_amount}
                    </span>
                  </p>
                </div>
              </>
            )}

            <Row className="task-dates">
              <Col lg={12} sm="4" xs="6">
                <div className="mt-4">
                  <p>
                    Current Status :{" "}
                    <Badge
                      className={
                        "font-size-14 mx-3 p-2 badge-soft-" +
                        `${Status(orderDetail?.status)}`
                      }
                      pill
                    >
                      {orderDetail?.status}
                    </Badge>
                  </p>
                </div>
              </Col>
              <Col lg={8} className="mt-4">
                {Handler() && (
                  <div className="d-flex" style={{ alignItems: "center" }}>
                    <p>Update Status :</p>

                    {orderDetail?.status === "Delivered" ? (
                      <></>
                    ) : (
                      <div className="mb-3 ajax-select mt-lg-0 select2-container">
                        {orderDetail?.status === "Pending" ? (
                          <button
                            type="submit"
                            color="danger"
                            value="Canceled"
                            className="w-md mx-3 btn btn-sm btn-outline-danger "
                            style={{ marginRight: "1rem" }}
                            onClick={e => handlerCancel(e)}
                          >
                            Cancel
                          </button>
                        ) : (
                          <>
                            {orderDetail?.status === "Shipped" ? (
                              <></>
                            ) : (
                              <Button
                                type="submit"
                                color="success"
                                value="Shipped"
                                className="w-md mx-3 btn-sm "
                                style={{ marginRight: "1rem" }}
                                onClick={e => handlerFinalValue(e)}
                              >
                                Shipped
                              </Button>
                            )}

                            <Button
                              type="submit"
                              color="success"
                              value="Delivered"
                              className="w-md mx-3 btn-sm "
                              style={{ marginRight: "1rem" }}
                              onClick={e => handlerFinalValue(e)}
                            >
                              Delivered
                            </Button>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                )}
                {error?.response && (
                  <Alert color="light" className="text-danger ">
                    {error?.response}sdfbksajbv
                  </Alert>
                )}
              </Col>
              <Col lg={2}>
                <Link
                  to="/order/work/pdf"
                  type="button"
                  className="btn btn-outline-light d-flex mt-4"
                  style={{
                    marginLeft: "auto",
                    alignItems: "center",
                    width: "fit-content",
                    border: "1px solid #cccc",
                  }}
                >
                  Intalation PDF
                  <i className="mdi mdi-download d-block font-size-16 mx-1"></i>
                </Link>
              </Col>
              <Col lg={2}>
                <Link
                  to="/order/work/pdf"
                  type="button"
                  className="btn btn-outline-light d-flex mt-4"
                  style={{
                    marginLeft: "auto",
                    alignItems: "center",
                    width: "fit-content",
                    border: "1px solid #cccc",
                  }}
                >
                  Work PDF
                  <i className="mdi mdi-download d-block font-size-16 mx-1"></i>
                </Link>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
    </>
  )
}

export default OrderStatus

OrderStatus.propTypes = {
  history: PropTypes.object,
}
