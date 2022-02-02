import React, { useState } from "react"
import { Col, Container, Row } from "reactstrap"
import { MetaTags } from "react-meta-tags"

//componetns
import Breadcrumbs from "../../../components/Common/Breadcrumb"
import PropTypes from "prop-types"

import { useEffect } from "react"
import { Card, CardBody, Media, Spinner } from "reactstrap"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"

//Import Images
import userProfile from "assets/images/logo/user.png"

//actions
import { deleteGeneralManager, getGeneralManagerDetail } from "store/actions"
import UpdateStoremanager from "../Crud/Update"
import DeleteModal from "components/Common/DeleteModal"

const GeneralManagerDetails = ({ history }) => {
  const dispatch = useDispatch()
  const params = useParams()
  const [isOpen, setIsOpen] = useState(false)

  const { detailLoading, loading, GMDetail } = useSelector(state => ({
    detailLoading: state.GeneralMngr.detailLoading,
    loading: state.GeneralMngr.loading,
    GMDetail: state.GeneralMngr.GMDetail,
  }))
  const handleDelete = () => {
    setIsOpen(true)
  }
  const handleDeleteEvent = () => {
    dispatch(deleteGeneralManager(GMDetail.id, history))
    setIsOpen(false)
  }
  useEffect(() => {
    dispatch(getGeneralManagerDetail(params.id))
  }, [dispatch])
  return (
    <>
      <DeleteModal
        show={isOpen}
        onCloseClick={() => setIsOpen(false)}
        onDeleteClick={handleDeleteEvent}
      />
      <MetaTags>
        <title>General Manager | Loha </title>
      </MetaTags>

      <div className="page-content">
        <Breadcrumbs
          title="General Managers"
          breadcrumbItem="General Manager"
        />
        <Container fluid>
          <div className="container-fluid">
            <Row>
              <Col xl="12">
                <Card>
                  <CardBody>
                    <Row>
                      <Col lg="6" md="6" className="mb-4">
                        <Media>
                          <div className="me-3">
                            <img
                              src={userProfile}
                              alt=""
                              className="avatar-md rounded-circle img-thumbnail"
                            />
                          </div>
                          <Media className="align-self-center" body>
                            <div className="text-muted">
                              <h5 className="mb-1">{GMDetail?.username}</h5>
                              <p className="mb-0 text-capitalize">
                                {GMDetail?.role}
                              </p>
                            </div>
                          </Media>
                        </Media>
                      </Col>

                      <Col lg="4" md="6" className="d-lg-block">
                        <Media className="align-self-center" body>
                          <div className="text-muted">
                            {detailLoading ? (
                              <Spinner />
                            ) : (
                              <>
                                <h5 className="mb-1">{GMDetail?.email}</h5>
                                <p className="mb-1">{GMDetail?.phone}</p>
                              </>
                            )}
                          </div>
                        </Media>
                      </Col>

                      <Col lg="2" className="d-lg-block">
                        <div className="mt-4">
                          <Link
                            style={{ opacity: 0.8 }}
                            to="#"
                            className={`btn btn-outline-light ${
                              loading && "disabled"
                            }  btn-m`}
                            onClick={handleDelete}
                          >
                            Block Acount
                            <i className="fas fa-trash text-danger ms-1 bx-tada-hover"></i>
                          </Link>
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
                <UpdateStoremanager />
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  )
}

export default GeneralManagerDetails

GeneralManagerDetails.propTypes = {
  history: PropTypes.object,
}
