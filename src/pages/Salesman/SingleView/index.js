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
import { deleteSalesman, getSalesmanDetail } from "store/actions"

//componetns
import Breadcrumbs from "../../../components/Common/Breadcrumb"
import UpdateSalesman from "../Crud/Update"
import DeleteModal from "components/Common/DeleteModal"

//Import Images
import userProfile from "assets/images/logo/user.png"

const SalesmanDetails = ({ history }) => {
  const dispatch = useDispatch()
  const params = useParams()

  const { salesmanDetail, loading, detailLoading } = useSelector(state => ({
    loading: state.Salesmans.loading,
    detailLoading: state.detailLoading,
    salesmanDetail: state.Salesmans.salesmanDetail,
  }))

  const [isOpen, setIsOpen] = useState(false)

  const handleDelete = () => {
    setIsOpen(true)
  }
  const handleDeleteEvent = () => {
    dispatch(deleteSalesman(salesmanDetail.id, history))
    setIsOpen(false)
    history.push("/qualitycheckers")
  }

  useEffect(() => {
    dispatch(getSalesmanDetail(params.id))
  }, [])
  return (
    <>
      <DeleteModal
        show={isOpen}
        onCloseClick={() => setIsOpen(false)}
        onDeleteClick={handleDeleteEvent}
      />

      <MetaTags>
        <title>Salesman | Indtech </title>
      </MetaTags>

      <div className="page-content">
        <Breadcrumbs title="Salesmans" breadcrumbItem="Salesman" />
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
                                  {salesmanDetail?.username}
                                </h5>

                                <p className="mb-0 text-capitalize">
                                  {salesmanDetail?.account?.role}
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
                                    {salesmanDetail?.email}
                                  </h5>
                                  <p className="mb-1">
                                    {salesmanDetail?.phone}
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
              </Col>
              <Col xl="12">
                <UpdateSalesman />
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  )
}

export default SalesmanDetails

SalesmanDetails.propTypes = {
  history: PropTypes.object,
}
