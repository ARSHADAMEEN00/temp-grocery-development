import Products from "pages/Product/DatatableTables"
import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Col, Row } from "reactstrap"

//actions
import { getProducts } from "store/actions"

//componets

function SalesmanDashboard() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch])

  return (
    <div>
      <Row>
        <Products />
      </Row>
    </div>
  )
}

export default SalesmanDashboard
