import React, { useEffect, useState } from "react"
import { Row, Col, Card, CardBody, Spinner } from "reactstrap"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { map, range } from "lodash"

// datatable related plugins
import BootstrapTable from "react-bootstrap-table-next"
import ToolkitProvider from "react-bootstrap-table2-toolkit"

//actions
import { getDealers } from "store/actions"

import "../../assets/scss/datatables.scss"

const Dealers = () => {
  const dispatch = useDispatch()
  const [searchText, setSearchText] = useState("")
  const [page, setPage] = useState(1)
  const { dealers, loading } = useSelector(state => ({
    dealers: state.Dealers.dealers,
    loading: state.Dealers.loading,
  }))

  const totalPages = Math.ceil(dealers?.count / 10)
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
    if (pages.length < 3) {
      return pages
    } else if (page >= pages.length) {
      return range(page - 4, page)
    } else if (page < 2) {
      return range(page, page + 4)
    } else {
      return range(page - 2, page + 2)
    }
  }

  useEffect(() => {
    dispatch(getDealers(searchText, pageSend()))
  }, [dispatch, page, searchText])

  const columns = [
    {
      dataField: "name",
      text: "Name",
      sort: true,
    },
    {
      dataField: "phone",
      text: "Phone",
    },
    {
      dataField: "email",
      text: "Email",
    },
    {
      dataField: "location",
      text: "Location",
    },
    {
      dataField: "profit",
      text: "Profit",
    },
    {
      dataField: "action",
      text: "Action",
    },
  ]

  const dealersData = map(dealers?.results, (item, index) => ({
    ...item,
    key: index,
    name: item && item.account && item.account.username,
    phone: item && item.account && item.account.phone,
    email: item && item.account && item.account.email,
    action: (
      <div>
        <Link to={`/dealers/${item?.id}`} className="btn-light btn-sm">
          View
        </Link>
      </div>
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
        <Col className="col-12">
          <Card>
            <CardBody>
              <ToolkitProvider
                keyField="id"
                columns={columns}
                data={dealersData}
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
                            </form>
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
                            <div className="table-responsive">
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
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default Dealers
