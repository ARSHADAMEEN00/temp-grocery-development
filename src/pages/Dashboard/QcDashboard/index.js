import Orders from "pages/ProductionStages/ProductionOrder/DatatableTables"
import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { Card, CardBody, CardText, CardTitle, Col, Row } from "reactstrap"
import MiniWidget from "./mini-widget"

function QCDashboard() {
  const dispatch = useDispatch()

  useEffect(() => {
  }, [dispatch])

  return (
    <div>
      <Row>
        <Col lx="8" lg="8">
          <Orders />
        </Col>
        <Col lx="4" lg="4">
          <MiniWidget />
          <Link to="/stage/create">
            <Card color="info" className="text-white-50">
              <CardBody>
                <CardTitle className="mb-4 text-white">
                  <i className="mdi mdi-check-all me-3 bx-fade-right bx-sm" />{" "}
                  Create Stage
                </CardTitle>
                <CardText></CardText>
              </CardBody>
            </Card>
          </Link>
        </Col>
      </Row>
    </div>
  )
}

export default QCDashboard
