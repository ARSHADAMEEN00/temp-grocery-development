import { AvField, AvForm } from "availity-reactstrap-validation"
import React from "react"
import { MetaTags } from "react-meta-tags"
import { useDispatch, useSelector } from "react-redux"
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Input,
  Label,
  Row,
} from "reactstrap"
import PropTypes from "prop-types"

//actions
import { createClient } from "store/actions"

import Breadcrumbs from "../../../components/Common/Breadcrumb"

const CreateClient = ({ history }) => {
  const dispatch = useDispatch()

  const { loading } = useSelector(state => ({
    loading: state.Clients.loading,
  }))

  // handleValidSubmit
  const handleValidSubmit = (onSubmitProps, values) => {
    dispatch(createClient(values, history))
  }
  return (
    <>
      <MetaTags>
        <title>Clients | Indtech </title>
      </MetaTags>

      <div className="page-content">
        <Breadcrumbs
          title="Clients"
          breadcrumbItem="Create Clients"
        />
        <Container fluid>
          <div className="container-fluid">
            <Row>
              <Col xl="3"></Col>
              <Col lg={6}>
                <Card>
                  <CardBody>
                    <CardTitle className="h4 mb-4">Fill this form</CardTitle>

                    <AvForm
                      className="form-horizontal "
                      onValidSubmit={(onSubmitProps, v) => {
                        handleValidSubmit(onSubmitProps, v)
                      }}
                    >
                      <div className="row mb-4">
                        <Label
                          htmlFor="horizontal-username-Input"
                          className="col-sm-3 col-form-label"
                        >
                          Name
                        </Label>
                        <Col sm={9}>
                          <AvField
                            id="horizontal-username-Input"
                            name="name"
                            type="text"
                            validate={{
                              required: { value: true },
                              minLength: {
                                value: 4,
                                errorMessage:
                                  "Your name must be between 6 and 16 characters",
                              }

                            }}
                          />
                        </Col>
                      </div>
                      <div className="row mb-4">
                        <Label
                          htmlFor="horizontal-firstname-Input"
                          className="col-sm-3 col-form-label"
                        >
                          Address
                        </Label>
                        <Col sm={9}>
                          <AvField
                            id="horizontal-firstname-Input"
                            name="address"
                            type="text"
                            validate={{
                              required: { value: true },
                              
                              maxLength: {
                                value: 16,
                                errorMessage:
                                  "Your name must be between 6 and 16 characters",
                              },
                            }}
                          />
                        </Col>
                      </div>

                      <div className="row mb-4">
                        <Label
                          htmlFor="tel-input"
                          className="col-sm-3 col-form-label"
                        >
                          Phone
                        </Label>
                        <Col sm={9}>
                          <AvField
                            name="phone"
                            className="form-control"
                            id="tel-input"
                            type="mobile"
                            validate={{
                              required: {
                                value: true,
                                errorMessage: "Please enter your phone number",
                              },
                              minLength: {
                                value: 10,
                                errorMessage:
                                  "Your number must be 10 characters",
                              },
                              maxLength: {
                                value: 10,
                                errorMessage:
                                  "Your number must be 10 characters",
                              },
                            }}
                          />
                        </Col>
                      </div>
                      <div className="row mb-4">
                        <Label
                          htmlFor="horizontal-email-Input"
                          className="col-sm-3 col-form-label"
                        >
                          Email
                        </Label>
                        <Col sm={9}>
                          <AvField
                            id="horizontal-email-Input"
                            name="email"
                            className="form-control"
                            type="email"
                            required
                          />
                        </Col>
                      </div>
                      <div className="row mb-4">
                        <Label
                          htmlFor="horizontal-lastname-Input"
                          className="col-sm-3 col-form-label"
                        >
                          Description
                        </Label>
                        <Col sm={9}>
                          <AvField
                            id="horizontal-lastname-Input"
                            name="description"
                            type="textarea"
                            validate={{
                              required: { value: true },
                            }}
                          />
                        </Col>
                      </div>
                      <div className="row justify-content-end">
                        <Col sm={9}>
                          <div>
                            <Button
                              type="submit"
                              color="success"
                              className="w-md"
                            >
                              {loading && (
                                <>
                                  <i className="bx bx-loader bx-spin font-size-16 align-middle me-2"></i>
                                </>
                              )}
                              Submit
                            </Button>
                          </div>
                        </Col>
                      </div>
                    </AvForm>
                  </CardBody>
                </Card>
              </Col>
              <Col xl="3"></Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  )
}

export default CreateClient

CreateClient.propTypes = {
  history: PropTypes.object,
}
