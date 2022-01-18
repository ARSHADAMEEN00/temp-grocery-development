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
  const params = useParams()
  const dispatch = useDispatch()

  //redux state
  const { QProductPrice, quotationCurd, AllQProducts } = useSelector(state => ({
    QProductPrice: state.Orders.QProductPrice,
    quotationCurd: state.Orders.quotationCurd,
    AllQProducts: state.Orders.AllQProducts,
  }))

  // useEffect(() => {
  //   dispatch(getQProductPrice(params.id))
  // }, [])

  const generatePDF = e => {
    PDFExpoertComponent.current.save()
  }

  const IMG_API = API_URL?.split("/api/v1")[0]

  return (
    <>
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
                  <h6>
                    Date :{" "}
                    {moment(quotationCurd?.date_added).format("DD/MM/YYYY")}
                  </h6>
                  <h6>
                    Quotation NO : {quotationCurd?.auto_id?.split("-")[1]}
                  </h6>

                  <h5 className="mt-4">To,</h5>
                  <h6>{quotationCurd?.client_name}</h6>

                  <p>
                    Dear Sir, <br />
                    As per your discussion With Mr Salam, we are hereby quoting
                    our best price for your kind perusal
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
                      {map(AllQProducts, (item, key) => (
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
                          <td>
                            <img
                              src={`${IMG_API}${item?.image}`}
                              alt="product"
                              id="expandedImg1"
                              className="img-fluid mx-auto d-block"
                            />
                          </td>
                          <td>{item?.cost}</td>
                        </tr>
                      ))}

                    </tbody>
                  </Table>
                </div>
              </CardBody>
            </Card>
          </PDFExport>
        </Card>
      </div>
    </>
  )
}

export default PDFGenerator
