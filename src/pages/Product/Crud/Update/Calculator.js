import React, { useState } from "react"
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap"
import classnames from "classnames"

//SimpleBar
import SimpleBar from "simplebar-react"
import CalcForm from "./CalcForm"

const Calculator = props => {
  const [activeTab, setActiveTab] = useState("1")

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab)
  }
  return (
    <React.Fragment>
      <Col>
        <Card>
          <CardHeader className="bg-transparent border-bottom">
            <div className="d-flex flex-wrap">
              <div className="me-2 mb-2">
                <h5 className="card-title mt-1 mb-0">Calculator</h5>
              </div>
              <ul
                className="nav nav-tabs nav-tabs-custom card-header-tabs ms-auto"
                role="tablist"
              >
                <NavItem>
                  <NavLink
                    to="#"
                    className={classnames({ active: activeTab === "1" })}
                    onClick={() => {
                      toggle("1")
                    }}
                  >
                    Sheet
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === "2" })}
                    onClick={() => {
                      toggle("2")
                    }}
                  >
                    Pipe
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === "3" })}
                    onClick={() => {
                      toggle("3")
                    }}
                  >
                    Square Tupe
                  </NavLink>
                </NavItem>
              </ul>
            </div>
          </CardHeader>

          <CardBody>
            <SimpleBar>
              <div>
                <TabContent activeTab={activeTab}>
                  <TabPane className="show" tabId="1">
                    <CalcForm
                      fields={[
                        "quantity",
                        "width",
                        "length",
                        "thickness",
                        // "density",
                      ]}
                      type={"sheet"}
                      unit={"Meter"}
                    />
                  </TabPane>
                  <TabPane className="show" tabId="2">
                    <CalcForm
                      fields={["quantity", "diameter", "thickness", "length"]}
                      type={"pipe"}
                      unit={"Meter"}
                    />
                  </TabPane>
                  <TabPane className="show" tabId="3">
                    <CalcForm
                      fields={["quantity", "thickness", "width", "length"]}
                      type={"square tupe"}
                      unit={"Meter"}
                    />
                  </TabPane>
                </TabContent>
              </div>
            </SimpleBar>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  )
}

export default Calculator
