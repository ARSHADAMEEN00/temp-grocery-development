import React, { useState } from "react"
import { useEffect } from "react"
import { Col, Container, Row } from "reactstrap"
import { MetaTags } from "react-meta-tags"
import { Card, CardBody, Media, Spinner } from "reactstrap"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import PropTypes from "prop-types"

//actions
import { deleteClient, getClientDetail } from "store/actions"

//componetns
import Breadcrumbs from "../../../components/Common/Breadcrumb"
import DeleteModal from "components/Common/DeleteModal"
import UpdateClient from "../Crud/Update"

//Import Images
import userProfile from "assets/images/logo/user.png"

const ClientDetails = ({ history }) => {
  const dispatch = useDispatch()
  const params = useParams()

  const { clientDetail, loading, detailLoading } = useSelector(state => ({
    loading: state.Clients.loading,
    detailLoading: state.Clients.detailLoading,
    clientDetail: state.Clients.clientDetail,
  }))

  const [isOpen, setIsOpen] = useState(false)

  const handleDelete = () => {
    setIsOpen(true)
  }
  const handleDeleteEvent = () => {
    dispatch(deleteClient(clientDetail.id, history))
    setIsOpen(false)
    // history.push("/clients")
  }

  useEffect(() => {
    dispatch(getClientDetail(params.id))
  }, [])
  const project = []
  return (
    <>
      <DeleteModal
        show={isOpen}
        onCloseClick={() => setIsOpen(false)}
        onDeleteClick={handleDeleteEvent}
      />

      <MetaTags>
        <title>Client | Indtech </title>
      </MetaTags>

      <div className="page-content">
        <Breadcrumbs title="All Clients" breadcrumbItem="Client" />
        <Container fluid>
          <div className="container-fluid">
            <Row>
              <Col xl="12">
                <Card>
                  <CardBody>
                    {detailLoading ? (
                      <Spinner />
                    ) : (
                      <>
                        <Media>
                          <img
                            className="d-flex me-3 rounded-circle avatar-sm"
                            src={userProfile}
                            alt="osperb"
                          />

                          <Media className="overflow-hidden" body>
                            <h5 className="text-truncate font-size-15">
                              {clientDetail.name}
                            </h5>
                            <p className="text-muted">{clientDetail.address}</p>
                          </Media>
                        </Media>

                        <h5 className="font-size-15 mt-4">Client Details :</h5>

                        <p className="text-muted">{clientDetail.description}</p>

                        <div className="text-muted mt-4">
                          <p>
                            <i className="mdi mdi-chevron-right text-primary me-1" />{" "}
                            Email: {clientDetail.email}
                          </p>
                          <p>
                            <i className="mdi mdi-chevron-right text-primary me-1" />{" "}
                            phone: {clientDetail.phone}
                          </p>
                          <p>
                            <i className="mdi mdi-chevron-right text-primary me-1" />{" "}
                            Auto Id: {clientDetail.auto_id}
                          </p>
                        </div>
                      </>
                    )}

                    <Row className="task-dates">
                      <Col sm="4" xs="6">
                        <div className="mt-4">
                          <Link
                            style={{ opacity: 0.8 }}
                            to="#"
                            className={`btn btn-outline-light ${
                              loading && "disabled"
                            }  btn-m`}
                            onClick={handleDelete}
                          >
                            Block Account
                            <i className="fas fa-trash text-danger ms-1 bx-tada-hover"></i>
                          </Link>
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col xl="12">
                <UpdateClient />
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  )
}

export default ClientDetails

ClientDetails.propTypes = {
  history: PropTypes.object,
}
