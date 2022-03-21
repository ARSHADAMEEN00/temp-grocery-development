import React from "react"
import { Container, Row } from "reactstrap"
import { MetaTags } from "react-meta-tags"

import Breadcrumbs from "../../../components/Common/Breadcrumb"
import OrderStatus from "./OrderStatus"
import OrderItems from "./OrderItems"
import OrderRawmaterial from "./OrderRawmaterial"

function OrderDetails() {
  return (
    <>
      <MetaTags>
        <title>Order | Indtech </title>
      </MetaTags>

      <div className="page-content">
        <Breadcrumbs title="Orders" breadcrumbItem="Order" />
        <Container fluid>
          <div className="container-fluid">
            <Row>
              <OrderStatus />
            </Row>
            <Row>
              <OrderItems />
            </Row>
            <Row>
              <OrderRawmaterial />
            </Row>
          </div>
        </Container>
      </div>
    </>
  )
}

export default OrderDetails
