import React from "react"
import { MetaTags } from "react-meta-tags"
import { Container } from "reactstrap"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import ProductionOrder from "./TablelistDatatable"

function index() {
  return (
    <>
      <MetaTags>
        <title>All Order Items | Indtech </title>
      </MetaTags>
      <div className="page-content">
        <Breadcrumbs title="Dashboard" breadcrumbItem="All Order Items" />
        <Container fluid>
          <ProductionOrder />
        </Container>
      </div>
    </>
  )
}

export default index
