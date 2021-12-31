import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { Card, CardBody, CardText, CardTitle, Col, Row } from "reactstrap"
import { getFinishedProduct, getProducts } from "store/actions"
import FinishedProduct from "./FinishedProduct"
import MiniWidget from "./mini-widget"

function QCDashboard() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getFinishedProduct("", ""))
    dispatch(getProducts())
  }, [dispatch])

  return (
    <div>
      <Row>
        <Col lx="8" lg="8">
          <FinishedProduct />
        </Col>
        <Col lx="4" lg="4">
          <MiniWidget />
          <Link to="/product/finished?create">
            <Card color="info" className="text-white-50">
              <CardBody>
                <CardTitle className="mb-4 text-white">
                  <i className="mdi mdi-check-all me-3 bx-fade-right bx-sm" />{" "}
                  Add New Finished Product
                </CardTitle>
                <CardText></CardText>
              </CardBody>
            </Card>
          </Link>
        </Col>
      </Row>
      <Row></Row>
    </div>
  )
}

export default QCDashboard
