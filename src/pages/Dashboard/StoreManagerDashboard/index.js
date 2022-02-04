import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Col, Row } from "reactstrap"

//actions
import { getProducts, getStoreItems, getStoreSupply } from "store/actions"

//componets
import MiniWidget from "./mini-widget"
import StoreSupplyList from "./tasks"

function StoreManagerDashboard() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProducts())
    dispatch(getStoreItems())
    dispatch(getStoreSupply())
  }, [dispatch])

  return (
    <div>
      <Row>
        <Col lx="8" lg="8">
          <StoreSupplyList />
        </Col>
        <Col lx="4" lg="4">
          <MiniWidget />
        </Col>
      </Row>
      <Row></Row>
    </div>
  )
}

export default StoreManagerDashboard
