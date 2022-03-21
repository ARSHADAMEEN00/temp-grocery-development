import React, { useEffect } from "react"
import { Card, CardBody, CardSubtitle, CardTitle, Col, Table } from "reactstrap"
import { MetaTags } from "react-meta-tags"
import { useSelector } from "react-redux"
import moment from "moment"
import { map } from "lodash"

//componetns
import Breadcrumb from "../Common/Breadcrumb"
//images
import logo from "../../assets/images/logo/Indtech.png"

const WorkOrderPDFGenerator = () => {
  //redux state
  const { orderDetail } = useSelector(state => ({
    orderDetail: state.Orders.orderDetail,
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
        <Breadcrumb title="Orders" breadcrumbItem="work Orders PDF" />
        <Card className="print-boxshadow">
          <CardBody className="print-boxshadow">
            <div className="text-center mb-4">
              <img
                src={logo}
                alt="indetch-logo"
                height={60}
                className=" mx-auto"
              />
            </div>
            <CardTitle
              style={{ textAlign: "center" }}
              className="mb-0 font-size-22 print-pb-3"
            >
              Work Order
            </CardTitle>

            <Col>
              <CardBody className="print-boxshadow">
                <div className="table-responsive">
                  <Table className="table mb-0">
                    <tbody>
                      <tr>
                        <td className="bg-info text-white borderBottomWhite myWidth20 bg-info-new">
                          CLIENT NAME
                        </td>
                        <td className="bg-light text-dark borderBottomWhite myWidth30 bg-light-new">
                          {orderDetail?.client_name}
                        </td>
                        <td className="bg-info text-white borderBottomWhite myWidth20 bg-info-new">
                          CLIENT PHONE
                        </td>
                        <td className="bg-light text-dark borderBottomWhite myWidth30 bg-light-new">
                          {orderDetail?.client_phone}
                        </td>
                      </tr>
                      <tr>
                        <td className="bg-info text-white borderBottomWhite bg-info-new">
                          ORDER NUMBER
                        </td>
                        <td className="bg-light text-dark borderBottomWhite bg-light-new">
                          {orderDetail?.auto_id}
                        </td>
                        <td className="bg-info text-white borderBottomWhite bg-info-new">
                          ORDER RECEIVED BY
                        </td>
                        <td className="bg-light text-dark borderBottomWhite bg-light-new"></td>
                      </tr>
                      <tr>
                        <td className="bg-info text-white borderBottomWhite bg-info-new">
                          {/* ORDER DATE */}
                          START DATE
                        </td>
                        <td className="bg-light text-dark borderBottomWhite bg-light-new">
                          {moment(orderDetail?.start_date).format("DD/MM/YYYY")}
                        </td>
                        <td className="bg-info text-white borderBottomWhite bg-info-new">
                          {/* DISPATCH DATE */}
                          END DATE
                        </td>
                        <td className="bg-light text-dark borderBottomWhite bg-light-new">
                          {moment(orderDetail?.end_date).format("DD/MM/YYYY")}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                  <div
                    style={{ minHeight: "150px" }}
                    className="bg-light mt-2 bg-light-new"
                  >
                    <h6 className="p-2 pt-3 ">
                      DELIVERY ADDRESS : {orderDetail?.client_address}
                    </h6>
                  </div>
                </div>
              </CardBody>
            </Col>
            <Col>
              <CardBody className="print-boxshadow">
                <div className="table-responsive mt-3">
                  <Table className="mb-0 table-bordered font-size-14">
                    <thead className="table-info">
                      <tr>
                        <th>Product Code</th>
                        <th>Product Name</th>

                        <th>Qty</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderDetail?.orderitem && (
                        <>
                          {map(orderDetail?.orderitem, (orderItem, key) => (
                            <tr key={key}>
                              <td
                                className="text-info font-size-16"
                                style={{ fontWeight: 900 }}
                              >
                                {orderItem?.product?.product_code}
                              </td>
                              <td style={{ maxWidth: "300px" }}>
                                <h3 className="font-size-13">
                                  {orderItem?.product?.name}
                                </h3>
                              </td>

                              <td>{orderItem?.quantity}</td>
                            </tr>
                          ))}
                        </>
                      )}
                    </tbody>
                  </Table>
                </div>
              </CardBody>
            </Col>
            <Col>
              <CardBody className="print-boxshadow">
                <CardSubtitle className="mb-3 print-pt-3"></CardSubtitle>

                <div className="table-responsive">
                  <Table className="table table-bordered mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>PREPARED BY</th>
                        <th>CHECKED BY SALES DEPT</th>
                        <th>CHECKED BY PRODUCTION DEPT</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ height: "85px" }}>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </CardBody>
            </Col>
          </CardBody>
        </Card>
      </div>
    </>
  )
}

export default WorkOrderPDFGenerator
