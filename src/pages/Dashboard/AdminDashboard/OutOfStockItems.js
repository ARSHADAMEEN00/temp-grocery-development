import { map } from "lodash"
import React from "react"
import { useSelector } from "react-redux"
import { Card, CardBody, CardTitle } from "reactstrap"

const OutOfStockItems = () => {
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
            {dashboardData?.out_of_stock_items?.length > 0 ? (
              <h3>{dashboardData?.out_of_stock_items?.length}</h3>
            ) : (
              <p className="text-info">
                There is no Out Of stock items in store{" "}
              </p>
            )}
          </div>

          <div className="table-responsive mt-4 p-2">
            {map(dashboardData?.out_of_stock_items, (prod, index) => (
              <>
                <p key={index} className="mb-3">
                  <i className="mdi mdi-circle align-middle font-size-10 me-2 text-warning"></i>
                  {prod}
                </p>
              </>
            ))}
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}

export default OutOfStockItems
