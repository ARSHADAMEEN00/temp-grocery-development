import React from "react"
import { Container } from "reactstrap"
import { MetaTags } from "react-meta-tags"

import Breadcrumbs from "../../components/Common/Breadcrumb"
import DatatableTables from "./DatatableTables"

function ProductionStages() {
  return (
    <>
      <MetaTags>
        <title>All Production Stages | Indtech </title>
      </MetaTags>
      <div className="page-content">
        <Breadcrumbs title="Dashboard" breadcrumbItem="Production Stages" />
        <Container fluid>
          <div className="container-fluid">
            <DatatableTables />
          </div>
        </Container>
      </div>
    </>
  )
}

export default ProductionStages
