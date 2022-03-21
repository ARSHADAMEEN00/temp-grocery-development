import { map } from 'lodash'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { Card, CardBody, CardTitle, Table } from 'reactstrap'
import { getOrderRawmaterail } from 'store/actions'

function OrderRawmaterial() {
    const dispatch = useDispatch()
    const params = useParams()

    const { orderRawmaterials, orderitemLoading: loading } = useSelector(state => ({
        orderRawmaterials: state.Orders.orderRawmaterials,
        loading: state.Orders.loading,
    }))

    useEffect(() => {
        dispatch(getOrderRawmaterail(params?.id))
    }, [dispatch, loading])


    return (
        <Card>
            <CardBody>
                <CardTitle className="mb-4">Rawmaterails </CardTitle>

                <div className="table-responsive">
                    <Table className="table align-middle table-nowrap">
                        <thead className="table-light">
                            <tr>
                                <th>name</th>
                                <th>quantity</th>
                                <th>stock</th>
                            </tr>
                        </thead>
                        <tbody>
                            {map(orderRawmaterials, (item, index) => (
                                <tr key={index}>
                                    <td>
                                        <h5 className="font-size-13 m-0">
                                            <Link
                                                to={"!#"}
                                                className="text-dark"
                                            >
                                                {item.name}
                                            </Link>
                                        </h5>
                                    </td>
                                    <td>
                                        <h5
                                            className="font-size-13 m-0"
                                            style={{ whiteSpace: "break-spaces" }}
                                        >
                                            <Link
                                                to={"!#"}
                                                className="text-dark"
                                            >
                                                {item.quantity}
                                            </Link>
                                        </h5>
                                    </td>
                                    <td>
                                        <div className="d-flex">
                                            <Link
                                                to="#"
                                                className={`badge  ${item.stock === 0 ? "bg-danger" : "bg-info"} text-white font-size-11 me-1`}
                                            >
                                                {item.stock}
                                            </Link>
                                        </div>
                                    </td>



                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </CardBody>
        </Card>
    )
}

export default OrderRawmaterial