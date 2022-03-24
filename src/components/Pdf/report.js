import React, { useEffect } from "react"
import {
  Card,
  CardBody,
  CardFooter,
  CardSubtitle,
  CardTitle,
  Col,
  Row,
  Table,
} from "reactstrap"
import { MetaTags } from "react-meta-tags"
import { useDispatch, useSelector } from "react-redux"
import moment from "moment"
import { map } from "lodash"
import { Markup } from 'interweave';

import Breadcrumb from "../Common/Breadcrumb"

//images
import logo from "../../assets/images/logo/Indtech.png"
import { getQuotationDetail } from "store/actions"
import { useParams } from "react-router-dom"

const PDFGenerator = () => {
  const params = useParams()
  const dispatch = useDispatch()

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

  useEffect(() => {
    dispatch(getQuotationDetail(params?.id))
  }, [])


  const letterHead = quotationDetails?.letter_head
  const bank_details = quotationDetails?.bank_details
  const trems_and_conditions = quotationDetails?.terms
  const warrenty = quotationDetails?.warrenty


  const download = () => {
    window.print()
  }

  return (
    <>
      <MetaTags>
        <title> &nbsp; </title>
      </MetaTags>
      <div className="page-content">
        <Breadcrumb title="Quotation" breadcrumbItem="Quotation PDF" />
        <Card className="p-4">
          <div
            type="button"
            className="btn btn-outline-light d-flex display-none"
            style={{
              marginLeft: "auto",
              alignItems: "center",
              width: "fit-content",
              border: "1px solid #cccc",
            }}
            onClick={download}
          >
            PDF
            <i className="mdi mdi-download d-block font-size-16 mx-1"></i>
          </div>
          <CardBody>
            <CardTitle>
              <img
                src={logo}
                alt="indetch-logo"
                height={80}
                className=" mx-auto"
              />
            </CardTitle>

            {/* <CardTitle
              style={{ textAlign: "center" }}
              className="mb-0 mt-4 font-size-18"
            >
              Quotation
            </CardTitle> */}
            <CardSubtitle className="mb-2 mt-2">
              <Row style={{ alignItems: "end" }}>
                <Col lg={6}>
                  <h6>
                    Date :
                    {moment(quotationDetails?.date_added).format("DD/MM/YYYY")}
                  </h6>
                  <h6>
                    <span style={{ fontWeight: 600 }}>Quotation No :{" "}
                      {`${quotationDetails && quotationDetails?.auto_id}`}</span>
                  </h6>
                  <div className="mt-2">
                    <h5 >To,</h5>
                    <h5 style={{ paddingLeft: "1rem" }}>{quotationDetails?.client_name}</h5>
                    <h5 style={{ paddingLeft: "1rem" }}>{quotationDetails?.client_address}</h5>
                  </div>
                </Col>

              </Row>
            </CardSubtitle>

            <CardSubtitle className="">
              <Markup content={letterHead} />
            </CardSubtitle>

            <div className="table-responsive">
              <Table className="table mb-0 table-bordered">
                <thead>
                  <tr>
                    <th>NO</th>
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
                              {key + 1}
                            </td>
                            <td>
                              <h3 className="text-info font-size-16 mb-4">
                                {quotation?.product.name}
                              </h3>
                              <img
                                src={quotation?.product.image}
                                alt="product"
                                id="expandedImg1"
                                className="d-block mb-5 pb-4"
                                style={{ maxWidth: "300px" }}
                              />
                              <h6 className="" style={{ fontSize: "14px" }}>Description : </h6>
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

                              </ul>
                              <div className="mt-4">
                                {map(
                                  quotation?.product?.productdetail?.filter(
                                    item => item.is_description == false
                                  ),
                                  (des2, deskey2) => (
                                    <div key={deskey2} className="pb-3">
                                      <h5 style={{ fontSize: "14px" }}>{des2.title}</h5>
                                      <p>{des2.detail}</p>
                                    </div>
                                  )
                                )}
                              </div>
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

            <div className="p-2 pt-4 pb-4 mt-4">
              <div style={{
                border: "1px solid #0000001f",
                padding: "2rem",
              }}>
                <h5 className="mb-3">Account Details :</h5>
                <Markup content={bank_details} />
              </div>

              <p className="mt-4 pt-4 mb-4 pb-4">{quotationDetails.letter_middle}</p>

              <h5 className="mb-2" >TERMS AND CONDITIONS :</h5>
              <Markup content={trems_and_conditions} />

            </div>
            <h5 className="mb-2" >Warranty clause : </h5>

            <Markup content={warrenty} />

            <div style={{ width: "fit-content", marginLeft: "auto" }}>
              <h5 className="mt-5 pt-3">
                Thanking you
              </h5>
              <h5>
                Indtech Healthcare Pvt Ltd
              </h5>
            </div>
            <div style={{ height: "100px" }}>

            </div>
          </CardBody>
          <div style={{
            position: "absolute", bottom: 0,
            width: "100%"
          }}>
            <Row className="">
              <Col className="col-6 " style={{
                display: "flex",
              }}>
                <i style={{
                  fontSize: "22px",
                  color: "#1495d3",
                  padding: "0 1rem"

                }} className="dripicons-location">
                </i>
                <div>
                  <h6 className=""> Plot No: B5, Industrial development plot, Paloor kotta,</h6>
                  <p>Palachode Post, Angadippuram via, Malappuram, Kerala 679338</p>
                </div>
              </Col>
              <Col className="col-6">
                <h6>KOCHI | CALICUT | MALAPPURAM</h6>
                <p>www.indtechhc.com | info@indtechhc.com | +91 7594 822 822</p>
              </Col>
            </Row>
          </div>
        </Card>
      </div>
    </>
  )
}

export default PDFGenerator
