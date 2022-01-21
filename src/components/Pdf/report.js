import React, { useEffect, useRef } from "react"
import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  Col,
  Container,
  Row,
  Table,
} from "reactstrap"
import { PDFExport } from "@progress/kendo-react-pdf"
import Breadcrumb from "../Common/Breadcrumb"
import { MetaTags } from "react-meta-tags"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import moment from "moment"
import { map } from "lodash"
import { API_URL } from "helpers/api_methods"

const PDFGenerator = () => {
  const PDFExpoertComponent = useRef(null)

  //redux state
  const { quotationCurd, AllQProducts, QuotationItems, quotationDetails } = useSelector(state => ({
    quotationCurd: state.Orders.quotationCurd,
    AllQProducts: state.Orders.AllQProducts,
    QuotationItems: state.Orders.quotation.quotationitem,
    quotationDetails: state.Orders.quotationDetails
  }))

  const quotationDataCurd = AllQProducts?.filter((item) => {
    return QuotationItems?.some((item2) => {
      return item2.product === item.id
    })
  })

  setTimeout(() => {
    PDFExpoertComponent.current.save()
    window.print()
  }, 1000);


  const IMG_API = API_URL?.split("/api/v1")[0]




  return (
    <>
      <MetaTags>
        <title>Quotation | Indtech </title>
      </MetaTags>

      <div className="page-content">
        <Breadcrumb title="Quotation" breadcrumbItem="Quotation PDF" />
        <PDFExport ref={PDFExpoertComponent} paperSize="A3" >
          <Card className="">
            <CardBody>
              <CardTitle>Indtech</CardTitle>
              <CardSubtitle className="mb-3">
                <h6>
                  Date :{" "}
                  {moment(quotationDetails ? quotationDetails?.date_added : quotationCurd?.date_added).format("DD/MM/YYYY")}
                </h6>
                <h6>
                  Quotation NO : {`${quotationDetails && quotationDetails?.auto_id || quotationCurd && quotationCurd?.auto_id}`}
                </h6>

                <h5 className="mt-4">To,</h5>
                <h6>{quotationDetails ? quotationDetails?.client_name : quotationCurd?.client_name}</h6>
                <h6>{quotationDetails && quotationDetails?.client_address}</h6>
                <p className="pt-3 pb-4">
                  Dear Sir, <br />
                  As per your discussion With Mr Salam, we are hereby quoting
                  our best price for your kind perusal
                </p>
              </CardSubtitle>

              <div className="table-responsive">
                <Table className="table mb-0">
                  <thead>
                    <tr>
                      <th>DESCRIPTION</th>
                      <th>IMAGE</th>
                      <th>RATE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {quotationDetails?.quotationitem && <>
                      {map(quotationDetails?.quotationitem, (quotation, key) => (
                        <tr key={key}>
                          <td>
                            <h3 className="text-info font-size-16">
                              {quotation?.product.name}
                            </h3>
                            <p>Description : </p>
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
                          <td style={{ maxWidth: "300px" }}>
                            <img
                              src={quotation?.product.image}
                              alt="product"
                              id="expandedImg1"
                              className="img-fluid mx-auto d-block"
                            />
                          </td>
                          <td><h4 className="text-info d-flex">
                            <i className="bx bx-rupee" />{quotation?.price}
                          </h4>
                          </td>
                        </tr>
                      ))}
                    </>


                    }
                    {quotationDataCurd &&
                      <>

                        {map(quotationDataCurd, (item, key) => (
                          <tr key={key}>
                            <th scope="row">1</th>
                            <td>
                              <h3 className="text-info font-size-16">
                                {item?.name}
                              </h3>
                              <p>Description : </p>
                              <ul>
                                {map(
                                  item?.productdetail?.filter(
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
                                    item?.productdetail?.filter(
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
                            <td style={{ maxWidth: "300px" }}>

                              <img
                                src={`${IMG_API}${item?.image}`}
                                alt="product"
                                id="expandedImg1"
                                className="img-fluid mx-auto d-block"
                              />
                            </td>
                            <td>
                              <h4 className="text-info d-flex">
                                <i className="bx bx-rupee" />{item?.cost}
                              </h4></td>
                          </tr>
                        ))}
                      </>
                    }

                  </tbody>
                </Table>
              </div>
            </CardBody>
          </Card>
        </PDFExport>
      </div>
    </>
  )
}

export default PDFGenerator
