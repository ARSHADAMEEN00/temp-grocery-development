import React, { useEffect } from "react"
import { Col, Row } from "reactstrap"
import { useDispatch } from "react-redux"

//action
import {
  getDashboardData,
  getDealers,
  getFinishedProduct,
  getOrders,
  getProducts,
  getQltcheckers,
  getSupervisors,
} from "store/actions"

//components
import OutOfStockItems from "./OutOfStockItems"
import FinishedProductList from "./FinishedProduct"
import Transaction from "../Common/Transation"
import MiniWidget from "./mini-widget"
import PendingOrder from "./PendingOrder"
import MiniCards from "./mini-card"
import MonthlyChart from "./MonthlyChart"
import YearlyChart from "./YearlyChart"

function AdminDashboard() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getDealers())
    dispatch(getSupervisors())
    dispatch(getQltcheckers())
    dispatch(getFinishedProduct("", ""))
    dispatch(getOrders("", ""))
    dispatch(getProducts())
    dispatch(getDashboardData())
  }, [dispatch])

  return (
    <Row>
      <Col lx="4" lg="4">
        <PendingOrder />
        <OutOfStockItems />
        <FinishedProductList />
      </Col>
      <Col lx="8" lg="8">
        <Row>
          <MiniWidget />
        </Row>
        <Row>
          <MiniCards />
        </Row>
        <MonthlyChart />
        <YearlyChart />
      </Col>
      <Transaction />
    </Row>
  )
}

export default AdminDashboard
