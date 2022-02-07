import React, { useEffect, useState } from "react"
import { Row, Col, Card, CardBody, Spinner } from "reactstrap"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { map, range } from "lodash"

// datatable related plugins
import BootstrapTable from "react-bootstrap-table-next"
import ToolkitProvider from "react-bootstrap-table2-toolkit"

//actions
import { getClients } from "store/actions"

//componets
import MyPagination from "components/Common/MyPagination"

//css
import "../../assets/scss/datatables.scss"

const AllClients = () => {
  const dispatch = useDispatch()
  const [searchText, setSearchText] = useState("")
  const [page, setPage] = useState(1)

  const { clients, loading } = useSelector(state => ({
    clients: state.Clients.clients,
    loading: state.Clients.loading,
  }))

  //pages
  const totalPages = Math.ceil(clients?.count / 10)
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
    dispatch(getClients(searchText, pageSend()))
  }, [dispatch, page, searchText])

  const columns = [
    {
      dataField: "name",
      text: "Name",
      sort: true,
    },
    {
      dataField: "address",
      text: "Address",
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
      dataField: "action",
      text: "Action",
    },
  ]

  const clientsData = map(clients?.results, (item, index) => ({
    ...item,
    key: index,

    action: (
      <div>
        <Link to={`/clients/${item?.id}`} className="btn-light btn-sm">
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
                data={clientsData}
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
                                classes={"table align-middle table-wrap"}
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
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default AllClients
