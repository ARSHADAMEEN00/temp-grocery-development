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
import Breadcrumbs from "../../../components/Common/Breadcrumb"
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
    if (status == "QC_Ready") {
      return "warning"
    }
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
                            <h4 className="text-muted mb-3">
                              {orderItemDetail?.auto_id}
                            </h4>
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
                                  "font-size-13 p-1 mx-4 badge-soft-" +
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
                                  "font-size-13 p-1 mx-4 badge-soft-" +
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
                      </Row>
                      <Row>
                        <Col lg={12}>
                          <div
                            className="table-responsive"
                            style={{ width: "fit-content", marginLeft: "auto" }}
                          >
                            <Table className="table align-middle table-nowrap">
                              <tbody>
                                <tr>
                                  <td colSpan="2">
                                    <h6 className="m-0 text-end ">
                                      Selling Price :
                                    </h6>
                                  </td>

                                  <td className="text-info">
                                    {" "}
                                    <i className="bx bx-rupee" />{" "}
                                    {orderItemDetail?.selling_price}
                                  </td>
                                </tr>
                                <tr>
                                  <td colSpan="2">
                                    <h6 className="m-0 text-end">Quantity:</h6>
                                  </td>
                                  <td className="text-info">
                                    {orderItemDetail?.quantity}
                                  </td>
                                </tr>
                                <tr>
                                  <td colSpan="2">
                                    <h6 className="m-0 text-end font-size-17">
                                      Total:
                                    </h6>
                                  </td>
                                  <td className="text-info font-size-17">
                                    <div>
                                      <i className="bx bx-rupee" />
                                      {orderItemDetail?.total_price}
                                      <p className="font-size-10 m-0 p-0">
                                        (Selling Price x QTY)
                                      </p>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </Table>
                          </div>
                        </Col>
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
