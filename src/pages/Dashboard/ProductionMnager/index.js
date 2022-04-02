import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Col, Row } from "reactstrap"

//actions
import {
  getDashboardData,
  getOrders,
  getQuotations,
  getStoreItems,
} from "store/actions"

import DashboardCard from "../AdminDashboard/DashboardCard"
import NewQuotation from "../AdminDashboard/NewQuotations"
import OutOfStockItems from "../AdminDashboard/OutOfStockItems"
import PendingOrder from "../AdminDashboard/PendingOrder"

//componets

function ProductionManagerDashboard() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getOrders("", ""))
    dispatch(getQuotations("", ""))
    dispatch(getDashboardData())
  }, [dispatch])

  return (
    <Row>
      <Col lx="8" lg="8">
        <Row>
          <DashboardCard />
        </Row>
      </Col>
      <Col lx="4" lg="4">
        <PendingOrder />
        <NewQuotation />
        <OutOfStockItems />
      </Col>
    </Row>
  )
}

export default ProductionManagerDashboard

// dispatch(getProducts())
// dispatch(getStoreItems())
// dispatch(getStoreSupply())
// dispatch(getOrders("", ""))
// dispatch(getQuotations("", ""))
// dispatch(getDashboardData())
