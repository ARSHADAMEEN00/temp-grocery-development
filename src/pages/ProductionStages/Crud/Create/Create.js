import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { map } from "lodash"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"
import { MetaTags } from "react-meta-tags"
import { Container } from "reactstrap"
import {
  Row,
  Col,
  Card,
  CardBody,
  Form,
  Label,
  CardTitle,
  FormGroup,
  Spinner,
  Button,
} from "reactstrap"
import Select from "react-select"

//actions
import {
  createOrder,
  createWorkStage,
  getClients,
  getProducts,
  getQltcheckers,
  getQuotations,
} from "store/actions"

import Breadcrumbs from "../../../../components/Common/Breadcrumb"

const CreatStage = ({ history }) => {
  const dispatch = useDispatch()
  //redux state

  const [selectedStatus, setSelectedStatus] = useState("Select a Status")
  const [searchQltcheckerText, setSearchQltcheckerText] = useState("")

  const [stagesData, setstagesData] = useState({
    stage: "",
    order_item_auto_id: window.location.search
      ? window.location.search.substring(1)
      : "",
    status: "",
    note: "",
  })

  useEffect(() => {
    dispatch(getQltcheckers(searchQltcheckerText, ""))
  }, [dispatch, searchQltcheckerText])

  // stage
  const onFinalSubmitStage = () => {
    dispatch(createWorkStage(stagesData, history))
  }

  const handleQltcheckerEnters = textEntered => {
    setSearchQltcheckerText(textEntered)
  }

  const status = [
    { id: 1001, status: "Started" },
    { id: 1002, status: "QC_Pending" },
    { id: 1003, status: "QC_Approved" },
  ]

  const statusOptions = [
    {
      options: status.map((result, index) => ({
        key: index,
        label: result.status,
        value: result.id,
      })),
    },
  ]
  const onHandleStatus = event => {
    setSelectedStatus(event.label)
    setstagesData({
      ...stagesData,
      status: event.label,
    })
  }

  return (
    <>
      <MetaTags>
        <title>Stage | Indtech </title>
      </MetaTags>

      <div className="page-content">
        <Breadcrumbs title="Stage" breadcrumbItem="Create Stage" />

        <Container fluid>
          <div className="container-fluid">
            {/* uploading */}
            <Row>
              <Col lg={"12"}>
                <Card>
                  <CardBody>
                    <Form className="repeater" encType="multipart/form-data">
                      <div>
                        <Row>
                          <Col lg={6} className="mb-3">
                            <label htmlFor="Duration">Stage</label>
                            <input
                              type="text"
                              className="form-control"
                              id="Duration"
                              requied="true"
                              min={1}
                              value={stagesData.stage}
                              onChange={e =>
                                setstagesData({
                                  ...stagesData,
                                  stage: e.target.value,
                                })
                              }
                            />
                          </Col>
                          <Col lg={6} className="mb-3">
                            <label htmlFor="Duration">Order Item Id</label>
                            <input
                              type="text"
                              className="form-control"
                              id="Duration"
                              requied="true"
                              min={1}
                              value={stagesData.order_item_auto_id}
                              onChange={e =>
                                setstagesData({
                                  ...stagesData,
                                  order_item_auto_id: e.target.value,
                                })
                              }
                            />
                          </Col>

                          <Col lg={6} className="mb-3">
                            <FormGroup className="mb-3">
                              <Label>Status</Label>
                              <div className="mb-3 ajax-select mt-3 mt-lg-0 select2-container">
                                <Select
                                  onInputChange={handleQltcheckerEnters}
                                  value={selectedStatus}
                                  placeholder={selectedStatus}
                                  onChange={onHandleStatus}
                                  options={statusOptions}
                                  classNamePrefix="select2-selection"
                                  isLoading={true}
                                />
                              </div>
                            </FormGroup>
                          </Col>

                          <Col lg={6} className="mb-3">
                            <label htmlFor="note">Note</label>
                            <textarea
                              className="form-control"
                              id="note"
                              rows={1}
                              onChange={e =>
                                setstagesData({
                                  ...stagesData,
                                  note: e.target.value,
                                })
                              }
                              defaultValue={stagesData.note}
                            ></textarea>
                          </Col>

                          <Col
                            lg={12}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "flex-end",
                            }}
                          >
                            <input
                              type="button"
                              className="btn btn-success mr-lg-0 "
                              value="Create Stage"
                              onClick={() => onFinalSubmitStage()}
                              style={{
                                marginTop: "1rem",
                                pointerEvents:
                                  stagesData.OrderId == "" && "none",
                              }}
                            />
                          </Col>
                        </Row>
                      </div>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  )
}

export default CreatStage

CreatStage.propTypes = {
  history: PropTypes.object,
}
