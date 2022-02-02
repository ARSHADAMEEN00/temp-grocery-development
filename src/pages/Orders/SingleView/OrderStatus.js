import React, { useEffect, useState } from "react"
import {
  Badge,
  Card,
  CardBody,
  CardTitle,
  Col,
  Row,
  Spinner,
  Button,
  Alert,
  Media,
} from "reactstrap"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import moment from "moment"
import { map } from "lodash"

//actions
import { getOrderDetail, updateOrder } from "store/actions"

//componetns

//css
import "react-datepicker/dist/react-datepicker.css"

function OrderStatus() {
  const dispatch = useDispatch()
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

  const status = [
    {
      id: 100,
      statusText: "Pending",
      class: "info",
      text: "Pending",
    },
    {
      id: 200,
      statusText: "Approved",
      class: "success",
      text: "Approve",
    },
    // {
    //   id: 300,
    //   statusText: "Canceled",
    //   class: "danger",
    //   text: "Cancel",
    // },

    {
      id: 400,
      statusText: "Shipped",
      class: "success",
      text: "Shipped",
    },
    {
      id: 500,
      statusText: "Delivered",
      class: "success",
      text: "Delivered",
    },
  ]

  function statusList() {
    if (orderDetail?.status == "Pending") {
      return status?.filter(item => item.statusText == "Approved")
    } else if (orderDetail?.status == "Approved") {
      return status?.filter(item => item.statusText == "Shipped")
    } else if (orderDetail?.status == "Shipped") {
      return status?.filter(item => item.statusText == "Delivered")
    } else if (orderDetail?.status == "Started") {
      return status?.filter(item => item.statusText == "Shipped")
    }
  }

  function handlerFinalValue(event) {
    setNewStatus({
      ...newStatus,
      ["status"]: event.target.value,
    })
    {
      if (event.target.value == "Approved") {
        dispatch(
          updateOrder("", params.id, "", {
            status: event.target.value,
            start_date: moment(startDate).format("YYYY-MM-DD"),
          })
        )
      } else {
        dispatch(
          updateOrder("", params.id, "", {
            status: event.target.value,
            start_date: "",
          })
        )
      }
    }
  }
  const Status = status => {
    if (status == "Pending") {
      return "info"
    }
    if (status == "Approved") {
      return "success"
    }
    if (status == "Canceled") {
      return "danger"
    }
    if (status == "Started") {
      return "warning"
    }
    if (status == "Shipped") {
      return "success"
    }
    if (status == "Delivered") {
      return "success"
    }
  }

  const handleSubmit = () => {
    dispatch(updateOrder("", params.id, "", newStatus))
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
                  {/* <img src={img1} alt="" className="avatar-sm me-4" /> */}

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
              <Col lg={9} className="mt-4">
                {Handler() && (
                  <div className="d-flex" style={{ alignItems: "center" }}>
                    <p>Update Status :</p>

                    <div className="mb-3 ajax-select mt-lg-0 select2-container">
                      {map(statusList(), (item, index) => (
                        <Button
                          key={index}
                          type="submit"
                          color={item.class}
                          value={item.statusText}
                          className="w-md mx-3 btn-sm "
                          style={{ marginRight: "1rem" }}
                          onClick={e => handlerFinalValue(e)}
                        >
                          {item.text}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
                {error?.response && (
                  <Alert color="light" className="text-danger ">
                    {error?.response}sdfbksajbv
                  </Alert>
                )}
              </Col>
              <Col lg={3}>
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
              {/* <Col lg={3} sm="4" xs="6">

                <Link
                  to="/order/pdf"
                  type="button"
                  className="btn btn-outline-light d-flex mt-4"
                  style={{
                    marginLeft: "auto",
                    alignItems: "center",
                    width: "fit-content",
                    border: "1px solid #cccc",
                  }}
                >
                  Billing PDF
                  <i className="mdi mdi-download d-block font-size-16 mx-1"></i>
                </Link>
              </Col> */}
            </Row>
          </CardBody>
        </Card>
      </Col>
    </>
  )
}

export default OrderStatus
