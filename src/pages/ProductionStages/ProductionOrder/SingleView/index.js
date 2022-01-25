import { MetaTags } from "react-meta-tags"
import { map } from "lodash"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { Container, Button, Card, CardBody, CardTitle, Col, Media, Row, Spinner, Table, Badge } from "reactstrap"

//ations
import { getOrderItemDetail, updateOrderItem } from "store/actions"
import Breadcrumbs from "../../../../components/Common/Breadcrumb"

function OrderItemSingleView() {
  const dispatch = useDispatch()
  const params = useParams()

  const { loading, stages, orderItemDetail } = useSelector(
    state => ({
      stages: state.Orders.orderItemDetail.stages,
      loading: state.Orders.orderDetail.loading,
      orderItemDetail: state.Orders.orderItemDetail,
    })
  )

  useEffect(() => {
    dispatch(getOrderItemDetail(params.id))
  }, [dispatch])


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
                      <Media>
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
                            {orderItemDetail?.price}
                          </p>
                        </Media>
                      </Media>
                    </>
                  )}
                  <CardTitle className="mb-4 mt-4">Stages </CardTitle>

                  {stages?.length > 0 ? <div className="table-responsive">
                    <Table className="table align-middle table-nowrap">
                      <thead className="table-light">
                        <tr>
                          <th>Stage</th>
                          <th>Status</th>
                          <th>QC </th>

                          <th>Note</th>
                        </tr>
                      </thead>
                      <tbody>
                        {map(stages, (item, index) => (
                          <tr key={index}>
                            <td>
                              <h5 className="font-size-13 m-0">
                                <Link to="#" className="text-dark">
                                  {item.stage}
                                </Link>
                              </h5>
                            </td>
                            <td>
                              <h5
                                className="font-size-13 m-0"
                                style={{ whiteSpace: "break-spaces" }}
                              >
                                <Link to="#" className="text-dark">
                                  {item.status}
                                </Link>
                              </h5>
                            </td>
                            <td>

                              <h5 className="font-size-13 m-0">
                                <Link to="#" className="text-dark">
                                  {item.qc_name}
                                </Link>
                              </h5>

                            </td>

                            <td>
                              <h5 className="font-size-13 m-0">
                                <Link to="#" className="text-dark">
                                  {item.price}
                                </Link>
                              </h5>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div> : <p className="text-warning">No stages for this item, <Link to={`/stage/create?${orderItemDetail?.auto_id}`} className="badge bg-success mx-4 p-2">Add Stage Now</Link></p>}
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
