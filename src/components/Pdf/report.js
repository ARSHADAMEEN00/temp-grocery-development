import React, { useEffect } from "react"
import {
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  Col,
  Row,
  Table,
} from "reactstrap"
import { MetaTags } from "react-meta-tags"
import { useSelector } from "react-redux"
import moment from "moment"
import { map } from "lodash"

import Breadcrumb from "../Common/Breadcrumb"

//images
import logo from "../../assets/images/logo/Indtech.png"

const PDFGenerator = () => {
  //redux state
  const { quotationDetails } = useSelector(state => ({
    quotationCurd: state.Orders.quotationCurd,
    AllQProducts: state.Orders.AllQProducts,
    QuotationItems: state.Orders.quotation.quotationitem,
    quotationDetails: state.Orders.quotationDetails,
  }))

  useEffect(() => {
    setTimeout(() => {
      window.print()
    }, 2000)
  }, [])

  return (
    <>
      <MetaTags>
        <title> &nbsp; </title>
      </MetaTags>
      <div className="page-content">
        <Breadcrumb title="Quotation" breadcrumbItem="Quotation PDF" />
        <Card className="p-2">
          <CardBody>
            <CardTitle>
              <img
                src={logo}
                alt="indetch-logo"
                height={60}
                className=" mx-auto"
              />
            </CardTitle>
            <CardTitle
              style={{ textAlign: "center" }}
              className="mb-0 mt-4 font-size-18"
            >
              Quotation
            </CardTitle>
            <CardSubtitle className="mb-3 mt-5">
              <Row style={{ alignItems: "end" }}>
                <Col lg={6}>
                  <h5 className="">To,</h5>
                  <>
                    <h6>{quotationDetails?.client_name}</h6>
                    <h6>{quotationDetails?.client_address}</h6>
                  </>
                </Col>
                <Col lg={6} className="text-end">
                  <h6>
                    Date :
                    {moment(quotationDetails?.date_added).format("DD/MM/YYYY")}
                  </h6>
                  <h6>
                    Quotation No :{" "}
                    {`${quotationDetails && quotationDetails?.auto_id}`}
                  </h6>
                </Col>
              </Row>
            </CardSubtitle>

            <div className="table-responsive">
              <Table className="table mb-0 table-bordered">
                <thead>
                  <tr>
                    <th>PRODUCT</th>
                    <th>RATE</th>
                  </tr>
                </thead>
                <tbody>
                  {quotationDetails?.quotationitem && (
                    <>
                      {map(
                        quotationDetails?.quotationitem,
                        (quotation, key) => (
                          <tr key={key}>
                            <td>
                              <h3 className="text-info font-size-16">
                                {quotation?.product.name}
                              </h3>
                              <img
                                src={quotation?.product.image}
                                alt="product"
                                id="expandedImg1"
                                className="d-block "
                                style={{ maxWidth: "300px" }}
                              />
                              <p className="">Description : </p>
                              <ul>
                                {map(
                                  quotation?.product?.productdetail?.filter(
                                    item => item.is_description == true
                                  ),
                                  (des, deskey) => (
                                    <li key={deskey} className="pb-2">
                                      <h6>{des.title}</h6>
                                      {des.detail}
                                    </li>
                                  )
                                )}
                                <div className="mt-4">
                                  {map(
                                    quotation?.product?.productdetail?.filter(
                                      item => item.is_description == false
                                    ),
                                    (des2, deskey2) => (
                                      <div key={deskey2} className="pb-3">
                                        <h6>{des2.title}</h6>
                                        <p>{des2.detail}</p>
                                      </div>
                                    )
                                  )}
                                </div>
                              </ul>
                            </td>

                            <td>
                              <h4 className="text-info d-flex">
                                <i className="bx bx-rupee" />
                                {quotation?.price}
                              </h4>
                            </td>
                          </tr>
                        )
                      )}
                    </>
                  )}
                </tbody>
              </Table>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  )
}

export default PDFGenerator
