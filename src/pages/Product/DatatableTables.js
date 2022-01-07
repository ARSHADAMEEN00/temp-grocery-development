import React, { useEffect, useState } from "react"
import { Row, Col, Card, CardBody, Spinner } from "reactstrap"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { map, range } from "lodash"

// datatable related plugins
import BootstrapTable from "react-bootstrap-table-next"
import ToolkitProvider from "react-bootstrap-table2-toolkit"

//actions
import { getProducts } from "store/actions"

import "../../assets/scss/datatables.scss"
import defualtProduct from "../../assets/images/product.jpeg"

import MyPagination from "components/Common/MyPagination"

const Products = () => {
  const dispatch = useDispatch()
  const [page, setPage] = useState(1)
  const [searchText, setSearchText] = useState("")

  const { products, loading } = useSelector(state => ({
    products: state.Products.products,
    loading: state.Products.loading,
  }))

  const totalPages = Math.ceil(products?.count / 10)
  const pages = range(1, totalPages + 1)

  const pageSend = () => {
    if (page >= pages.length) {
      return pages.length
    }
    if (page < 1) {
      return 1
    } else {
      return page
    }
  }
  useEffect(() => {
    dispatch(getProducts(searchText, pageSend()))
  }, [dispatch, page, searchText])

  const columns = [
    {
      dataField: "image",
      text: "Image",
    },
    {
      dataField: "name",
      text: "Product",
      sort: true,
    },
    {
      dataField: "no_of_cols",
      text: "cols",
    },
    {
      dataField: "cost",
      text: "Cost",
    },
    {
      dataField: "profit",
      text: "Profit",
    },
    {
      dataField: "action",
      text: "Action",
    },
  ]

  const productData = map(products?.results, (item, index) => ({
    ...item,
    key: index,
    image: (
      <Link to={`products/${item?.id}`}>
        <img src={item.image ? item.image : defualtProduct} alt={item.name && item.name} className="avatar-md" />

      </Link>
    ),
    action: (
      <div>
        <Link to={`products/${item?.id}`} className="btn-light btn-sm">
          View Details
        </Link>
      </div>
    ),
  }))

  const defaultSorted = [
    {
      dataField: "id",
      order: "asc",
    },
  ]

  // Select All Button operation
  const selectRow = {
    mode: "checkbox",
  }

  const handleSearch = e => {
    setSearchText(e.target.value)
  }
  console.log(page);

  return (
    <React.Fragment>
      <Row>
        <Col className="col-12">
          <Card>
            <CardBody>
              <ToolkitProvider
                keyField="id"
                columns={columns}
                data={productData}
                search
              >
                {toolkitProps => (
                  <React.Fragment>
                    <Row className="mb-2">
                      <Col md="4">
                        <div className="search-box me-2 mb-2 d-inline-block">
                          <div className="position-relative">
                            <form
                              className="app-search d-lg-block"
                              onChange={e => handleSearch(e)}
                            >
                              <div className="position-relative">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Search..."
                                  defaultValue={searchText}
                                />
                                <span className="bx bx-search-alt" />
                              </div>
                            </form>
                          </div>
                        </div>
                      </Col>
                    </Row>
                    {loading ? (
                      <Spinner color="secondary" className="d-block m-auto" />
                    ) : (
                      <>
                        <Row>
                          <Col xl="12">
                            <div className="table-responsive">
                              <BootstrapTable
                                keyField={"id"}
                                responsive
                                bordered={false}
                                striped={false}
                                defaultSorted={defaultSorted}
                                selectRow={selectRow}
                                classes={"table align-middle table-nowrap"}
                                headerWrapperClasses={"thead-light"}
                                {...toolkitProps.baseProps}
                              />
                            </div>
                          </Col>
                        </Row>
                        <MyPagination
                          // onNextClick={() => setPage(page + 1)}
                          // onPrevClick={() => setPage(page - 1)} 
                          onNunClick={(item) => setPage(item)}
                          pages={pages}
                          clcickedPage={page}
                          apiPage={pageSend}
                        />
                      </>
                    )}
                  </React.Fragment>
                )}
              </ToolkitProvider>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default Products
