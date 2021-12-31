import { AvField, AvForm } from "availity-reactstrap-validation"
import React, { useEffect } from "react"
import PropTypes from "prop-types"

import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
import { Alert, Button, Card, CardBody, Col, Label } from "reactstrap"

//actions
import { getProductDetail, updateProduct } from "store/actions"

function ProductCard() {
  const dispatch = useDispatch()
  const params = useParams()

  const { productDetail, loading, createProducterror } = useSelector(state => ({
    createProducterror: state.Products.createProducterror,
    productDetail: state.Products.productDetail,
    loading: state.Products.loading,
  }))

  function handleValidSubmit(values) {
    dispatch(updateProduct(values, productDetail.id))
  }

  useEffect(() => {
    dispatch(getProductDetail(params.id))
  }, [])

  return (
    <>
      <Card>
        <CardBody>
          <AvForm
            className="form-horizontal "
            onValidSubmit={(e, v) => {
              handleValidSubmit(v)
            }}
          >
            {createProducterror && (
              <Alert color="danger">{createProducterror}</Alert>
            )}

            <div className="row mb-4">
              <Label
                htmlFor="horizontal-username-Input"
                className="col-sm-3 col-form-label"
              >
                Product Name
              </Label>
              <Col sm={9}>
                <AvField
                  id="horizontal-username-Input"
                  name="name"
                  type="text"
                  value={productDetail?.name}
                />
              </Col>
            </div>

            <div className="row mb-4">
              <Label htmlFor="tel-input" className="col-sm-3 col-form-label">
                Number of Columns
              </Label>
              <Col sm={9}>
                <AvField
                  name="no_of_cols"
                  className="form-control"
                  id="tel-input"
                  type="text"
                  value={productDetail?.no_of_cols}
                />
              </Col>
            </div>

            <div className="row mb-4">
              <Label
                htmlFor="horizontal-location-Input"
                className="col-sm-3 col-form-label"
              >
                Profit
              </Label>
              <Col sm={9}>
                <AvField
                  name="profit"
                  type="number"
                  className="form-control"
                  id="horizontal-location-Input"
                  value={productDetail?.profit}
                />
              </Col>
            </div>

            <div className="row justify-content-end">
              <Col sm={9}>
                <div>
                  <Button type="submit" color="success" className="w-md">
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
    </>
  )
}

export default ProductCard

ProductCard.propTypes = {
  history: PropTypes.object,
}
