import React, { useEffect, useState } from "react"
import { Row, Col, Card, CardBody, Badge, Spinner } from "reactstrap"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { map, range } from "lodash"

// datatable related plugins
import BootstrapTable from "react-bootstrap-table-next"
import ToolkitProvider from "react-bootstrap-table2-toolkit"

//actions
import { getOrders } from "store/orders/actions"

import "../../assets/scss/datatables.scss"
import MyPagination from "components/Common/MyPagination"
import { getWorkStages, updateWorkStage } from "store/actions"
import AvForm from "availity-reactstrap-validation/lib/AvForm"
import AvField from "availity-reactstrap-validation/lib/AvField"

const Stages = () => {
  const dispatch = useDispatch()
  const [page, setPage] = useState(1)
  const [searchText, setSearchText] = useState("")

  const { workStages, loading } = useSelector(state => ({
    workStages: state.WorkStage.workStages,
    loading: state.WorkStage.loading,
  }))

  const Role = sessionStorage.getItem("role")

  //page
  const totalPages = Math.ceil(workStages?.count / 10)
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
    dispatch(getWorkStages(searchText, pageSend()))
  }, [dispatch, page, searchText])


  const columns = [

    {
      dataField: "order_item_auto_id",
      text: "Id",
    },
    {
      dataField: "stage",
      text: "Satge",
    },
    {
      dataField: "status",
      text: "Status",
    },
    {
      dataField: "note",
      text: "Note",
    },
    {
      dataField: "action",
      text: "Update Status",
    },
  ]

  const Status = status => {
    if (status == "Pending") {
      return "info"
    }
    if (status == "Finished") {
      return "success"
    }

    if (status == "Started") {
      return "warning"
    }
  }

  const handleValidSubmit = (props, updateStage, stageId) => {
    console.log(updateStage);
    // dispatch(updateWorkStage(updateStage, stageId, ""))
  }

  const workStagesData = map(workStages?.results, (item, index) => ({
    ...item,
    key: index,
    quotation_id: (
      <p>{item.quotation_id ? item.quotation_id : "Null"}</p>
    ),
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
      <AvForm
        className="form-horizontal "
        onValidSubmit={(onSubmitProps, v) => {
          handleValidSubmit(onSubmitProps, v, item.id)
        }}
      >
        <Row style={{ alignItems: "center" }} className="d-flex">
          <Col sm={2} lg={2} style={{ width: "150px" }}>
            <AvField
              id="horizontal-note-Input"
              name="note"
              className="form-control"
              min={0}
              type="textarea"
              rows="1"
              placeholder="Note"
              required
            />
          </Col>

          <Col sm={2} lg={3} style={{ width: "60px" }}>
            <button
              type="submit"
              className={`btn btn-info btn-sm mx-2 btn-lg ms-2 ${item.status === "Pending" ? "" : "disabled"} `}
            >
              Start
            </button>
          </Col>
          <Col sm={2} lg={3} style={{ width: "60px" }}>
            <button
              type="submit"
              className={`btn btn-success btn-sm mx-2 btn-lg ms-2 ${item.status === "Started" ? "" : "disabled"} `}
            >
              Finish
            </button>
          </Col>
        </Row>


      </AvForm>),
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
                data={workStagesData}
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

export default Stages
