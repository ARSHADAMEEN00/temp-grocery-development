import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardTitle, Col, FormGroup, Label, Row, Spinner } from 'reactstrap'
import AvForm from "availity-reactstrap-validation/lib/AvForm"
import AvField from "availity-reactstrap-validation/lib/AvField"
import Select from "react-select"
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { createRawmaterial, getProductDetail, getStoreItems } from 'store/actions'

function RawmaterialInput() {
    const params = useParams()
    const dispatch = useDispatch()



    const { loading, storeItems } = useSelector(state => ({
        loading: state.StoreItems.loading,
        storeItems: state.StoreItems.storeItems,
    }))

    const [searchText, setSearchText] = useState("")
    const [selectedStore, setselectedStore] = useState(null)
    const [rawData, setRawData] = useState({
        product: params.id || "",
        store_item: "",
        quantity: "",
    })
    const handleEnters = textEntered => {
        setSearchText(textEntered)
    }

    const optionGroup1 = [
        {
            options: storeItems?.results?.map((result, index) => ({
                label: result.name,
                value: result.id,
                key: index,
            })),
        },
    ]

    function handlerFinalValue(event) {
        setselectedStore(event.label)
        setRawData({
            ...rawData,
            ["store_item"]: event.value,
        })
    }
    const onAddRawMaterial = () => {
        dispatch(createRawmaterial(rawData))
    }
    useEffect(() => {
        dispatch(getStoreItems(1))
    }, [dispatch])

    useEffect(() => {
        dispatch(getStoreItems(searchText, ""))
    }, [])

    return (
        <>
            <Col lg={12}>
                <Card>
                    <CardBody>
                        <CardTitle className="h4 mb-4">Add Raw Materials</CardTitle>
                        {loading ? (
                            <Spinner type="grow" color="gray" />
                        ) : (
                            <AvForm className="repeater" encType="multipart/form-data">
                                <div>
                                    <Row>
                                        <Col lg={6} className="mb-3">
                                            <FormGroup className="mb-3">
                                                <Label>Store item</Label>

                                                <div className="col-md-12"></div>
                                                <div className="mb-3 ajax-select mt-3 mt-lg-0 select2-container">
                                                    <Select
                                                        onInputChange={handleEnters}
                                                        value={selectedStore}
                                                        placeholder={selectedStore}
                                                        onChange={handlerFinalValue}
                                                        options={optionGroup1}
                                                        classNamePrefix="select2-selection"
                                                        isLoading={true}
                                                    />
                                                </div>
                                            </FormGroup>
                                        </Col>

                                        <Col lg={3} className="mb-3">
                                            <label htmlFor="resume">Quantity</label>
                                            <AvField
                                                name="quantity"
                                                type="number" min={0}
                                                className="form-control"
                                                id="resume"
                                                value={rawData.quantity}
                                                onChange={e =>
                                                    setRawData({
                                                        ...rawData,
                                                        ["quantity"]: e.target.value,
                                                    })
                                                }
                                                required
                                            />
                                        </Col>
                                        <Col lg={3}>
                                            <input
                                                type="button"
                                                className="btn btn-dark mt-4 mr-lg-0 "
                                                value="Add"
                                                onClick={() => onAddRawMaterial()}
                                            />
                                        </Col>
                                    </Row>
                                </div>
                            </AvForm>

                        )}
                    </CardBody>
                </Card>
            </Col>

        </>
    )
}

export default RawmaterialInput