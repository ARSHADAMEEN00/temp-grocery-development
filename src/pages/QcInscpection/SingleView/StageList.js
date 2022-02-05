import React, { useEffect, useState } from "react"
import { Badge, CardTitle, Col, Media, Row, Spinner } from "reactstrap"
import { map } from "lodash"
import { getWorkStages, updateWorkStage } from "store/actions"
import { useDispatch, useSelector } from "react-redux"
import AvField from "availity-reactstrap-validation/lib/AvField"
import AvForm from "availity-reactstrap-validation/lib/AvForm"
import { useParams } from "react-router-dom"

function StageList() {
  const dispatch = useDispatch()
  const params = useParams()

  const { stageData, loading } = useSelector(state => ({
    stageData: state.WorkStage.workStages,
    loading: state.WorkStage.loading,
  }))

  useEffect(() => {
    dispatch(getWorkStages("", "", params.id))
  }, [dispatch])

  const stageStatus = status => {
    if (status === "Started") {
      return "warning"
    } else if (status === "Finished") {
      return "success"
    } else if (status === "Pending") {
      return "info"
    }
  }

  const [stageUpdate, setstageUpdate] = useState({
    status: "",
    note: "",
  })

  const handleStart = stageId => {
    setstageUpdate({ ...stageUpdate, status: "Started" })
    dispatch(updateWorkStage({ ...stageUpdate, status: "Started" }, stageId))
  }

  const handleFinish = stageId => {
    setstageUpdate({ ...stageUpdate, status: "Finished" })
    dispatch(updateWorkStage({ ...stageUpdate, status: "Finished" }, stageId))
  }

  return (
    <>
      <CardTitle className="mb-3 mt-4">Stages</CardTitle>
      {loading ? (
        <>
          <Spinner type="grow" color="info" />
        </>
      ) : (
        <>
          <ul className="verti-timeline list-unstyled">
            {map(stageData?.results, (item, key) => (
              <li key={key} className="event-list">
                <div className="event-timeline-dot">
                  <i
                    className={`bx font-size-18 ${
                      item.status === "Started"
                        ? "bxs-right-arrow-circle bx-fade-right text-info"
                        : "bx-right-arrow-circle"
                    }`}
                  />
                </div>
                <Media>
                  <div className="me-5">
                    <h5
                      className={` ${
                        item.status === "Started"
                          ? "font-size-16"
                          : "font-size-14"
                      }`}
                    >
                      {item.stage}
                      <i className="bx bx-down-arrow-alt font-size-16 text-info align-middle ms-2" />
                    </h5>
                  </div>
                </Media>
                <Media body className="mx-5 text-end">
                  <AvForm
                    className="form-horizontal d-block"
                    style={{
                      width: "fit-content",
                      marginLeft: "auto",
                    }}
                  >
                    <Row>
                      <Col>
                        <AvField
                          id="horizontal-note-Input"
                          name="note"
                          className="form-control"
                          min={0}
                          type="textarea"
                          rows="1"
                          placeholder="Note"
                          onChange={e =>
                            setstageUpdate({
                              ...stageUpdate,
                              note: e.target.value,
                            })
                          }
                        />
                      </Col>
                      <Col>
                        <button
                          className={`btn btn-info btn-sm mx-2 ${
                            item.status === "Pending" ? "" : "disabled"
                          } `}
                          onClick={() => handleStart(item.id)}
                        >
                          Start
                        </button>

                        <button
                          className={`btn btn-success btn-sm mx-2 ${
                            item.status === "Started" ? "" : "disabled"
                          } `}
                          onClick={() => handleFinish(item.id)}
                        >
                          Finish
                        </button>
                      </Col>
                    </Row>
                  </AvForm>
                </Media>
                <Media body className="mx-4">
                  <p>
                    Status :{" "}
                    <Badge
                      className={
                        "font-size-13 p-2 mx-2 badge-soft-" +
                        `${stageStatus(item.status)}`
                      }
                      pill
                    >
                      {item.status}
                    </Badge>
                  </p>
                  <div>{item.note}</div>
                </Media>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  )
}

export default StageList
