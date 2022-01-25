import React, { useEffect } from "react"
import { Button, Col, Row } from "reactstrap"
import { useDispatch } from "react-redux"

//action
import {
  getDashboardData,
  getOrders,
  getQuotations,
} from "store/actions"

//components
import OutOfStockItems from "./OutOfStockItems"
import MiniWidget from "./mini-widget"
import PendingOrder from "./PendingOrder"
import NewQuotation from "./NewQuotations"

function AdminDashboard() {
  const dispatch = useDispatch()

  useEffect(() => {

    dispatch(getOrders("", ""))
    dispatch(getQuotations("", ""))
    dispatch(getDashboardData())
  }, [dispatch])


  return (
    <Row>
      <Col lx="4" lg="4">
        <PendingOrder />
        <NewQuotation />
      </Col>
      <Col lx="8" lg="8">
        <Row>
          <MiniWidget />
        </Row>

        <Col lg={4}>
          <OutOfStockItems />
        </Col>
      </Col>
    </Row>
  )
}

export default AdminDashboard
