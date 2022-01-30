import AvField from "availity-reactstrap-validation/lib/AvField"
import AvForm from "availity-reactstrap-validation/lib/AvForm"
import PropTypes from "prop-types"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  Modal, ModalBody,
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
import { createClient } from "store/actions"

const CreateClientModal = ({ show, onDeleteClick, onCloseClick }) => {

  const dispatch = useDispatch()
  // const { loading, createdClient } = useSelector(state => ({
  //   loading: state.Client.loading,
  //   createdClient: state.Client.createdClient
  // }))

  const handleValidSubmit = (onSubmitProps, values) => {

    dispatch(createClient(values, history))

    // if (createdClient.name) {
    onCloseClick()
    // }
  }

  return (
    <Modal isOpen={show} toggle={onCloseClick} centered={true}>
      <ModalBody className="py-3 px-5 ">
        <CardTitle className="h4 mb-4 mt-2">Create Client</CardTitle>
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
                type="textarea"
                validate={{
                  required: { value: true },
                  minLength: {
                    value: 4,
                    errorMessage:
                      "Your name must be between 6 and 16 characters",
                  },
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
          <div className="row justify-content-end mb-2">
            <Col sm={6}>
              <div className="text-center mt-3">
                <button
                  type="button"
                  className="btn btn-sm btn-outline-danger btn-lg ms-2"
                  onClick={onCloseClick}
                >
                  Cancel
                </button>
                <button
                  style={{ width: "50%" }}
                  type="submit"
                  className="btn btn-sm btn-success btn-lg ms-2"
                // onClick={onDeleteClick}
                >
                  {/* {loading && (
                    <>
                      <i className="bx bx-loader bx-spin font-size-16 align-middle me-2"></i>
                    </>
                  )} */}
                  Save
                </button>

              </div>
            </Col>
          </div>
        </AvForm>
      </ModalBody>
    </Modal>
  )
}

CreateClientModal.propTypes = {
  onCloseClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
  show: PropTypes.any,
}

export default CreateClientModal
