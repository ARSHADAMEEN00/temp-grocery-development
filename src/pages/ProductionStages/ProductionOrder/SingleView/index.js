import { MetaTags } from "react-meta-tags"
import { map } from "lodash"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import {
  Container,
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Media,
  Row,
  Spinner,
  Table,
  Badge,
} from "reactstrap"

//ations
import { getOrderItemDetail, updateOrderItem } from "store/actions"
import Breadcrumbs from "../../../../components/Common/Breadcrumb"
import StageList from "./StageList"

function OrderItemSingleView() {
  const dispatch = useDispatch()
  const params = useParams()

  const { loading, stages, orderItemDetail } = useSelector(state => ({
    stages: state.Orders.orderItemDetail.stages,
    loading: state.Orders.orderDetail.loading,
    orderItemDetail: state.Orders.orderItemDetail,
  }))

  useEffect(() => {
    dispatch(getOrderItemDetail(params.id))
  }, [dispatch])

  const WorkStatus = status => {
    if (status == "QC_Pending") {
      return "info"
    }
    if (status == "QC_Approved") {
      return "success"
    }
  }
  const StoreStatus = status => {
    if (status == "Not Provided") {
      return "info"
    }
    if (status == "Provided") {
      return "success"
    }
  }

  const handleUpdateStatus = () => {
    dispatch(updateOrderItem({ qc_status: "Approved" }, orderItemDetail.id))
  }

  return (
    <>
      <MetaTags>
        <title>OrderItem | Indtech </title>
      </MetaTags>

      <div className="page-content">
        <Breadcrumbs title="Production" breadcrumbItem="Order Item" />
        <Container fluid>
          <div className="container-fluid">
            <Row>
              <Card>
                <CardBody>
                  {loading ? (
                    <Spinner type="grow" color="gray" />
                  ) : (
                    <>
                      <Row>
                        <Col lg={8}>
                          <Media className="overflow-hidden" body>
                            <h5 className="text-truncate font-size-15">
                              {orderItemDetail?.product_name}
                            </h5>
                            <p className="text-muted">
                              {orderItemDetail?.auto_id}
                            </p>
                            <p className="text-info ">
                              {" "}
                              <i className="bx bx-rupee" />{" "}
                              {orderItemDetail?.total_price}
                            </p>

                            <p className="text-info ">
                              {" "}
                              Quantity : {orderItemDetail?.quantity}
                            </p>
                            <p className="text-muted">
                              QC Status :
                              <Badge
                                className={
                                  "font-size-12 mx-4 badge-soft-" +
                                  `${WorkStatus(orderItemDetail?.qc_status)}`
                                }
                                pill
                              >
                                {orderItemDetail?.qc_status}
                              </Badge>
                            </p>
                            <p className="text-muted">
                              Store Status :
                              <Badge
                                className={
                                  "font-size-12 mx-4 badge-soft-" +
                                  `${StoreStatus(
                                    orderItemDetail?.store_status
                                  )}`
                                }
                                pill
                              >
                                {orderItemDetail?.store_status}
                              </Badge>
                            </p>
                          </Media>
                        </Col>
                        {/* {orderItemDetail?.work_status == "Approved" ? (
                          <></>
                        ) : (
                          <Col lg={4}>
                            <CardTitle className="mb-4">
                              Update Status
                            </CardTitle>

                            <div className="mb-3 mt-3 mt-lg-0 ">
                              <label>Work Status : </label>
                              <Button
                                type="submit"
                                color="success"
                                className="w-md mb-2 mx-3 btn-sm "
                                onClick={handleUpdateStatus}
                              >
                                Approve
                              </Button>
                            </div>
                          </Col>
                        )} */}
                      </Row>
                    </>
                  )}


                </CardBody>
              </Card>
            </Row>
            <Row>
              <Card>
                <CardBody>
                  {stages?.length > 0 ? (
                    <StageList stageData={stages} />

                  ) : (
                    <p className="text-warning">
                      No stages for this item,{" "}
                      <Link
                        to={`/stage/create?${orderItemDetail?.auto_id}`}
                        className="badge bg-success mx-4 p-2"
                      >
                        Add Stage Now
                      </Link>
                    </p>
                  )}
                </CardBody>
              </Card>
            </Row>
          </div>
        </Container>
      </div>
    </>
  )
}

export default OrderItemSingleView
