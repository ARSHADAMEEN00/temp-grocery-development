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
import DatePicker from "react-datepicker"
import { map } from "lodash"

//actions
import { getOrderDetail, updateOrder } from "store/actions"


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
  const { orderDetail, loading, error, workStageDetail } = useSelector(state => ({
    orderDetail: state.Orders.orderDetail,
    error: state.Orders.error,
    loading: state.Orders.loading,
    workStageDetail: state.WorkStage.workStageDetail,
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
    {
      id: 300,
      statusText: "Canceled",
      class: "danger",
      text: "Cancel",
    },

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
      return status?.slice(1, 3)
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
                    <h5 className="text-truncate font-size-15">{workStageDetail?.stage}</h5>
                    <p className="text-muted">{workStageDetail?.order_item_auto_id}</p>
                  </Media>
                </Media>

                <div className="text-muted mt-4">
                  <p>
                    <i className="mdi mdi-chevron-right text-primary me-1" />
                    QC Name: {workStageDetail.qc_name}
                  </p>
                  <p>
                    <i className="mdi mdi-chevron-right text-primary me-1" />
                    Note : {workStageDetail.note}
                  </p>

                </div>
              </>
            )}

            <Row className="task-dates">
              <Col lg={4} sm="4" xs="6">
                <div className="mt-4">
                  <Badge
                    className={
                      "font-size-14 p-2 badge-soft-" +
                      `${Status(orderDetail?.status)}`
                    }
                    pill
                  >
                    {orderDetail?.status}
                  </Badge>
                </div>
              </Col>

            </Row>
          </CardBody>
        </Card>
      </Col>
      <Col lg="4">
        <Card>
          <CardBody>

            <CardTitle className="mb-4">Update Status</CardTitle>
            {error?.response && (
              <Alert color="danger">{error?.response}</Alert>
            )}
            <div className="mb-3 ajax-select mt-3 mt-lg-0 select2-container">
              {map(statusList(), (item, index) => (
                <Button
                  key={index}
                  type="submit"
                  color={item.class}
                  value={item.statusText}
                  className="w-md mb-2 btn-sm "
                  style={{ marginRight: "1rem" }}
                  onClick={e => handlerFinalValue(e)}
                >
                  {item.text}
                </Button>
              ))}
            </div>
          </CardBody>
        </Card>
      </Col>
    </>
  )
}

export default OrderStatus
