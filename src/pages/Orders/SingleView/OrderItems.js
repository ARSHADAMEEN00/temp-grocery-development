import { map } from "lodash"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { Badge, Card, CardBody, CardTitle, Table } from "reactstrap"

//ations
import { getOrderDetail } from "store/actions"

function OrderItems() {
  const dispatch = useDispatch()
  const params = useParams()
  const { orderitem, orderitemLoading } = useSelector(state => ({
    orderitem: state.Orders.orderDetail.orderitem,
    orderitemLoading: state.Orders.orderitemLoading,
  }))

  useEffect(() => {
    dispatch(getOrderDetail(params.id))
  }, [dispatch, orderitemLoading])

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
                          className="text-dark"
                        >
                          {item.auto_id}
                        </Link>
                      </h5>
                    </td>
                    <td>
                      <h5
                        className="font-size-13 m-0"
                        style={{ whiteSpace: "break-spaces" }}
                      >
                        <Link
                          to={`/products/${item?.product.id}`}
                          className="text-dark"
                        >
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
                      </div>
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
                          className="text-success"
                        >
                          <Badge
                            className={"font-size-14 p-2 badge-soft-success"}
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
