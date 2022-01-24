import React, { Fragment, useEffect, useState } from "react"
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
import { getQuotationDetail, updateOrder } from "store/actions"


//css
import "react-datepicker/dist/react-datepicker.css"


function QuotationDetails({ quotationId }) {
  const dispatch = useDispatch()

  const { loading, QDetails } = useSelector(state => ({
    loading: state.Orders.quotationDetailLoading,
    QDetails: state.Orders.quotationDetails
  }))
  console.log(QDetails);

  useEffect(() => {
    dispatch(getQuotationDetail(quotationId))
  }, [dispatch, quotationId])


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

                  <Row className="task-dates">
                    <Col sm="8" xs='6' lg="10">
                      <Media className="overflow-hidden" body>
                        <h5 className="text-truncate font-size-14">{moment(QDetails?.date_added).format("YYYY/MM/DD")}</h5>
                        <p className="text-muted mb-0">{QDetails?.client_name}</p>
                        <p className="text-muted">{QDetails?.client_address}</p>
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
                      {map(QDetails?.quotationitem, (Qitem, index) => (

                        <div className=" py-3" key={index}>
                          <div className="d-flex">
                            <div className="me-3">
                              <img
                                src={Qitem.product.image}
                                alt=""
                                className="avatar-md h-auto d-block rounded"
                              />
                            </div>
                            <div className="align-self-center overflow-hidden me-auto">
                              <div>
                                <h5 className="font-size-14 text-truncate">
                                  <Link to={Qitem.product.id} className="text-dark">
                                    {Qitem?.product.name}
                                  </Link>
                                </h5>
                                <p className="text-success mb-0 font-size-16"> <i className="bx bx-rupee" />{Qitem?.price}</p>
                              </div>
                            </div>
                          </div>

                        </div>
                      ))}
                      <Link
                        to="/quotation/pdf"
                        type="button"
                        className="btn btn-outline-light d-flex mt-4"
                        style={{ marginLeft: "auto", alignItems: "center", width: "fit-content", border: "1px solid #cccc" }}
                      >
                        PDF
                        <i className="mdi mdi-download d-block font-size-16 mx-1"></i>
                      </Link>
                    </> : <p className="text-info">No Quatation Items</p>}
                </div>


                {/* <Button
                      color="success"
                      className="w-md mb-2 btn-sm "
                      style={{ marginRight: "1rem" }}
                      // onClick={e => handlerFinalValue(e)}
                    >
                      Download PDF
                    </Button> */}
              </>
            )}


          </CardBody>
        </Card>
      </Col>

    </>
  )
}

export default QuotationDetails

QuotationDetails.propTypes = {
  quotationId: PropTypes.string,
}