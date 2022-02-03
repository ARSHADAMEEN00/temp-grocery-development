import ProductionOrder from "pages/QcInscpection/TablelistDatatable"
import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { Card, CardBody, CardText, CardTitle, Col, Row } from "reactstrap"
import PendingStage from "./PendingStage"

function QCDashboard() {
  const dispatch = useDispatch()

  useEffect(() => {}, [dispatch])

  return (
    <div>
      <Row>
        <Col>
          <ProductionOrder />
        </Col>
        <Col lx="3" lg="3">
          <PendingStage />
        </Col>
      </Row>
    </div>
  )
}

export default QCDashboard
