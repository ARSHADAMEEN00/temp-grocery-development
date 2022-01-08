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
import PropTypes from "prop-types"

//actions
import { updateOrder } from "store/actions"


//css
import "react-datepicker/dist/react-datepicker.css"


function QuotationDetails({ QDetails }) {
  console.log(QDetails);
  const dispatch = useDispatch()
  const params = useParams()
  const [startDate, setStartDate] = useState(Date.now())
  const [newStatus, setNewStatus] = useState({
    status: "",
    start_date: moment(startDate).format("YYYY-MM-DD"),
  })
  const { loading, error } = useSelector(state => ({
    error: state.Orders.error,
    loading: state.Orders.quotationLoading,

  }))
  useEffect(() => {
    // dispatch(getOrderDetail(params.id))
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
    if (QDetails?.status == "Pending") {
      return status?.slice(1, 3)
    } else if (QDetails?.status == "Approved") {
      return status?.filter(item => item.statusText == "Shipped")
    } else if (QDetails?.status == "Shipped") {
      return status?.filter(item => item.statusText == "Delivered")
    } else if (QDetails?.status == "Started") {
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
    if (status == "Delivered") {
      return "success"
    }
  }

  const handleSubmit = () => {
    dispatch(updateOrder("", params.id, "", newStatus))
  }
  const Role = sessionStorage.getItem("role")

  const Handler = () => {
    if (QDetails?.status == "Canceled") {
      return false
    } else if (Role == "dealer") {
      return false
    } else if (QDetails?.status == "Delivered") {
      return false
    } else {
      return true
    }
  }
  return (
    <>
      {QDetails && <Col lg={12}>
        <Card>
          <CardBody>
            {loading ? (
              <Spinner type="grow" color="gray" />
            ) : (
              <>
                <Media>

                  <Row className="task-dates">
                    <Col sm="8" xs='6' lg="10">
                      <Media className="overflow-hidden" body>
                        <h5 className="text-truncate font-size-14">{moment(QDetails?.date_added).format("YYYY/MM/DD")}</h5>
                        <p className="text-muted">{QDetails?.client_name}</p>
                      </Media>
                    </Col>
                    <Col sm="4" xs="6" lg="2">
                      <div className="mt-4">
                        <Badge
                          className={
                            "font-size-14 p-2 badge-soft-" +
                            `${Status(QDetails?.status)}`
                          }
                          pill
                        >
                          {QDetails?.status}
                        </Badge>
                      </div>
                    </Col>
                  </Row>
                </Media>

                <div className="text-muted mt-4">
                  <h4 className="font-size-14 text-muted mb-3">Quotation Items :</h4>

                  {QDetails?.quotationitem ?
                    <>
                      {map(QDetails?.quotationitem, (Qitem, index) => (<>
                        <div className="mb-3">
                          <p key={index} className="mb-2 ">
                            <i className="mdi mdi-chevron-right text-primary me-1" />
                            {/* Product Name :{" "} */}
                            <span className="text-dark">
                              {Qitem?.product_name}
                            </span>
                          </p>
                          <p className="mx-3">
                            Price :
                            <span className="text-success mx-2 font-size-16">
                              <i className="bx bx-rupee" />
                              {Qitem?.price}
                            </span>
                          </p>
                        </div>
                      </>

                      ))}</> : <p className="text-info">No Quatation Items</p>}
                </div>

                {/* <CardTitle className="mb-1 font-size-14 text-muted mt-4">Update Status</CardTitle>
                {error?.response && (
                  <Alert color="danger">{error?.response}</Alert>
                )}
                <div className="mb-3 ajax-select mt-2 mt-lg-0 select2-container">
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
                </div> */}
              </>
            )}


          </CardBody>
        </Card>
      </Col>}

    </>
  )
}

export default QuotationDetails

QuotationDetails.propTypes = {
  QDetails: PropTypes.object,
}