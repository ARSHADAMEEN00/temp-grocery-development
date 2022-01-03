import React from "react"
import { Container } from "reactstrap"
import { MetaTags } from "react-meta-tags"

import Breadcrumbs from "../../../components/Common/Breadcrumb"
import FinishedProductList from "./tasks"

function FinishedProduct() {
  return (
    <>
      <MetaTags>
        <title>Finished Products | Indtech </title>
      </MetaTags>
      <div className="page-content">
        <Breadcrumbs title="Product" breadcrumbItem="Finished Product" />
        <Container fluid>
          <FinishedProductList />
        </Container>
      </div>
    </>
  )
}

export default FinishedProduct
