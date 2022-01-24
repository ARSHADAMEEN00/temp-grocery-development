import React from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { Card, CardBody, Media, Spinner } from "reactstrap"

//Simple bar
import SimpleBar from "simplebar-react"
import { map } from "lodash"

//Import Images
import moment from "moment"

const PendingOrder = () => {
  const { orders, loading } = useSelector(state => ({
    orders: state.Orders.orders,
    loading: state.Orders.loading,
  }))
  const pendingOrder = orders?.results?.filter(item => item.status == "Approved")
  const pendingOrderNew = pendingOrder?.slice(0,3)

  return (
    <React.Fragment>
      <Card>
        <CardBody>
          <h4 className="card-title mb-4">New Orders</h4>
          {loading ? (
            <Spinner type="grow" color="gray" />
          ) : pendingOrderNew?.length > 0 ? (
            <SimpleBar style={{ maxHeight: "400px" }}>
              {map(pendingOrderNew, (item, index) => (
                <ul className="list-group mb-1" key={index}>
                  <li className="list-group-item border-0 mb-2">
                    <Media>
                      <div
                        className="me-3"
                        style={{ width: "15px", height: "15px" }}
                      >
                        <span className="avatar-title rounded-circle bg-info"></span>
                      </div>
                      <Media body>
                        <Link to="/orders" className="font-size-14 text-muted">
                          Client : {item?.dealer_name}{" "}
                        </Link>
                        <p className="text-muted font-size-14">
                          <i className="fas fa-rupee-sign mx-2"></i>
                          {item?.bill_amount}
                        </p>

                        <p className="text-muted mb-0">
                          {moment(item?.date_added).format(
                            "DD / MM / yyyy -dddd"
                          )}
                        </p>
                      </Media>
                    </Media>
                  </li>
                </ul>
              ))}

              <div className="float-end ">
                <Link
                  to="/orders/?value=Pending"
                  className="mb-0 mx-4 d-flex align-items-center text-info"
                >
                  See more
                  <i className="bx bx-cookie bx-fade-right bx-sm" />
                </Link>
              </div>
            </SimpleBar>
          ) : (
            <>
              <p className="text-info">No Pending Orders,</p>
              <div className="float-end">
                <Link
                  to="/orders"
                  className="mb-0 mx-4 d-flex align-items-center text-info"
                >
                  See more
                  <i className="bx bx-cookie bx-fade-right bx-sm" />
                </Link>
              </div>
            </>
          )}
        </CardBody>
      </Card>
    </React.Fragment>
  )
}

export default PendingOrder
