import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Card, CardBody, CardText, CardTitle, Col, Row } from "reactstrap"

//actions
import { getOrders, getProducts } from "store/actions"

//componetns
import NewProducts from "./NewProducts"
import MiniWidget from "./mini-widget"
import { Link } from "react-router-dom"

function DealerDashboard() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getOrders("", ""))
    dispatch(getProducts())
  }, [dispatch])

  return (
    <div>
      <Row>
        <Col lx="8" lg="8">
          <NewProducts />
        </Col>
        <Col lx="4" lg="4">
          <MiniWidget />
          <Link to="/order/create">
            <Card color="success" className="text-white-50">
              <CardBody>
                <CardTitle className="mb-4 text-white">
                  <i className="mdi mdi-check-all me-3 bx-fade-right bx-sm" />{" "}
                  Create New Order
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

export default DealerDashboard
