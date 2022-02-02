import React, { useEffect, useState } from "react"
import {
  Badge,
  Card,
  CardBody,
  CardTitle,
  Col,
  Row,
  Spinner,
  Button,
  Alert,
  Media,
} from "reactstrap"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import moment from "moment"
import DatePicker from "react-datepicker"
import { map } from "lodash"

//actions
import { getWorkStageDetail, updateOrder, updateWorkStage } from "store/actions"

//css
import "react-datepicker/dist/react-datepicker.css"
import PropTypes from "prop-types"

function OrderStatus({ history }) {
  const dispatch = useDispatch()
  const params = useParams()

  const { loading, workStageDetail } = useSelector(state => ({
    loading: state.Orders.loading,
    workStageDetail: state.WorkStage.workStageDetail,
  }))
  const [stageUpadte, setStageUpadte] = useState({
    status: "QC_Approved",
    note: workStageDetail?.note,
  })

  useEffect(() => {
    dispatch(getWorkStageDetail(params.id))
  }, [dispatch])

  const handleSubmit = () => {
    dispatch(updateWorkStage(stageUpadte, workStageDetail?.id, history))
  }

  return (
    <>
      <Col lg={2}></Col>
      <Col lg={8}>
        <Card>
          <CardBody>
            {loading ? (
              <Spinner type="grow" color="gray" />
            ) : (
              <>
                <Media>
                  <Media className="overflow-hidden" body>
                    <h5 className="text-truncate font-size-20">
                      {workStageDetail?.stage}
                    </h5>
                  </Media>
                </Media>

                <div className="text-muted mt-4">
                  <p>
                    <i className="mdi mdi-chevron-right text-primary me-1" />
                    ID : {workStageDetail?.order_item_auto_id}
                  </p>
                  <p>
                    <i className="mdi mdi-chevron-right text-primary me-1" />
                    QC : {workStageDetail.qc_name}
                  </p>
                  <p>
                    <i className="mdi mdi-chevron-right text-primary me-1" />
                    Note : {workStageDetail.note}
                  </p>
                </div>
              </>
            )}

            <Row className="task-dates">
              <Col lg={4} sm="4" xs="6">
                <div className="mt-4">
                  <Badge className={"font-size-14 p-2 badge-soft-dark"} pill>
                    {workStageDetail?.status}
                  </Badge>
                </div>
              </Col>
              <Col lg={4} sm="4" xs="0"></Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
      <Col lg={2}></Col>

      <Col lg={2}></Col>
      <Col lg={8}>
        {workStageDetail?.status == "QC_Approved" ? (
          <></>
        ) : (
          <Card>
            <CardBody>
              <CardTitle className="mb-2">Update Status</CardTitle>

              <div>
                <Row>
                  <Col lg={12} className="mb-3">
                    <label htmlFor="note">Note</label>
                    <textarea
                      className="form-control"
                      id="note"
                      rows={3}
                      onChange={e =>
                        setStageUpadte({
                          ...stageUpadte,
                          note: e.target.value,
                        })
                      }
                      defaultValue={workStageDetail.note}
                      placeholder={workStageDetail.note}
                    ></textarea>
                  </Col>

                  <Col lg={9}></Col>
                  <Col lg={3}>
                    <Button
                      type="submit"
                      color="success"
                      className="w-md mb-2 btn-sm mt-4 "
                      onClick={handleSubmit}
                    >
                      Approve
                    </Button>
                  </Col>
                </Row>
              </div>
            </CardBody>
          </Card>
        )}
      </Col>
      <Col lg={2}></Col>
    </>
  )
}

export default OrderStatus

OrderStatus.propTypes = {
  history: PropTypes.object,
}
