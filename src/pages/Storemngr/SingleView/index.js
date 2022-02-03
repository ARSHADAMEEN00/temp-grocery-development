import React, { useState, useEffect } from "react"
import { MetaTags } from "react-meta-tags"
import PropTypes from "prop-types"
import { Card, CardBody, Media, Spinner, Col, Container, Row } from "reactstrap"
import { useDispatch, useSelector } from "react-redux"
import { useParams, Link } from "react-router-dom"

//componetns
import Breadcrumbs from "../../../components/Common/Breadcrumb"

//Import Images
import userProfile from "assets/images/logo/user.png"

//actions
import { deleteStoremngr, getStoremngrDetail } from "store/actions"
import UpdateStoremanager from "../Crud/Update"
import DeleteModal from "components/Common/DeleteModal"
const StoreManagerDetails = ({ history }) => {
  const dispatch = useDispatch()
  const params = useParams()

  const { detailLoading, loading, storemngrDetail } = useSelector(state => ({
    detailLoading: state.Storemngrs.detailLoading,
    loading: state.Storemngrs.loading,
    storemngrDetail: state.Storemngrs.storemngrDetail,
  }))

  const [isOpen, setIsOpen] = useState(false)

  const handleDelete = () => {
    setIsOpen(true)
  }

  const handleDeleteEvent = () => {
    dispatch(deleteStoremngr(storemngrDetail.id, history))
    setIsOpen(false)
    history.push("/storemanagers")
  }

  useEffect(() => {
    dispatch(getStoremngrDetail(params.id))
  }, [dispatch])
  return (
    <>
      <DeleteModal
        show={isOpen}
        onCloseClick={() => setIsOpen(false)}
        onDeleteClick={handleDeleteEvent}
      />

      <MetaTags>
        <title>Store Manager | Indtech </title>
      </MetaTags>

      <div className="page-content">
        <Breadcrumbs title="Store Managers" breadcrumbItem="Store Manager" />
        <Container fluid>
          <div className="container-fluid">
            <Row>
              <Col xl="12">
                <Card>
                  <CardBody>
                    {loading ? (
                      <>
                        <Spinner color="info" />
                      </>
                    ) : (
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
                                  {storemngrDetail?.username}
                                </h5>
                                <p className="mb-0 text-capitalize">
                                  {storemngrDetail?.account?.role}
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
                                    {storemngrDetail?.email}
                                  </h5>
                                  <p className="mb-1">
                                    {storemngrDetail?.phone}
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
                    )}
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

export default StoreManagerDetails

StoreManagerDetails.propTypes = {
  history: PropTypes.object,
}
