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

//componetns
import Breadcrumb from "../Common/Breadcrumb"
//images
import logo from "../../assets/images/logo/Indtech.png"

const InstallationReport = () => {
  //redux state
  const { orderDetail } = useSelector(state => ({
    orderDetail: state.Orders.orderDetail,
  }))

  // useEffect(() => {
  //   setTimeout(() => {
  //     window.print()
  //   }, 2000)
  // }, [])
  const lines = [1, 2, 3, 4, 5, 6]

  return (
    <>
      <MetaTags>
        <title> &nbsp; </title>
      </MetaTags>
      <div className="page-content">
        <Breadcrumb title="Orders" breadcrumbItem="work Orders PDF" />
        <Card className="print-boxshadow">
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
            Installation Report
          </CardTitle>

          <CardBody className="print-boxshadow">
            <div className="table-responsive">
              <Row className="w-100">
                <Col
                  style={{ minHeight: "150px" }}
                  className="col-7 bg-light mt-2 p-3 m-2"
                >
                  <h5 className="pt-2 pb-2 ">CLIENT DETAIL </h5>
                  <p className="mb-1">NAME : ameen arshad nediya</p>
                  <p className="mb-1">ADDRESS : malappuram </p>
                </Col>
                <Col
                  style={{
                    minHeight: "150px",
                    backgroundColor: "#eff2f6",
                    flex: 1,
                  }}
                  className="bg-ligh col-4  p-3  mt-2 m-2"
                >
                  <span className="">
                    <h5 className="pt-1 pb-2"> PRODUCT DETAILS </h5>
                    <p className="mb-1">DATE OF INSTALLATION : 19/23/2302</p>
                    <p className="mb-1">TECHNICIAN NAME : 19/23/2302</p>
                    <p className="mb-1">
                      MODEL/No of Item :
                      <ul className="mt-1 pl-4">
                        <li> item one</li>
                        <li> item one</li>
                        <li> item one</li>
                        <li> item one</li>
                      </ul>
                    </p>
                  </span>
                </Col>
              </Row>
            </div>
          </CardBody>

          <CardBody className="print-boxshadow">
            <Row className="w-100">
              <Col
                style={{ minHeight: "250px", border: "solid 1px #bec1c3" }}
                className="col-7 mt-2 p-3 m-2"
              >
                <h5 className="pt-2 pb-2 ">DETAIL OF INSTALLATION </h5>
                <ol type="1">
                  {map(lines, (item, key) => (
                    <li className="pb-2" key={key}>
                      <span
                        style={{
                          letterSpacing: "-3px",
                          lineHeight: "30px",
                          color: "#c7cacb",
                        }}
                      >
                        ____________________________________________________________________________________________________________________________
                      </span>
                    </li>
                  ))}
                </ol>
              </Col>
              <Col
                style={{
                  flex: 1,
                  border: "solid 1px #bec1c3",
                }}
                className="bg-ligh col-4  p-3  mt-2 m-2 "
              >
                <span className="">
                  <h5 className="pt-1 pb-2"> REMARKS </h5>
                </span>
              </Col>
            </Row>
          </CardBody>

          <CardBody className="print-boxshadow">
            <Row className="w-100">
              <Col
                style={{
                  minHeight: "150px",
                  border: "solid 1px #bec1c3",
                  flex: 1,
                }}
                className="col-11 mt-2 p-3 m-2"
              >
                <h5 className="pt-2 pb-2 ">CLARIFICATION OF INSTALLATION </h5>
                <p>
                  The material has been installed and is operating in well
                  condition.
                </p>
                <p>
                  By Technician{" "}
                  <span
                    style={{
                      letterSpacing: "-3px",
                      lineHeight: "30px",
                      color: "#c7cacb",
                    }}
                  >
                    _______________________________________________________
                  </span>
                  &nbsp;&nbsp; on Dated &nbsp;&nbsp;
                  <span
                    style={{
                      letterSpacing: "-3px",
                      lineHeight: "30px",
                      color: "#c7cacb",
                    }}
                  >
                    ____________________________________________________
                  </span>
                </p>
                <div
                  className="mt-5 mb-5     d-flex
    justify-content-between
    align-items-center"
                >
                  <h6>Signature of Customer/Seal </h6>
                  <h6>Technician Sign</h6>
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
    </>
  )
}

export default InstallationReport
