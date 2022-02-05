import React, { useEffect, useState } from "react"
import { Row, Col, Card, CardBody, Badge, Spinner } from "reactstrap"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { map, range } from "lodash"
import PropTypes from "prop-types"

// datatable related plugins
import BootstrapTable from "react-bootstrap-table-next"
import ToolkitProvider from "react-bootstrap-table2-toolkit"

//actions
import { getOrders } from "store/orders/actions"

import "../../assets/scss/datatables.scss"
import MyPagination from "components/Common/MyPagination"

const OrderHistory = ({ orderStatus, title }) => {
  const dispatch = useDispatch()
  const [page, setPage] = useState(1)
  const [searchText, setSearchText] = useState("")
  const { orders, loading } = useSelector(state => ({
    orders: state.Orders.orders,
    loading: state.Orders.loading,
  }))

  //page
  const totalPages = Math.ceil(orders?.count / 10)
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

  useEffect(() => {
    dispatch(getOrders(searchText, pageSend(), orderStatus))
  }, [dispatch, page, searchText, orderStatus])

  const columns = [
    {
      dataField: "auto_id",
      text: "Order Id",
      sort: true,
    },
    {
      dataField: "quotation_id",
      text: "Quotation Id",
      sort: true,
    },
    {
      dataField: "start_date",
      text: "Start Date",
    },
    {
      dataField: "duration",
      text: "Duration",
    },
    {
      dataField: "bill_amount",
      text: "Total Amount",
    },
    {
      dataField: "status",
      text: "Status",
      sort: true,
    },
    {
      dataField: "action",
      text: "Action",
    },
  ]

  const Status = status => {
    if (status == "Pending") {
      return "info"
    }
    if (status == "Finished") {
      return "success"
    }
    if (status == "Shipped") {
      return "success"
    }
    if (status == "Delivered") {
      return "success"
    }
    if (status == "Started") {
      return "warning"
    }
  }

  const pendingOrder = orders?.results?.filter(item => item.status == "Pending")

  const handleOrder = () => {
    if (window.location.search) {
      return pendingOrder
    } else {
      orders?.results
    }
  }

  const ordersData = map(orders?.results, (item, index) => ({
    ...item,
    key: index,
    quotation_id: <p>{item.quotation_id ? item.quotation_id : "Null"}</p>,
    status: (
      <div
        className="d-flex"
        style={{
          maxWidth: "120px",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Badge
          className={"font-size-12 badge-soft-" + `${Status(item.status)}`}
          pill
        >
          {item.status}
        </Badge>
      </div>
    ),
    action: (
      <Link
        type="button"
        className="btn-sm btn-info btn-rounded"
        to={`/orders/${item?.id}`}
      >
        View
      </Link>
    ),
  }))

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

  const handleSearch = e => {
    setSearchText(e.target.value)
  }

  return (
    <React.Fragment>
      <Row>
        {ordersData.length > 0 ? (
          <Col className="col-12">
            <CardBody>
              <ToolkitProvider
                keyField="id"
                columns={columns}
                data={ordersData}
                search
              >
                {toolkitProps => (
                  <React.Fragment>
                    <Row className="mb-2">
                      <Col md="4">
                        <div className="search-box me-2 mb-2 d-inline-block">
                          <div className="position-relative">
                            <form
                              className="app-search d-lg-block"
                              onChange={e => handleSearch(e)}
                            >
                              <div className="position-relative">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Search..."
                                  defaultValue={searchText}
                                />
                                <span className="bx bx-search-alt" />
                              </div>
                            </form>{" "}
                          </div>
                        </div>
                      </Col>
                      <Col md="4"></Col>
                      <Col
                        md="4"
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          alignItems: "center",
                        }}
                      >
                        {window.location.search && (
                          <Link to="/orders" className="btn btn-light btn-sm">
                            See All
                            <i className="bx bx-right "></i>
                          </Link>
                        )}
                      </Col>
                    </Row>
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
                        <MyPagination
                          pages={pages}
                          clcickedPage={page}
                          onNunClick={item => setPage(item)}
                          onNextClick={() => setPage(page + 1)}
                          onPrevClick={() => setPage(page - 1)}
                          onFastNextClick={() => setPage(pages.length)}
                          onFastPrevClick={() => setPage(1)}
                          apiPage={pageSend}
                        />
                      </>
                    )}
                  </React.Fragment>
                )}
              </ToolkitProvider>
            </CardBody>
          </Col>
        ) : (
          <p className="text-warning p-4">No {title}</p>
        )}
      </Row>
    </React.Fragment>
  )
}

export default OrderHistory

OrderHistory.propTypes = {
  orderStatus: PropTypes.string,
  title: PropTypes.string,
}
