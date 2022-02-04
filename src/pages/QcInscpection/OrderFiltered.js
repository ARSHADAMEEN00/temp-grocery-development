import React, { useEffect, useState } from "react"
import { Row, Col, Badge, Spinner } from "reactstrap"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { map, range } from "lodash"
// datatable related plugins
import BootstrapTable from "react-bootstrap-table-next"
import ToolkitProvider from "react-bootstrap-table2-toolkit"
import PropTypes from "prop-types"

//actions
import { getOrderItemsByFilted } from "store/orders/actions"

import "../../assets/scss/datatables.scss"
import MyPagination from "components/Common/MyPagination"

const Orders = ({ sort, title }) => {
  const dispatch = useDispatch()
  const [page, setPage] = useState(1)
  const [searchText, setSearchText] = useState("")
  const { orderItemFiltered, loading } = useSelector(state => ({
    orderItemFiltered: state.Orders.orderItemFiltered,
    loading: state.Orders.loading,
  }))

  //page
  const totalPages = Math.ceil(orderItemFiltered?.count / 10)
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
    dispatch(getOrderItemsByFilted(sort, searchText, pageSend()))
  }, [dispatch, searchText, page, sort])

  const columns = [
    {
      dataField: "auto_id",
      text: "Order Id",
      sort: true,
    },

    {
      dataField: "product_name",
      text: "Product",
      sort: true,
    },
    {
      dataField: "quantity",
      text: "Qty",
    },
    {
      dataField: "total_price",
      text: "Price ",
    },
    {
      dataField: "qc_status",
      text: "QC Status",
      sort: true,
    },
    {
      dataField: "store_status",
      text: "Store Status",
      sort: true,
    },
    {
      dataField: "action",
      text: "Action",
    },
  ]

  const WorkStatus = status => {
    if (status == "QC_Ready") {
      return "warning"
    }
    if (status == "QC_Pending") {
      return "info"
    }
    if (status == "QC_Approved") {
      return "success"
    }
  }
  const StoreStatus = status => {
    if (status == "Not Provided") {
      return "info"
    }
    if (status == "Provided") {
      return "success"
    }
  }

  const orderItemData = map(orderItemFiltered?.results, (item, index) => ({
    ...item,
    key: index,
    quotation_id: <p>{item.quotation_id ? item.quotation_id : "Null"}</p>,
    product_name: (
      <h6 style={{ whiteSpace: "break-spaces", maxWidth: "250px" }}>
        {item.product_name}
      </h6>
    ),
    qc_status: (
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
            "font-size-12 badge-soft-" + `${WorkStatus(item.qc_status)}`
          }
          pill
        >
          {item.qc_status}
        </Badge>
      </div>
    ),
    store_status: (
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
            "font-size-12 badge-soft-" + `${StoreStatus(item.store_status)}`
          }
          pill
        >
          {item.store_status}
        </Badge>
      </div>
    ),

    action: (
      <Link
        type="button"
        className="btn-sm btn-info btn-rounded"
        to={`/orderItem/${item?.id}`}
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
        {orderItemData.length > 0 ? (
          <Col className="col-12">
            <ToolkitProvider
              keyField="id"
              columns={columns}
              data={orderItemData}
              search
            >
              {toolkitProps => (
                <React.Fragment>
                  <Row className="mb-2">
                    <Col md="6">
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
          </Col>
        ) : (
          <p className="text-warning p-4">No {title}</p>
        )}
      </Row>
    </React.Fragment>
  )
}

export default Orders

Orders.propTypes = {
  sort: PropTypes.string,
  title: PropTypes.string,
}
