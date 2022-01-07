import React, { useState } from "react"
import { Col, Container, Row } from "reactstrap"
import { MetaTags } from "react-meta-tags"
import { useEffect } from "react"
import { Card, CardBody, Media, Spinner } from "reactstrap"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import PropTypes from "prop-types"

//actions
import { deleteQltchecker, getQltcheckerDetail } from "store/actions"

//componetns
import Breadcrumbs from "../../../components/Common/Breadcrumb"
import UpdateQltChecker from "../Crud/Update"
import DeleteModal from "components/Common/DeleteModal"

//Import Images
import userProfile from "assets/images/logo/user.png"

const QltCheckerDetails = ({ history }) => {
  const dispatch = useDispatch()
  const params = useParams()

  const { qltcheckerDetail, loading, detailLoading } = useSelector(state => ({
    loading: state.Qltcheckers.loading,
    detailLoading: state.detailLoading,
    qltcheckerDetail: state.Qltcheckers.qltcheckerDetail,
  }))

  const [isOpen, setIsOpen] = useState(false)

  const handleDelete = () => {
    setIsOpen(true)
  }
  const handleDeleteEvent = () => {
    dispatch(deleteQltchecker(qltcheckerDetail.id, history))
    setIsOpen(false)
    history.push("/qualitycheckers")
  }

  useEffect(() => {
    dispatch(getQltcheckerDetail(params.id))
  }, [])
  return (
    <>
      <DeleteModal
        show={isOpen}
        onCloseClick={() => setIsOpen(false)}
        onDeleteClick={handleDeleteEvent}
      />

      <MetaTags>
        <title>Quality Checker | Indtech </title>
      </MetaTags>

      <div className="page-content">
        <Breadcrumbs
          title="Quality Checkers"
          breadcrumbItem="Quality Checker"
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
                              <h5 className="mb-1">
                                {qltcheckerDetail?.username}
                              </h5>

                              <p className="mb-0 text-capitalize">
                                {qltcheckerDetail?.account?.role}
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
                                <h5 className="mb-1">
                                  {qltcheckerDetail?.email}
                                </h5>
                                <p className="mb-1">
                                  {qltcheckerDetail?.phone}
                                </p>
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
                            className={`btn btn-danger ${loading && "disabled"
                              }  btn-sm`}
                            onClick={handleDelete}
                          >
                            Block Acount
                            <i className="fas fa-trash ms-1 bx-tada-hover"></i>
                          </Link>
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col xl="12">
                <UpdateQltChecker />
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  )
}

export default QltCheckerDetails

QltCheckerDetails.propTypes = {
  history: PropTypes.object,
}
