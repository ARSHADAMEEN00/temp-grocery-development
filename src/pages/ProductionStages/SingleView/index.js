import React from "react"
import { Container, Row } from "reactstrap"
import { MetaTags } from "react-meta-tags"

import Breadcrumbs from "../../../components/Common/Breadcrumb"
import OrderStatus from "./OrderStatus"

function stageDetail() {
  return (
    <>
      <MetaTags>
        <title>Stage | Indtech </title>
      </MetaTags>

      <div className="page-content">
        <Breadcrumbs title="Stages" breadcrumbItem="Stage" />
        <Container fluid>
          <div className="container-fluid">
            <Row>
              <OrderStatus />
            </Row>
          </div>
        </Container>
      </div>
    </>
  )
}

export default stageDetail
