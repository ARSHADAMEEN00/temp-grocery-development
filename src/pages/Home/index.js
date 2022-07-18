import React from "react"
import { MetaTags } from "react-meta-tags"
import { Container } from "reactstrap"

function index() {
  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title> Home</title>
        </MetaTags>
        <Container></Container>
      </div>
    </React.Fragment>
  )
}

export default index
