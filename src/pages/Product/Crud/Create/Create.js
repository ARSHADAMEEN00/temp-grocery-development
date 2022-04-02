import axios from "axios"
import { API_URL } from "helpers/api_methods"
import React, { useState } from "react"
import { MetaTags } from "react-meta-tags"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import {
  Alert,
  Badge,
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Label,
  Row,
} from "reactstrap"

//actions
import {
  createProduct,
  createProductFail,
  createProductSuccess,
  getProductDetailSuccess,
} from "store/actions"

//components
import Breadcrumbs from "../../../../components/Common/Breadcrumb"
import OtherCost from "./OtherCost"
import CrudProductDetail from "./ProductDetail"
import RawmaterialForm from "./RawmaterialForm"

const CreateProduct = () => {
  const dispatch = useDispatch()
  const [btnDisabled, setBtnDisabled] = useState(true)
  const [remove, setRemove] = useState(false)

  const { createProducterror, loading, productDetail } = useSelector(state => ({
    createProducterror: state.Products.createProducterror,
    loading: state.Products.loading,
    productDetail: state.Products.productDetail,
  }))

  const [state, setstate] = useState({
    name: "",
    code: "",
    profit: "",
    image: null,
  })

  const handleChange = e => {
    setstate({
      ...state,
      [e.target.id]: e.target.value,
    })
  }

  const handleImageChange = e => {
    setstate({
      ...state,
      image: e.target.files[0],
    })
  }
  const handleSubmit = e => {
    e.preventDefault()
    dispatch(createProduct())

    const form_data = new FormData()
    {
      state?.image?.name &&
        form_data.append("image", state?.image, state?.image?.name)
    }
    form_data.append("name", state.name)
    form_data.append("product_code", state.code)
    form_data.append("profit", state.profit)

    let url = `${API_URL}/store/product/`
    axios
      .post(url, form_data, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: "token " + localStorage.getItem("token"),
        },
      })
      .then(res => {
        setBtnDisabled(false)
        setRemove(true)
        dispatch(createProductSuccess(res.data))
        dispatch(getProductDetailSuccess(res.data))
        window.scrollTo(0, 400)
      })
      .catch(err => createProductFail(err))
  }

  return (
    <>
      <MetaTags>
        <title>Product | Indtech </title>
      </MetaTags>

      <div className="page-content">
        <Breadcrumbs title="Products" breadcrumbItem="Create Product" />
        <Container fluid>
          <div className="container-fluid">
            <Row>
              <Col lg={12}>{ProductForm()}</Col>
            </Row>
          </div>
          {btnDisabled == false && (
            <>
              <div className="container-fluid">
                <CrudProductDetail myDisabled={btnDisabled} />
              </div>
              <div className="container-fluid">
                <OtherCost myDisabled={btnDisabled} />
              </div>
              <div className="container-fluid">
                <RawmaterialForm myDisabled={btnDisabled} />
              </div>
              <Link
                to={`/products/${productDetail?.id}`}
                className="text-end d-block mb-5 mt-3"
              >
                <Badge
                  className={"font-size-12 p-3 mx-3 badge-soft-success"}
                  style={{ cursor: "pointer" }}
                  pill
                >
                  See AlL Details Of Created Product
                </Badge>
              </Link>
            </>
          )}
        </Container>
      </div>
    </>
  )

  function ProductForm() {
    return (
      <Card>
        <CardBody>
          <CardTitle className="h4 mb-4">Add New Product</CardTitle>

          <form className="form-horizontal" onSubmit={handleSubmit}>
            {createProducterror && (
              <Alert color="danger">{createProducterror}</Alert>
            )}

            <div className="row mb-4">
              <Label htmlFor="name" className="col-sm-3 col-form-label">
                Product Name
              </Label>
              <Col sm={9}>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  id="name"
                  value={state.name}
                  onChange={handleChange}
                  required
                />
              </Col>
            </div>
            <div className="row mb-4">
              <Label htmlFor="code" className="col-sm-3 col-form-label">
                Product Code
              </Label>
              <Col sm={9}>
                <input
                  type="text"
                  name="product_code"
                  className="form-control"
                  id="code"
                  value={state.code}
                  onChange={handleChange}
                />
              </Col>
            </div>

            <div className="row mb-4">
              <Label htmlFor="profit" className="col-sm-3 col-form-label">
                Profit
              </Label>
              <Col sm={9}>
                <input
                  name="profit"
                  type="number"
                  min={0}
                  className="form-control"
                  id="profit"
                  value={state.profit}
                  onChange={handleChange}
                />
              </Col>
            </div>

            <div className="row mb-4">
              <Label htmlFor="image" className="col-sm-3 col-form-label">
                Product Images
              </Label>
              <Col sm={9}>
                <input
                  name="image"
                  type="file"
                  id="image"
                  accept="image/png, image/jpeg"
                  className="form-control"
                  onChange={handleImageChange}
                />
              </Col>
            </div>

            {remove == false && (
              <div className="row justify-content-end">
                <Col sm={2}>
                  <div>
                    <Button type="submit" color="success" className="w-md">
                      {loading && (
                        <>
                          <i className="bx bx-loader bx-spin font-size-16 align-middle me-2"></i>
                        </>
                      )}
                      Create
                    </Button>
                  </div>
                </Col>
              </div>
            )}
          </form>
        </CardBody>
      </Card>
    )
  }
}

export default CreateProduct
