
import React, { useEffect } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { MetaTags } from "react-meta-tags";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import Breadcrumbs from "../Common/Breadcrumb"

const PDFGenerator = () => {
  useEffect(() => {
    const content = document.getElementById("myPDF");
    window.html2canvas = html2canvas;
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "px"
      // format: [4, 2]
    })

    if (content) {
      doc.html(content, {
        callback: function (doc) {
          doc.save();
        }
      })
    }
  }, [])

  return (<>

    <MetaTags>
      <title>Product | Indtech </title>
    </MetaTags>
    <div className="page-content">
      <Breadcrumbs title="Products" breadcrumbItem="Product" />
      <Container fluid>
        <div className="container-fluid">
          <Row>
            <Col>
              <Card>
                <div className="App content-22" id="myPDF">
                  <h1>hi</h1>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </Container>

    </div>

  </>)
}

export default PDFGenerator
























