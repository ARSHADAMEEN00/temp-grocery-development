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
        <CardTitle className="h4 mb-4 mt-2">Update Stock</CardTitle>
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
              Stock
            </Label>
            <Col sm={9}>
              <AvField
                id="horizontal-username-Input"
                name="name"
                type="number"
                validate={{
                  required: { value: true },
                }}
                min={0}
              />
            </Col>
          </div>

          <div className="row mb-4">
            <Label
              htmlFor="horizontal-email-Input"
              className="col-sm-3 col-form-label"
            >
              Price
            </Label>
            <Col sm={9}>
              <AvField
                id="horizontal-email-Input"
                name="email"
                className="form-control"
                type="email"
                required
                min={0}
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
                >

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
