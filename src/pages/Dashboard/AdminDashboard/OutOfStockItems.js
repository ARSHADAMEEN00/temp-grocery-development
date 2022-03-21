import { map } from "lodash"
import React, { Fragment } from "react"
import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { Card, CardBody, CardTitle } from "reactstrap"

const OutOfStockItems = () => {
  const history = useHistory()
  const { dashboardData } = useSelector(state => ({
    dashboardData: state.Dashboard.dashboardData,
  }))

  return (
    <React.Fragment>
      <Card>
        <CardBody>
          <CardTitle className="mb-4">Out Of Stock Items</CardTitle>
          <div className="text-center">
            <div className="mb-4">
              <i className="bx bxs-layout text-warning display-4" />
            </div>
            {dashboardData?.out_of_stock_items?.length <= 10 ? (
              <h3>{dashboardData?.out_of_stock_items?.length}</h3>
            ) : (
              <p className="text-info">
                There is no Out Of stock items in store{" "}
              </p>
            )}
          </div>

          <div className="table-responsive mt-4 p-2">
            {map(dashboardData?.out_of_stock_items, (prod, index) => (
              <Fragment key={index}>
                <p
                  className="mb-3"
                  style={{ cursor: "pointer" }}
                  onClick={() => history.push("/stores?outOffStock")}
                >
                  <i className="mdi mdi-circle align-middle font-size-10 me-2 text-warning"></i>
                  {prod}
                </p>
              </Fragment>
            ))}
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}

export default OutOfStockItems
