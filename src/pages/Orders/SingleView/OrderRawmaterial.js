import { map } from "lodash"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { Card, CardBody, CardTitle, Table } from "reactstrap"
import { getOrderDetail, getOrderRawmaterail } from "store/actions"

import logo from "../../../assets/images/logo/Indtech.png"

function OrderRawmaterial() {
  const dispatch = useDispatch()
  const params = useParams()

  const {
    orderRawmaterials,
    orderitemLoading: loading,
    orderDetail,
  } = useSelector(state => ({
    orderRawmaterials: state.Orders.orderRawmaterials,
    loading: state.Orders.loading,
    orderDetail: state.Orders.orderDetail,
  }))

  useEffect(() => {
    dispatch(getOrderRawmaterail(params?.id))
  }, [dispatch, loading])

  useEffect(() => {
    dispatch(getOrderDetail(params.id))
  }, [dispatch])
  const downloadPDF = () => {
    setTimeout(() => {
      window.print()
    })
  }

  return (
    <Card>
      <div className="text-center mb-4 mt-4 d-none display-block">
        <img src={logo} alt="indetch-logo" height={60} className=" mx-auto" />
      </div>
      <CardBody>
        <CardTitle className="d-none display-block">
          {" "}
          Order Id : {orderDetail?.auto_id}
        </CardTitle>
        <CardTitle className="mb-4 mt-2">
          Raw Materails
          <div
            type="button"
            className="btn btn-outline-light d-flex display-none"
            style={{
              marginLeft: "auto",
              alignItems: "center",
              width: "fit-content",
              border: "1px solid #cccc",
            }}
            onClick={downloadPDF}
          >
            Raw Materials PDF
            <i className="mdi mdi-download d-block font-size-16 mx-1"></i>
          </div>
        </CardTitle>

        <div className="table-responsive">
          <Table className="table align-middle table-nowrap">
            <thead className="table-light">
              <tr>
                <th>name</th>
                <th>quantity</th>
                <th>Current Stock</th>
              </tr>
            </thead>
            <tbody>
              {map(orderRawmaterials, (item, index) => (
                <tr key={index}>
                  <td>
                    <h5 className="font-size-13 m-0">
                      <Link to={"!#"} className="text-dark">
                        {item.name}
                      </Link>
                    </h5>
                  </td>
                  <td>
                    <h5
                      className="font-size-13 m-0"
                      style={{ whiteSpace: "break-spaces" }}
                    >
                      <Link to={"!#"} className="text-dark">
                        {item.quantity}
                      </Link>
                    </h5>
                  </td>
                  <td>
                    <div className="d-flex">
                      <Link
                        to="#"
                        className={`badge  ${
                          item.stock === 0 ? "bg-danger" : "bg-info"
                        } text-white font-size-11 me-1`}
                      >
                        {item.stock}
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </CardBody>
    </Card>
  )
}

export default OrderRawmaterial
