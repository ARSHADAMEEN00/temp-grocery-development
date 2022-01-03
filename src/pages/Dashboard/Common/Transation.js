import React, { useEffect, useState } from "react"
import { Row, Col, Card, CardBody, Badge, Spinner } from "reactstrap"
import { useDispatch, useSelector } from "react-redux"

// datatable related plugins
import BootstrapTable from "react-bootstrap-table-next"

import ToolkitProvider from "react-bootstrap-table2-toolkit"
import { map, range } from "lodash"

import "../../../assets/scss/datatables.scss"
import moment from "moment"
import { getBalancetransaction } from "store/actions"

const Transaction = () => {
  const dispatch = useDispatch()

  const [page, setPage] = useState(1)
  const { balanceTransaction, loading } = useSelector(state => ({
    balanceTransaction: state.Supervisors.balanceTransaction,
    loading: state.Supervisors.loading,
  }))

  //page
  const totalPages = Math.ceil(balanceTransaction?.count / 10)
  const pages = range(1, totalPages + 1)

  const pageSend = () => {
    if (page >= pages.length) {
      return pages.length
    }
    if (page < 1) {
      return 1
    } else {
      return page
    }
  }

  const allPages = () => {
    if (page >= pages.length) {
      return range(pages.length, page)
    }
    if (page < 2) {
      return range(page, page + 4)
    } else {
      return range(page - 2, page + 2)
    }
  }
  useEffect(() => {
    dispatch(getBalancetransaction(pageSend()))
  }, [dispatch, page])

  const columns = [
    {
      dataField: "auto_id",
      text: "Trn Id",
    },
    {
      dataField: "date_added",
      text: "Date",
    },
    {
      dataField: "supervisor_name",
      text: "User Name",
      sort: true,
    },
    {
      dataField: "transaction_type",
      text: "Trn Type",
      sort: true,
    },
    {
      dataField: "transaction_amount",
      text: "Amount",
    },
    {
      dataField: "balance",
      text: "Balance",
    },
    {
      dataField: "title",
      text: "Trn Description",
    },
  ]

  const Status = status => {
    if (status == "credit") {
      return "success"
    }
    if (status == "debit") {
      return "warning"
    }
  }

  const balanceTransactionData = map(
    balanceTransaction?.results,
    (item, index) => ({
      ...item,
      key: index,
      date_added: moment(item.date_added).format("DD-MM-YYYY"),
      transaction_type: (
        <div
          className="d-flex"
          style={{
            maxWidth: "120px",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Badge
            className={
              "font-size-12 badge-soft-" + `${Status(item.transaction_type)}`
            }
            pill
          >
            {item.transaction_type}
          </Badge>
        </div>
      ),
    })
  )

  const defaultSorted = [
    {
      dataField: "id",
      order: "asc",
    },
  ]

  // Select All Button operation
  const selectRow = {
    mode: "checkbox",
  }

  return (
    <React.Fragment>
      <Col className="col-12">
        <Card>
          <CardBody>
            <div className="mb-4 h4 card-title">Transaction History</div>
            {balanceTransactionData?.length > 0 ? (
              <ToolkitProvider
                keyField="id"
                columns={columns}
                data={balanceTransactionData}
                search
              >
                {toolkitProps => (
                  <React.Fragment>
                    {loading ? (
                      <Spinner color="secondary" className="d-block m-auto" />
                    ) : (
                      <>
                        <Row>
                          <Col xl="12">
                            <div
                              className="table-responsive"
                              style={{ minHeight: "40vh" }}
                            >
                              <BootstrapTable
                                keyField={"id"}
                                responsive
                                bordered={false}
                                striped={false}
                                defaultSorted={defaultSorted}
                                selectRow={selectRow}
                                classes={"table align-middle table-nowrap"}
                                headerWrapperClasses={"thead-light"}
                                {...toolkitProps.baseProps}
                              />
                            </div>
                          </Col>
                        </Row>
                        <Row
                          className="align-items-md-center mt-30 "
                          style={{ marginTop: "2rem" }}
                        >
                          <Col
                            className="inner-custom-pagination d-flex
                              pagination pagination-rounded justify-content-end mb-2 inner-custom-pagination
                              "
                          >
                            <div className="text-md-right ms-auto overflowScroll">
                              {page <= 1 ? (
                                <></>
                              ) : (
                                <div
                                  className="btn-group me-0 "
                                  role="group"
                                  aria-label="First group"
                                >
                                  <span
                                    style={{
                                      borderRadius: "50%",
                                      border: "none",
                                    }}
                                    className="btn btn-outline-light text-info "
                                    onClick={() => setPage(page - 1)}
                                  >
                                    <i className="fas fa-angle-left"></i>
                                  </span>
                                </div>
                              )}
                              <div
                                className="btn-group me-2 "
                                role="group"
                                aria-label="Second group"
                              >
                                {map(allPages(), (item, index) => (
                                  <span
                                    key={index}
                                    className="btn btn-outline-info"
                                    onClick={() => setPage(item)}
                                    style={{
                                      borderRadius: "50%",
                                      marginLeft: "5px",
                                      marginRight: "5px",
                                      border: "none",
                                      backgroundColor:
                                        pageSend() == item && "#66c2ff",
                                      color: pageSend() == item && "#fff",
                                    }}
                                  >
                                    {item}
                                  </span>
                                ))}
                              </div>{" "}
                              {page >= pages.length ? (
                                <></>
                              ) : (
                                <div
                                  className="btn-group"
                                  role="group"
                                  aria-label="Third group"
                                >
                                  <span
                                    className="btn btn-outline-light text-info"
                                    style={{
                                      borderRadius: "50%",
                                      border: "none",
                                    }}
                                    onClick={() => setPage(page + 1)}
                                  >
                                    <i className="fas fa-angle-right"></i>
                                  </span>
                                </div>
                              )}
                            </div>
                          </Col>
                        </Row>
                      </>
                    )}
                  </React.Fragment>
                )}
              </ToolkitProvider>
            ) : (
              <>
                <p className="font-size-14 text-info">
                  There are No Teansaction Yet!
                </p>
              </>
            )}
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  )
}

export default Transaction
