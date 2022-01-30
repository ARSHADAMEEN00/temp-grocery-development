import { map } from "lodash"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { Badge, Button, Card, CardBody, CardTitle, Col, Row, Table } from "reactstrap"

//ations
import { getOrderDetail, updateOrderItem } from "store/actions"

function OrderItems() {
  const dispatch = useDispatch()
  const params = useParams()
  const { orderDetail, loading, orderitem, orderitemLoading } = useSelector(
    state => ({
      orderDetail: state.Orders.orderDetail,
      orderitem: state.Orders.orderDetail.orderitem,
      loading: state.Orders.orderDetail.loading,
      orderitemLoading: state.Orders.orderitemLoading,
    })
  )
  const [toggleEdit, setToggleEdit] = useState("")
  const [quantity, setStatus] = useState({
    quantity: "",
  })

  useEffect(() => {
    dispatch(getOrderDetail(params.id))
  }, [dispatch, orderitemLoading])

  const handleToggle = id => {
    setToggleEdit(id)
  }

  function handleSubmit(orderItemId) {
    dispatch(updateOrderItem(quantity, orderItemId))
    setToggleEdit("")
  }
  const Role = sessionStorage.getItem("role")

  return (
    <>
      <Card>
        <CardBody>
          <CardTitle className="mb-4">Orders </CardTitle>

          <div className="table-responsive">
            <Table className="table align-middle table-nowrap">
              <thead className="table-light">
                <tr>
                  <th>Order Item Id</th>
                  <th>Order item</th>
                  <th>Quantity</th>

                  <th>Price</th>
                  <th>Order Item Detail</th>

                </tr>
              </thead>
              <tbody>
                {map(orderitem, (item, index) => (
                  <tr key={index}>
                    <td>
                      <h5 className="font-size-13 m-0">
                        <Link
                          to={`/orderItem/${item?.id}`}
                          className="text-dark">
                          {item.auto_id}
                        </Link>
                      </h5>
                    </td>
                    <td>
                      <h5 className="font-size-13 m-0" style={{ whiteSpace: "break-spaces" }}>
                        <Link
                          to={`/products/${item?.product.id}`}
                          className="text-dark">
                          {item.product.name}
                        </Link>
                      </h5>
                    </td>
                    <td>
                      <div className="d-flex">
                        <Link
                          to="#"
                          className="badge bg-secondary text-white font-size-11 me-1"
                        >
                          {item.quantity}
                        </Link>
                        {/* {orderDetail?.status == "Pending" && (
                          <i
                            title="Update Quantity"
                            className="bx bx-pencil mx-3 "
                            style={{ cursor: "pointer" }}
                            onClick={() => handleToggle(item.id)}
                          ></i>
                        )} */}
                      </div>
                      {/* {toggleEdit == item.id && (
                        <Row style={{ alignItems: "baseline" }}>
                          <Col lg={3} md={3}>
                            <input
                              placeholder={item.quantity}
                              className="form-control mt-3"
                              style={{ maxWidth: "100px" }}
                              type="phone"
                              min="0"
                              onChange={e =>
                                setStatus({
                                  ...quantity,
                                  ["quantity"]: e.target.value,
                                })
                              }
                            />
                          </Col>
                          <Col lg={3} md={3}>
                            <Button
                              type="submit"
                              color="success"
                              className="w-sm"
                              onClick={() => handleSubmit(item.id)}
                            >
                              Submit
                              {loading && (
                                <>
                                  <i className="bx bx-loader bx-spin font-size-16 align-middle me-2"></i>
                                </>
                              )}
                            </Button>
                          </Col>
                        </Row>
                      )} */}
                    </td>

                    <td>
                      <h5 className="font-size-13 m-0">
                        <Link to="#" className="text-dark">
                          {item.total_price}
                        </Link>
                      </h5>
                    </td>
                    <td>
                      <h5 className="font-size-13 m-0">
                        <Link
                          to={`/orderItem/${item?.id}`}
                          className="text-success">
                          <Badge
                            className={
                              "font-size-14 p-2 badge-soft-success"
                            }
                            pill
                          >
                            View
                          </Badge>
                        </Link>
                      </h5>
                    </td>


                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </CardBody>
      </Card>
    </>
  )
}

export default OrderItems
