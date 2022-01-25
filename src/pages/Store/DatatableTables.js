import React, { useEffect, useState } from "react"
import { Row, Col, Card, CardBody, Spinner } from "reactstrap"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { map, range } from "lodash"

// datatable related plugins
import BootstrapTable from "react-bootstrap-table-next"
import ToolkitProvider from "react-bootstrap-table2-toolkit"

//actions
import { deleteStoreItem, getStoreItems } from "store/actions"

import "../../assets/scss/datatables.scss"
import MyPagination from "components/Common/MyPagination"

const Stores = () => {
  const dispatch = useDispatch()
  const [page, setPage] = useState(1)
  const [searchText, setSearchText] = useState("")
  const { storeItems, loading } = useSelector(state => ({
    storeItems: state.StoreItems.storeItems,
    loading: state.StoreItems.loading,
  }))

  const totalPages = Math.ceil(storeItems?.count / 10)
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
    dispatch(getStoreItems(searchText, pageSend()))



  }, [dispatch, page, searchText])

  const handleDelete = storeItemId => {
    dispatch(deleteStoreItem(storeItemId))
  }





  const columns = [
    {
      dataField: "name",
      text: "Store Item",
      sort: true,
    },
    {
      dataField: "unit_type",
      text: "Unit Type",
    },
    {
      dataField: "unit",
      text: "Unit",
    },
    {
      dataField: "stock",
      text: "Stock",
    },
    {
      dataField: "price",
      text: "Price",
    },
    {
      dataField: "action",
      text: "Action",
    },
  ]

  const storeData = map(storeItems?.results, (item, index) => ({
    ...item,
    key: index,

    action: (
      <div className="d-flex">
        <div>
          <Link to={`/store/update/${item?.id}`} className="btn-light btn-sm ">
            Update
          </Link>
        </div>
        <div>
          <Link
            to="#"
            className="btn-danger btn-sm mx-3"
            onClick={() => handleDelete(item?.id)}
          >
            Remove
          </Link>
        </div>
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

  const storeDataNew = storeData?.filter(item => item.stock == 0)



  return (
    <React.Fragment>
      <Row>
        <Col className="col-12">
          <Card>
            <CardBody>
              <ToolkitProvider
                keyField="id"
                columns={columns}
                data={window.location.search ? storeDataNew : storeData}
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
                                  placeholder="Search Store Item"
                                  defaultValue={searchText}
                                />
                                <span className="bx bx-search-alt" />
                              </div>
                            </form>
                          </div>
                        </div>
                      </Col>
                      <Col md="4"></Col>
                      <Col md="4" style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center"
                      }}>
                        {window.location.search && <Link
                          to="/stores"
                          className="btn btn-light btn-sm"
                        >
                          See All
                          <i className="bx bx-right "></i>
                        </Link>}
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
                        <MyPagination
                          pages={pages}
                          clcickedPage={page}
                          onNunClick={(item) => setPage(item)}
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

export default Stores
