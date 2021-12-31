import React, { useEffect, useState } from "react"
import {
  Row,
  Col,
  Card,
  CardBody,
  Spinner,
  Button,
  CardTitle,
  Table,
} from "reactstrap"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { map, range } from "lodash"

// datatable related plugins
import BootstrapTable from "react-bootstrap-table-next"
import ToolkitProvider from "react-bootstrap-table2-toolkit"

//actions
import { getStoreSupply, updateStoreSupply } from "store/actions"

import "../../../assets/scss/datatables.scss"

const Stores = () => {
  const dispatch = useDispatch()
  const [page, setPage] = useState(1)
  const [show, setShow] = useState({ table: false })
  const [rawMateril, setRawMateril] = useState({})
  const { storeSupply, loading } = useSelector(state => ({
    storeSupply: state.StoreItems.storeSupply,
    loading: state.StoreItems.loading,
  }))

  //page
  const totalPages = Math.ceil(storeSupply?.count / 10)
  const pages = range(1, totalPages + 1)

  const pageSend = () => {
    if (page > pages.length) {
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
    dispatch(getStoreSupply(pageSend()))
  }, [dispatch, page])

  const handleUpdate = storeSupply => {
    dispatch(updateStoreSupply({ status: "Provided" }, storeSupply.id))
  }

  const columns = [
    {
      dataField: "auto_id",
      text: "Id",
    },
    {
      dataField: "supervisor",
      text: "Supervisor",
    },
    {
      dataField: "product",
      text: "Product",
      sort: true,
    },
    {
      dataField: "rawMaterials",
      text: "Raw Materials",
    },
    {
      dataField: "status",
      text: "Status",
    },

    {
      dataField: "action",
      text: "Change Status",
    },
  ]

  const handleToggle = id => {
    setShow({ ...show, table: true })
    setRawMateril(storeSupply?.results?.filter(item => item.id == id))
  }

  const storeSupplyData = map(storeSupply?.results, (item, index) => ({
    ...item,
    key: index,

    action: (
      <div className="d-flex">
        <div>
          <Link
            to="#"
            className={`btn-${
              item?.status == "Provided" ? "success disabled muted" : "light"
            } btn-sm `}
            onClick={() => handleUpdate(item)}
            style={{ cursor: `${item?.status == "Provided" && "default"}` }}
          >
            {item?.status == "Provided" ? "Provided" : "Provide"}
          </Link>
        </div>
      </div>
    ),
    rawMaterials: (
      <Button
        color="success"
        className="btn btn-light btn-sm text-info"
        type="submit"
        onClick={() => handleToggle(item?.id)}
      >
        Show Raw Materials
      </Button>
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

  return (
    <React.Fragment>
      <Row>
        <Col xl={`${show?.table ? 9 : 12}`}>
          <Card>
            <CardBody>
              <ToolkitProvider
                keyField="id"
                columns={columns}
                data={storeSupplyData}
                search
              >
                {toolkitProps => (
                  <React.Fragment>
                    <Row className="mb-2">
                      <Col md="4">
                        <div className="search-box me-2 mb-2 d-inline-block">
                          <div className="position-relative">
                            <form className="app-search d-lg-block">
                              <div className="position-relative">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Search..."
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
                              </div>
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
        {show?.table && (
          <Col xl={3}>
            <Card>
              <CardBody>
                <CardTitle>Raw Materials</CardTitle>

                <div className="table-responsive">
                  <Table className="table mb-0">
                    <thead className="table-light">
                      <tr>
                        <th> Raw Material</th>
                        <th>Qty</th>
                      </tr>
                    </thead>
                    <tbody>
                      {map(rawMateril[0]?.raw_materials, (item, index) => (
                        <tr key={index}>
                          <th> {item.name}</th>
                          <th>{item.quantity}</th>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </CardBody>
            </Card>
          </Col>
        )}
      </Row>
    </React.Fragment>
  )
}

export default Stores
