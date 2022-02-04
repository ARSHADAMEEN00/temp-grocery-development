import React, { useEffect } from "react"
import { Col, Row } from "reactstrap"
import { useDispatch } from "react-redux"

//action
import { getDashboardData, getOrders, getQuotations } from "store/actions"

//components
import OutOfStockItems from "./OutOfStockItems"
import PendingOrder from "./PendingOrder"
import NewQuotation from "./NewQuotations"
import YearlyChart from "./YearlyChart"
import MonthlyChart from "./MonthlyChart"
import DashboardCard from "./DashboardCard"

function AdminDashboard() {
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
        <YearlyChart />
        <MonthlyChart />
      </Col>
      <Col lx="4" lg="4">
        <PendingOrder />
        <NewQuotation />
        <OutOfStockItems />
      </Col>
    </Row>
  )
}

export default AdminDashboard
