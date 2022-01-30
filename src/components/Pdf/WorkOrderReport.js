import React, { useEffect, useRef } from "react"
import {
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  Table,
} from "reactstrap"
import Breadcrumb from "../Common/Breadcrumb"
import { MetaTags } from "react-meta-tags"
import { useSelector } from "react-redux"
import moment from "moment"
import { map } from "lodash"

const WorkOrderPDFGenerator = () => {

  //redux state
  const { orderDetail } = useSelector(state => ({
    orderDetail: state.Orders.orderDetail,
  }))

  console.log(orderDetail);
  // useEffect(() => {
  //   setTimeout(() => {
  //     window.print()
  //   }, 1000);
  // }, []);

  return (
    <>
      <MetaTags>
        <title>Work Order PDF | Indtech </title>
      </MetaTags>

      <div className="page-content">
        <Breadcrumb title="Orders" breadcrumbItem="work Orders PDF" />
        <Card className="">
          <CardBody>
            <CardTitle style={{ textAlign: "center" }} className="mb-5">Indtech - Work Order</CardTitle>
            <CardSubtitle className="mb-3">
              <h6>
                Client Name :{orderDetail?.client_name}
              </h6>
              <h6>
                Date :{" "}
                {moment(orderDetail?.date_added).format("DD/MM/YYYY")}
              </h6>
              <h6>
                Order NO : {`${orderDetail?.auto_id}`}
              </h6>
              <h6>
                Delivery Address : {`${orderDetail?.client_address}`}
              </h6>

            </CardSubtitle>

            <div className="table-responsive mt-5">
              <Table className="table mb-0">
                <thead>
                  <tr>
                    <th>Product Code</th>
                    <th>Product Name</th>
                    <th>Description</th>
                    <th>Dimension</th>
                    <th>Qty</th>
                  </tr>
                </thead>
                <tbody>
                  {orderDetail?.orderitem && <>
                    {map(orderDetail?.orderitem, (orderItem, key) => (
                      <tr key={key}>
                        <td>
                          <h3 className="text-info font-size-16">
                            {orderItem?.product.name}
                          </h3>
                          <p>Description : </p>
                          <ul>
                            {map(
                              orderItem?.product?.productdetail?.filter(
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
                                orderItem?.product?.productdetail?.filter(
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
                            src={orderItem?.product.image}
                            alt="product"
                            id="expandedImg1"
                            className="img-fluid mx-auto d-block"
                          />
                        </td>
                        <td><h4 className="text-info d-flex">
                          <i className="bx bx-rupee" />{orderItem?.price}
                        </h4>
                        </td>
                      </tr>
                    ))}
                  </>


                  }
                </tbody>
              </Table>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  )
}

export default WorkOrderPDFGenerator
