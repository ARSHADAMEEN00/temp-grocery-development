import React, { useEffect, useState } from "react"
import {
  Row,
  Col,
  Card,
  CardBody,
  Spinner,
  Container,
  Button,
} from "reactstrap"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

// datatable related plugins
import BootstrapTable from "react-bootstrap-table-next"
import { map, range } from "lodash"
import ToolkitProvider from "react-bootstrap-table2-toolkit"
import Breadcrumbs from "../../components/Common/Breadcrumb"

//actions
import {
  deleteDailyWork,
  getDailyWorks,
  getSupervisors,
  updateDailyWork,
} from "store/actions"

import "../../assets/scss/datatables.scss"
import { MetaTags } from "react-meta-tags"
import DailyWorkCreate from "./DailyWorkCreate"

const DailyWorks = () => {
  const dispatch = useDispatch()
  const [page, setPage] = useState(1)
  const [searchText, setSearchText] = useState("")
  const [toggleCrud, setToggleCrud] = useState(false)

  const { loading, dailyWorks } = useSelector(state => ({
    loading: state.Supervisors.dailyWorksLoading,
    dailyWorks: state.Supervisors.dailyWorks,
  }))

  const totalPages = Math.ceil(dailyWorks?.count / 10)
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
    dispatch(getDailyWorks(pageSend()))
  }, [dispatch, page, searchText])

  const columns = [
    {
      dataField: "supervisor_name",
      text: "Name",
      sort: true,
    },
    {
      dataField: "date",
      text: "Date",
    },
    {
      dataField: "cols",
      text: "Cols",
    },

    {
      dataField: "action",
      text: "Action",
    },
  ]
  const [toggleEdit, setToggleEdit] = useState("")
  const [data, setData] = useState({
    Cols: "",
  })

  const handleToggle = id => {
    setToggleEdit(id)
  }
  function handleSubmit(dailyWorks) {
    dispatch(updateDailyWork({ ...dailyWorks, cols: data?.Cols }))
    setToggleEdit("")
  }

  const handleDel = id => {
    dispatch(deleteDailyWork(id))
  }

  const dailyWorksData = map(dailyWorks?.results, (item, index) => ({
    ...item,
    key: index,
    // cols:
    //   toggleEdit == item.id ? (
    //     <>
    //       <Row style={{ alignItems: "baseline" }}>
    //         <Col lg={3} md={3}>
    //           <input
    //             placeholder={item.cols}
    //             className="form-control btn-sm"
    //             style={{ maxWidth: "100px" }}
    //             type="phone"
    //             min="0"
    //             onChange={e =>
    //               setData({
    //                 ...data,
    //                 ["Cols"]: e.target.value,
    //               })
    //             }
    //           />
    //         </Col>
    //         <Col lg={3} md={3}>
    //           <Button
    //             type="submit"
    //             color="success"
    //             className="btn-sm"
    //             onClick={() => handleSubmit(item)}
    //           >
    //             Submit
    //             {loading && (
    //               <>
    //                 <i className="bx bx-loader bx-spin font-size-16 align-middle me-2"></i>
    //               </>
    //             )}
    //           </Button>
    //         </Col>
    //       </Row>
    //     </>
    //   ) : (
    //     item.cols
    //   ),
    action: (
      <div>
        {/* <Button
          className="btn-info btn-sm"
          onClick={() => handleToggle(item.id)}
        >
          Update
        </Button> */}
        <Button
          className="btn-danger btn-sm mx-2"
          onClick={() => handleDel(item.id)}
        >
          Remove
        </Button>
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
      <MetaTags>
        <title>All Supervisors | Indtech </title>
      </MetaTags>
      <div className="page-content">
        <Breadcrumbs title="Dashboard" breadcrumbItem="All Supervisors" />
        <Container fluid>
          <div className="container-fluid">
            <Card>
              <CardBody>
                <ToolkitProvider
                  keyField="id"
                  columns={columns}
                  data={dailyWorksData}
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
                              </form>
                            </div>
                          </div>
                        </Col>
                        <Col
                          md="6 d-flex"
                          style={{
                            alignItems: "center",
                            justifyContent: "right",
                          }}
                        >
                          <div className="search-box me-2 mb-2 d-inline-block">
                            <div className="position-relative">
                              <div className="text-sm-end">
                                <a
                                  href="#dailywork"
                                  type="button"
                                  className="btn-success btn btn-rounded m-0"
                                  onClick={() => setToggleCrud(true)}
                                >
                                  <i className="mdi mdi-plus me-1" />
                                  Create Daily Work
                                </a>
                              </div>
                            </div>
                          </div>
                        </Col>
                      </Row>
                      {loading ? (
                        <Spinner color="secondary" className="d-block m-auto" />
                      ) : (
                        <>
                          <Row>
                            <Col xl="12" id="select-cell">
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
                                {page >= pages.length ? (
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
            <Row id="dailywork">{toggleCrud && <DailyWorkCreate />}</Row>
          </div>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default DailyWorks
