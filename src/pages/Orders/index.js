import React from "react"
import { Container } from "reactstrap"
import { MetaTags } from "react-meta-tags"

import Breadcrumbs from "../../components/Common/Breadcrumb"
import OrdersList from "./TablelistDatatable"

function Orders() {
  return (
    <>
      <MetaTags>
        <title>All Orders | Indtech </title>
      </MetaTags>
      <div className="page-content">
        <Breadcrumbs title="Dashboard" breadcrumbItem="All Orders" />
        <Container fluid>
          <div className="container-fluid">
            <OrdersList />
          </div>
        </Container>
      </div>
    </>
  )
}

export default Orders
