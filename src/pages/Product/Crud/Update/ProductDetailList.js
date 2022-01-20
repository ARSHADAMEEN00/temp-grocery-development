import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { Row, Col, Card, CardBody, Form, CardTitle, Spinner } from "reactstrap"
import { map } from "lodash"
import { deleteCurdProductDetail } from "store/actions"


function ProductDetailList() {
    const dispatch = useDispatch()

    const { Productloading, productDetail } = useSelector(state => ({
        Productloading: state.Products.loading,
        productDetail: state.Products.productDetail.productdetail
    }))

    const discription = productDetail?.filter((item => item.is_description == true))
    const NotDiscription = productDetail?.filter((item => item.is_description == false))

    const onDeleteDetail = (id) => {
        dispatch(deleteCurdProductDetail(id))
    }
    return <>
        {productDetail?.length > 0 && <Card>
            <CardBody>
                <CardTitle className="h4 mb-4">Product Details </CardTitle>
                {Productloading ? (
                    <Spinner type="grow" color="gray" />
                ) : (
                    <Form className="repeater" encType="multipart/form-data">
                        <div>
                            {map(discription, (item, index) => (
                                <Row key={index}>
                                    <Row className="text-muted mt-4">
                                        <Col lg={12} md={6}>
                                            <p>
                                                <i className="mdi mdi-chevron-right text-primary me-1" />
                                                <b>Title</b> : {item.title}
                                            </p>
                                        </Col>

                                        <Col lg={6} md={4}>
                                            <p>
                                                <b>Detail</b> : {item.detail}
                                            </p>
                                        </Col>
                                        <Col
                                            lg={2}
                                            md={2}
                                            className="align-self-center mt-0 m-auto"
                                        >
                                            <div
                                                className="d-grid "
                                                style={{ maxWidth: "200px" }}
                                            >
                                                <i
                                                    style={{
                                                        color: "red",
                                                        opacity: "0.5",
                                                        cursor: "pointer",
                                                    }}
                                                    className="fas fa-trash"
                                                    title="remove"
                                                    onClick={() => onDeleteDetail(item.id)}
                                                ></i>
                                            </div>
                                        </Col>
                                    </Row>
                                </Row>
                            ))}

                            {map(NotDiscription, (item, index) => (
                                <Row key={index}>
                                    <Row className="text-muted mt-4">
                                        <Col lg={12} md={6}>
                                            <p>
                                                <i className="mdi mdi-chevron-right text-primary me-1" />
                                                <b>Title</b> : {item.title}
                                            </p>
                                        </Col>

                                        <Col lg={6} md={4}>
                                            <p>
                                                <b>Detail</b> : {item.detail}
                                            </p>
                                        </Col>
                                        <Col
                                            lg={2}
                                            md={2}
                                            className="align-self-center mt-0 m-auto"
                                        >
                                            <div
                                                className="d-grid "
                                                style={{ maxWidth: "200px" }}
                                            >
                                                <i
                                                    style={{
                                                        color: "red",
                                                        opacity: "0.5",
                                                        cursor: "pointer",
                                                    }}
                                                    className="fas fa-trash"
                                                    title="remove"
                                                    onClick={() => onDeleteDetail(item.id)}
                                                ></i>
                                            </div>
                                        </Col>
                                    </Row>
                                </Row>
                            ))}
                        </div>
                    </Form>
                )}
            </CardBody>
        </Card>}
    </>;
}

export default ProductDetailList;
