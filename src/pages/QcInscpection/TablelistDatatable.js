import React, { useState } from "react"
import { Container } from "reactstrap"
import { MetaTags } from "react-meta-tags"

import {
  Col,
  Card,
  Nav,
  CardBody,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Table,
} from "reactstrap"
import classnames from "classnames"

import DatatableTables from "./OrderItemHistory"
import ReadyToCheck from "./ReadyToCheck"
import OrderFiltered from "./OrderFiltered"

function ProductionOrder() {
  const [activeTab, setactiveTab] = useState({
    id: "1",
    title: "Orders For Checking",
    sort: "ready",
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
                    title: "Orders For Checking",
                    sort: "ready",
                  })
                }}
              >
                Ready To Check
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab.id === "2" })}
                onClick={() => {
                  setactiveTab({
                    ...activeTab,
                    id: "2",
                    title: "Upcoming Order Items",
                    sort: "upcoming",
                  })
                }}
              >
                Upcoming QC Check
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab.id === "3" })}
                onClick={() => {
                  setactiveTab({
                    ...activeTab,
                    id: "3",
                    title: "Approved Order Items",
                    sort: "pass",
                  })
                }}
              >
                QC Pass Orders Items
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab.id === "4" })}
                onClick={() => {
                  setactiveTab({
                    ...activeTab,
                    id: "4",
                    title: "Rejected Order Items",
                    sort: "reject",
                  })
                }}
              >
                QC Rejected Orders Items
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab.id === "5" })}
                onClick={() => {
                  setactiveTab({
                    ...activeTab,
                    id: "5",
                    title: "Order History",
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
                <ReadyToCheck sort={activeTab.sort} title={activeTab.title} />
              )}
            </TabPane>

            <TabPane tabId="2">
              {activeTab.id === "2" && (
                <OrderFiltered sort={activeTab.sort} title={activeTab.title} />
              )}
            </TabPane>

            <TabPane tabId="3">
              {activeTab.id === "3" && (
                <OrderFiltered sort={activeTab.sort} title={activeTab.title} />
              )}
            </TabPane>
            <TabPane tabId="4">
              {activeTab.id === "4" && (
                <OrderFiltered sort={activeTab.sort} title={activeTab.title} />
              )}
            </TabPane>
            <TabPane tabId="5">
              {activeTab.id === "5" && (
                <DatatableTables
                  sort={activeTab.sort}
                  title={activeTab.title}
                />
              )}
            </TabPane>
          </TabContent>
        </CardBody>
      </Card>
    </>
  )
}

export default ProductionOrder
