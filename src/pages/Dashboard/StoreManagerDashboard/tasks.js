import React, { useEffect, useState } from "react"
import classnames from "classnames"
import SimpleBar from "simplebar-react"
import { useDispatch, useSelector } from "react-redux"
import { map } from "lodash"
import { Link } from "react-router-dom"
import {
  Col,
  Card,
  CardBody,
  Nav,
  NavItem,
  NavLink,
  CardTitle,
  Table,
} from "reactstrap"
import { getStoreSupply } from "store/actions"

const StoreSupplyList = props => {
  const dispatch = useDispatch()

  const [activeTab, setActiveTab] = useState("1")
  const toggleTab = tab => {
    if (activeTab !== tab) {
      setActiveTab(tab)
    }
  }
  const { storeSupply } = useSelector(state => ({
    storeSupply: state.StoreItems.storeSupply,
  }))
  const NotProvided = storeSupply?.results?.filter(
    item => item.store_status == "Not Provided"
  )
  const Provided = storeSupply.results?.filter(
    item => item.store_status == "Provided"
  )

  useEffect(() => {
    dispatch(getStoreSupply())
  }, [dispatch])

  return (
    <React.Fragment>
      <Col xl="12">
        <Card>
          <CardBody>
            <CardTitle>Store Supply</CardTitle>
            <Nav pills className="bg-light rounded mt-2">
              <NavItem>
                <NavLink
                  className={classnames({
                    active: activeTab === "1",
                  })}
                  onClick={() => {
                    toggleTab("1")
                  }}
                  style={{
                    backgroundColor: `${activeTab == "1" ? "#74788d" : ""}`,
                  }}
                >
                  Not Provided
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: activeTab === "2",
                  })}
                  onClick={() => {
                    toggleTab("2")
                  }}
                  style={{
                    backgroundColor: `${activeTab == "2" ? "#34c38f" : ""}`,
                  }}
                >
                  Provided
                </NavLink>
              </NavItem>
            </Nav>

            <div className="mt-4">
              <SimpleBar>
                <div className="table-responsive">
                  {activeTab == "1" && (
                    <div className="container-fluid">
                      <Table className="table align-middle mb-0">
                        <tbody>
                          {map(NotProvided, (item, index) => (
                            <tr key={index}>
                              <td>
                                <h5 className="font-size-14 mb-1">
                                  <i className="mdi mdi-circle-medium align-middle text-primary me-1" />
                                  {item.productname}
                                </h5>
                                <p className="text-muted mb-0 mx-3">
                                  no.of Rawmaterials -
                                  {item.raw_materials?.length}
                                </p>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                      <div
                        className="d-flex "
                        style={{ justifyContent: "flex-end" }}
                      >
                        <Link
                          to="/store"
                          className="btn btn-info "
                          style={{ width: "fitcontent" }}
                        >
                          View More
                        </Link>
                      </div>
                    </div>
                  )}
                  {activeTab == "2" && (
                    <div className="container-fluid">
                      <Table className="table align-middle mb-0">
                        <tbody>
                          {map(Provided, (item, index) => (
                            <tr key={index}>
                              <td>
                                <h5 className="font-size-14 mb-1">
                                  <i className="mdi mdi-circle-medium align-middle text-primary me-1" />
                                  {item.productname}
                                </h5>
                                <p className="text-info mb-0 mx-3">
                                  no.of Rawmaterials -
                                  {item.raw_materials?.length}
                                </p>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                      <div
                        className="d-flex mt-2"
                        style={{ justifyContent: "flex-end" }}
                      >
                        <Link
                          to="/store"
                          className="btn btn-info "
                          style={{ width: "fitcontent" }}
                        >
                          View More
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </SimpleBar>
            </div>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  )
}

export default StoreSupplyList
