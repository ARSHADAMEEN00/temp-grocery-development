
import React, { useRef } from "react"
import { MetaTags } from "react-meta-tags";
import { Button, Card, Col, Container, Row } from "reactstrap";
import Breadcrumbs from "../Common/Breadcrumb"
import { PDFExport } from "@progress/kendo-react-pdf"

const PDFGenerator = () => {
  const PDFExpoertComponent = useRef(null)
  const generatePDF = (e) => {
    PDFExpoertComponent.current.save()
  }

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
                <PDFExport ref={PDFExpoertComponent} paperSize="A4">
                  <div className="App content-22" id="myPDF">
                    <h1>hi</h1>
                    <table>
                      <thead>
                        <tr>
                          <th>header1</th>
                          <th>header2</th>
                          <th>header3</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>text1.1</td>
                          <td>text1.2</td>
                          <td>text1.3</td>
                        </tr>
                        <tr>
                          <td>text2.1</td>
                          <td>text2.2</td>
                          <td>text2.3</td>
                        </tr>
                        <tr>
                          <td>text3.1</td>
                          <td>text3.2</td>
                          <td>text3.3</td>
                        </tr>
                        <tr>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </PDFExport>

              </Card>
              <Button onClick={generatePDF}>pdf</Button>
            </Col>
          </Row>
        </div>
      </Container>

    </div>

  </>)
}

export default PDFGenerator
























