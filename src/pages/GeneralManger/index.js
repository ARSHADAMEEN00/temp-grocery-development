import React from "react"
import { Container } from "reactstrap"
import { MetaTags } from "react-meta-tags"

import Breadcrumbs from "../../components/Common/Breadcrumb"
import DatatableTables from "./DatatableTables"

function GeneralManager() {
  return (
    <>
      <MetaTags>
        <title>All General Mangers | Loha </title>
      </MetaTags>
      <div className="page-content">
        <Breadcrumbs title="Dashboard" breadcrumbItem="All General Managers" />
        <Container fluid>
          <div className="container-fluid">
            <DatatableTables />
          </div>
        </Container>
      </div>
    </>
  )
}

export default GeneralManager
