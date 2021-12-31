import React, { useState } from "react"
import { Col, Card, CardBody, Table } from "reactstrap"

//redux
import { useSelector } from "react-redux"
import { map } from "lodash"
import { Link } from "react-router-dom"

const FinishedProduct = props => {
  const [seletedMonth, setSeletedMonth] = useState("jan")

  const onChangeMonth = value => {
    setSeletedMonth(value)
  }

  const { finishedProduct } = useSelector(state => ({
    finishedProduct: state.Products.finishedProduct,
  }))

  return (
    <React.Fragment>
      <Col xl="12">
        <Card>
          <CardBody>
            <div className="clearfix">
              {/* <div className="float-end">
                <div className="input-group input-group-sm">
                  <select
                    className="form-select form-select-sm"
                    value={seletedMonth}
                    onChange={e => {
                      onChangeMonth(e.target.value)
                    }}
                  >
                    <option value="jan">Jan</option>
                    <option value="dec">Dec</option>
                    <option value="nov">Nov</option>
                    <option value="oct">Oct</option>
                  </select>
                  <label className="input-group-text">Month</label>
                </div>
              </div> */}
              <h4 className="card-title mb-4">Products</h4>
            </div>

            <div className="text-muted text-center">
              <p className="mb-2">Total Finished Products </p>
              <h4>
                {finishedProduct?.count == 0 ? (
                  <>
                    <p className="text-info font-size-14 mt-3">
                      No Finished Product yet!
                    </p>
                    <div className="float-end">
                      <Link
                        to="/product/finished"
                        className="mb-0 mx-4 d-flex align-items-center text-info font-size-14"
                      >
                        Add New
                        <i className="bx bx-cookie bx-fade-right bx-sm" />
                      </Link>
                    </div>
                  </>
                ) : (
                  finishedProduct?.count
                )}
              </h4>
            </div>

            <div className="table-responsive mt-4">
              <Table className="table align-middle mb-0">
                <tbody>
                  {map(finishedProduct?.results, (item, index) => (
                    <tr key={index}>
                      <td>
                        <h5 className="font-size-14 mb-1">
                          {item.product_name}
                        </h5>
                        <p className="text-muted mb-0">
                          id - {item.supervisor_schedule_item_auto_id}
                        </p>
                      </td>
                      <td>
                        <h5 className="font-size-14 mb-1">
                          {item.qc_username}
                        </h5>
                      </td>
                      <td>
                        <p
                          className={`mb-1 text-${
                            item.qc_status == "Approved" ? "success" : "info"
                          }`}
                        >
                          {item.qc_status}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  )
}

export default FinishedProduct
