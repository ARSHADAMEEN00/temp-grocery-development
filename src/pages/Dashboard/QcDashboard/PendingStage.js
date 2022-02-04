import React from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { Card, CardBody, Media, Spinner } from "reactstrap"

//Simple bar
import SimpleBar from "simplebar-react"
import { map } from "lodash"

const PendingStage = () => {
  const { workstage, loading } = useSelector(state => ({
    workstage: state.WorkStage.workStages,
    loading: state.Orders.loading,
  }))
  const PendingStage = workstage?.results?.filter(
    item => item.status == "QC_Pending"
  )
  const PendingStageNew = PendingStage?.slice(0, 3)

  return (
    <React.Fragment>
      <Card>
        <CardBody>
          <h4 className="card-title mb-4">Pending Stages</h4>
          {loading ? (
            <Spinner type="grow" color="gray" />
          ) : PendingStageNew?.length > 0 ? (
            <SimpleBar style={{ maxHeight: "400px" }}>
              {map(PendingStageNew, (item, index) => (
                <ul className="list-group mb-1" key={index}>
                  <li className="list-group-item border-0 mb-2">
                    <Media>
                      <div
                        className="me-3"
                        style={{ width: "15px", height: "15px" }}
                      >
                        <span className="avatar-title rounded-circle bg-info"></span>
                      </div>
                      <Media body>
                        <Link
                          to={`/stages/${item.id}`}
                          className="font-size-14 text-muted "
                        >
                          Stage : {item?.stage}{" "}
                        </Link>
                        <p className="text-muted font-size-14 pt-2">
                          QC : {item?.qc_name}
                        </p>

                        <p className="text-muted mb-0">
                          Auto Id : {item?.order_item_auto_id}
                        </p>
                      </Media>
                    </Media>
                  </li>
                </ul>
              ))}

              <div className="float-end ">
                <Link
                  to="/stages/?Pending"
                  className="mb-0 mx-4 d-flex align-items-center text-info"
                >
                  See more
                  <i className="bx bx-cookie bx-fade-right bx-sm" />
                </Link>
              </div>
            </SimpleBar>
          ) : (
            <>
              <p className="text-info">No Pending Stages ,</p>
              <div className="float-end">
                <Link
                  to="/stages"
                  className="mb-0 mx-4 d-flex align-items-center text-info"
                >
                  See more
                  <i className="bx bx-cookie bx-fade-right bx-sm" />
                </Link>
              </div>
            </>
          )}
        </CardBody>
      </Card>
    </React.Fragment>
  )
}

export default PendingStage
