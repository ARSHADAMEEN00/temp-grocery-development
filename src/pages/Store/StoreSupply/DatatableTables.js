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
  Badge,
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
import MyPagination from "components/Common/MyPagination"

const Stores = () => {
  const dispatch = useDispatch()
  const [page, setPage] = useState(1)
  const [show, setShow] = useState({ table: false })
  const [rawMateril, setRawMateril] = useState({})
  const [searchText, setSearchText] = useState("")

  const { storeSupply, loading } = useSelector(state => ({
    storeSupply: state.StoreItems.storeSupply,
    loading: state.StoreItems.loading,
  }))

  //page
  const totalPages = Math.ceil(storeSupply?.count / 10)
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
    dispatch(getStoreSupply(searchText, pageSend()))
  }, [dispatch, page, searchText])

  const handleUpdate = storeSupply => {
    dispatch(updateStoreSupply({ store_status: "Provided" }, storeSupply.id))
  }

  const StoreStatus = status => {
    if (status == "Not Provided") {
      return "info"
    }
    if (status == "Provided") {
      return "success"
    }
  }

  const columns = [
    {
      dataField: "auto_id",
      text: "Id",
      sort: true,
    },
    {
      dataField: "productname",
      text: "Product",
      sort: true,
    },
    {
      dataField: "rawMaterials",
      text: "Raw Materials",
      sort: true,
    },
    {
      dataField: "store_status",
      text: "Status",
      sort: true,
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
      <div className="d-flex">
        <div>
          {item?.store_status == "Provided" ? (
            <p className="p-0 m-0">Provided</p>
          ) : (
            <Link
              to="#"
              className={`btn-${
                item?.store_status === "Provided" ? "light" : "success"
              } btn-sm `}
              onClick={() => handleUpdate(item)}
              style={{
                cursor: `${item?.store_status == "Provided" && "default"}`,
              }}
            >
              {item?.store_status}
            </Link>
          )}
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
                            <form
                              className="app-search d-lg-block"
                              onChange={e => handleSearch(e)}
                            >
                              <div className="position-relative">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Search.. Id or Supervisor"
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
