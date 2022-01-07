import React from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { Card, CardBody, Col } from "reactstrap"

const MiniCards = props => {
  const { dashboardData } = useSelector(
    state => ({
      dashboardData: state.Dashboard.dashboardData,
    })
  )

  return (
    <>
      {dashboardData?.next_supervisor_available_day && (
        <Col lg={4}>
          <Link to="/dealers">
            <Card className="mini-stats-wid">
              <CardBody>
                <div className="d-flex flex-wrap">
                  <div className="me-3">
                    <p className="text-muted mb-2">Next Free slot</p>
                    <h5 className="mb-0">
                      {dashboardData?.next_supervisor_available_day}
                    </h5>
                  </div>

                  <div className="avatar-sm ms-auto">
                    <div className="avatar-title bg-light rounded-circle text-primary font-size-20">
                      <i className="bx bxs-book-bookmark"></i>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Link>
        </Col>
      )}


    </>
  )
}

export default MiniCards
