import React, { useState } from "react"

import {
  Card,
  Nav,
  CardBody,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap"
import classnames from "classnames"
import Stores from "./DatatableTables"

function StoreList() {
  const [activeTab, setactiveTab] = useState({
    id: "1",
    title: "Not Provided",
    sort: "not provided",
  })

  return (
    <>
      <Card>
        <CardBody>
          <h4 className="card-title mb-4">{activeTab.title}</h4>

          <Nav pills className="bg-light rounded" role="tablist">
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab.id === "1" })}
                onClick={() => {
                  setactiveTab({
                    ...activeTab,
                    id: "1",
                    title: "Not Provided",
                    sort: "not provided",
                  })
                }}
              >
                Not Provided
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab.id === "2" })}
                onClick={() => {
                  setactiveTab({
                    ...activeTab,
                    id: "2",
                    title: "Provided",
                    sort: "provided",
                  })
                }}
              >
                Provided
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab.id === "3" })}
                onClick={() => {
                  setactiveTab({
                    ...activeTab,
                    id: "3",
                    title: "History",
                    sort: "",
                  })
                }}
              >
                History
              </NavLink>
            </NavItem>
          </Nav>

          {/* //TABLE DATA */}
          <TabContent activeTab={activeTab.id} className="mt-4">
            <TabPane tabId="1">
              {activeTab.id === "1" && (
                <Stores storeStatus={activeTab.sort} title={activeTab.title} />
              )}
            </TabPane>

            <TabPane tabId="2">
              {activeTab.id === "2" && (
                <Stores storeStatus={activeTab.sort} title={activeTab.title} />
              )}
            </TabPane>
            <TabPane tabId="3">
              {activeTab.id === "3" && (
                <Stores storeStatus={activeTab.sort} title={activeTab.title} />
              )}
            </TabPane>
          </TabContent>
        </CardBody>
      </Card>
    </>
  )
}

export default StoreList
