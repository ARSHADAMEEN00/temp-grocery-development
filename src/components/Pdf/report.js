
import React, { useEffect, useRef } from "react"
import { Button, Card, CardBody, CardSubtitle, CardTitle, Col, Container, Row, Table } from "reactstrap";
import { PDFExport } from "@progress/kendo-react-pdf"
import Breadcrumb from "../Common/Breadcrumb"
import { MetaTags } from "react-meta-tags"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { getQProductPrice } from "store/actions";


const PDFGenerator = () => {
  const PDFExpoertComponent = useRef(null)
  const params = useParams()
  const dispatch = useDispatch()

  //redux state
  const { QProductPrice, quotationCurd } = useSelector(state => ({
    QProductPrice: state.Orders.QProductPrice,
    quotationCurd: state.Orders.quotationCurd
  }))

  useEffect(() => {
    dispatch(getQProductPrice(params.id))
  }, [])

  const generatePDF = (e) => {
    PDFExpoertComponent.current.save()
  }

  return (<>
    <MetaTags>
      <title>Quotation | Indtech </title>
    </MetaTags>

    <div className="page-content">
      <Breadcrumb title="Quotation" breadcrumbItem="Quotation PDF" />
      <Card>
        <PDFExport ref={PDFExpoertComponent} paperSize="A4">
          <Card>
            <CardBody>
              <CardTitle>Indtech</CardTitle>
              <CardSubtitle className="mb-3">
                <h6>Date : {"dd/mm/yyyy"}</h6>
                <h6>Quotation NO : {"2022-30"}</h6>

                <h5 className="mt-4">To,</h5>
                <h6>Client address</h6>

                <p>Dear Sir, <br />
                  As per your discussion With Mr Salam, we are hereby quoting our best price for your kind perusal
                </p>
              </CardSubtitle>

              <div className="table-responsive">
                <Table className="table mb-0">
                  <thead>
                    <tr>
                      <th>SL NO</th>
                      <th>DESCRIPTION</th>
                      <th>IMAGE</th>
                      <th>RATE</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>Table cell</td>
                      <td>Table cell</td>
                      <td>Table cell</td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>Table cell</td>
                      <td>Table cell</td>
                      <td>Table cell</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>Table cell</td>
                      <td>Table cell</td>
                      <td>Table cell</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </CardBody>
          </Card>
        </PDFExport>
      </Card>
    </div>
  </>)
}

export default PDFGenerator



















