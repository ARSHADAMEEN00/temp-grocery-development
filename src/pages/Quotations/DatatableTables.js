import React, { useEffect, useState } from "react"
import { Row, Col, Card, CardBody, Badge, Spinner } from "reactstrap"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { map, range } from "lodash"

// datatable related plugins
import BootstrapTable from "react-bootstrap-table-next"
import ToolkitProvider from "react-bootstrap-table2-toolkit"

//actions
import { getQuotations } from "store/orders/actions"

import "../../assets/scss/datatables.scss"
import QuotationDetails from "./QuotationDetails"
import MyPagination from "components/Common/MyPagination"
import moment from "moment"

const Quotation = () => {
  const dispatch = useDispatch()
  const [page, setPage] = useState(1)
  const [searchText, setSearchText] = useState("")
  const [QDetails, setQDetails] = useState()
  const { quotation, loading } = useSelector(state => ({
    quotation: state.Orders.quotation,
    loading: state.Orders.quotationLoading,
  }))

  //page
  const totalPages = Math.ceil(quotation?.count / 10)
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
    dispatch(getQuotations(searchText, pageSend()))
  }, [dispatch, page, searchText])

  const columns = [
    {
      dataField: "client_name",
      text: "Client",
      sort: true,
    },
    {
      dataField: "auto_id",
      text: "Id",
    },
    {
      dataField: "date_added",
      text: "Date",
    },
    {
      dataField: "status",
      text: "Status",
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
    if (status == "Approved") {
      return "success"
    }
    if (status == "Canceled") {
      return "danger"
    }
    if (status == "Delivered") {
      return "success"
    }

  }

  const quotationData = map(quotation?.results, (item, index) => ({
    ...item,
    key: index,
    date_added: moment(item.date_added).format("YYYY/MM/DD"),
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
        to="#"
        onClick={() => setQDetails(item.id)}
      >
        View Details
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
        <Col lg={`${QDetails ? "8" : "12"}`} >
          <Card>
            <CardBody>
              <ToolkitProvider
                keyField="id"
                columns={columns}
                data={quotationData}
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
                    </Row>
                    {loading ? (
                      <Spinner color="secondary" className="d-block m-auto" />
                    ) : (
                      <>
                        <Row>
                          <Col xl="12">
                            <div
                              className="table-responsive"
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
        {QDetails && <Col lg={4} >
          <QuotationDetails quotationId={QDetails}
          />
        </Col>}
      </Row>
    </React.Fragment>
  )
}

export default Quotation
