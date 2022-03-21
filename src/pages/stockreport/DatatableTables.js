import React, { useEffect } from "react"
import { Row, Col, CardBody, Spinner, Badge } from "reactstrap"
import { useDispatch, useSelector } from "react-redux"
import { map } from "lodash"
import PropTypes from "prop-types"

// datatable related plugins
import BootstrapTable from "react-bootstrap-table-next"
import ToolkitProvider from "react-bootstrap-table2-toolkit"

//actions
import { getStockreport } from "store/actions"

import "../../assets/scss/datatables.scss"
// import MyPagination from "components/Common/MyPagination"

const StockreportTable = ({ orderStatus, title }) => {
  const dispatch = useDispatch()
  // const [page, setPage] = useState(1)
  // const [searchText, setSearchText] = useState("")
  const { stockreport, loading } = useSelector(state => ({
    stockreport: state.Dashboard.stockreport,
    loading: state.Dashboard.loading,
  }))

  //page
  // const totalPages = Math.ceil(orders?.count / 10)
  // const pages = range(1, totalPages + 1)

  // const pageSend = () => {
  //   if (page >= pages.length) {
  //     return pages.length
  //   }
  //   if (page < 1) {
  //     return 1
  //   } else {
  //     return page
  //   }
  // }
  const total = stockreport[stockreport.length - 1]

  useEffect(() => {
    dispatch(getStockreport())
  }, [dispatch])

  const columns = [
    {
      dataField: "name",
      text: "Name",
      sort: true,
    },
    {
      dataField: "stock",
      text: "Stock",
      sort: true,
    },
    {
      dataField: "price",
      text: "Price",
    },
    {
      dataField: "total",
      text: "Total",
    },

  ]
  const Status = stock => {

    if (stock === 0) {
      return "warning"
    } else if (stock <= 10) {
      return "info"
    } else {
      return "secondary"
    }
  }

  const ordersData = map(stockreport, (item, index) => ({
    ...item,
    id: index,
    stock: <>
      <Badge
        className={"font-size-12 badge-soft-" + `${Status(item.stock)}`}
        pill
      >
        {item.stock}
      </Badge>
    </>
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

  // const handleSearch = e => {
  //   setSearchText(e.target.value)
  // }

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
                    {/* <Row className="mb-2">
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
                    </Row> */}
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
                                striped={true}
                                defaultSorted={defaultSorted}
                                selectRow={selectRow}
                                classes={"table align-middle table-nowrap"}
                                headerWrapperClasses={"thead-light"}
                                {...toolkitProps.baseProps}
                              />
                            </div>
                          </Col>
                        </Row>
                        <h6 style={{
                          width: "fit-content",
                          marginLeft: "auto",
                          fontWeight: 600,

                        }}>Total Price :{" "}<i className="bx bx-rupee" />{total?.total_price}</h6>
                        {/* <MyPagination
                          pages={pages}
                          clcickedPage={page}
                          onNunClick={item => setPage(item)}
                          onNextClick={() => setPage(page + 1)}
                          onPrevClick={() => setPage(page - 1)}
                          onFastNextClick={() => setPage(pages.length)}
                          onFastPrevClick={() => setPage(1)}
                          apiPage={pageSend}
                        /> */}
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

export default StockreportTable

StockreportTable.propTypes = {
  orderStatus: PropTypes.string,
  title: PropTypes.string,
}
