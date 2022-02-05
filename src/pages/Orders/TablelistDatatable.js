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
import OrderHistory from "./DatatableTables"

function OrdersList() {
  const [activeTab, setactiveTab] = useState({
    id: "1",
    title: "Pending Order",
    sort: "pending",
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
                    title: "Pending Order",
                    sort: "pending",
                  })
                }}
              >
                Pending Order
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab.id === "2" })}
                onClick={() => {
                  setactiveTab({
                    ...activeTab,
                    id: "2",
                    title: "Started Orders",
                    sort: "started",
                  })
                }}
              >
                Started Orders
              </NavLink>
            </NavItem>
            {/* <NavItem>
              <NavLink
                className={classnames({ active: activeTab.id === "3" })}
                onClick={() => {
                  setactiveTab({
                    ...activeTab,
                    id: "3",
                    title: "Canceled Order",
                    sort: "canceled",
                  })
                }}
              >
                Canceled Order
              </NavLink>
            </NavItem> */}
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab.id === "4" })}
                onClick={() => {
                  setactiveTab({
                    ...activeTab,
                    id: "4",
                    title: "Shipped Order",
                    sort: "shipped",
                  })
                }}
              >
                Shipped Order
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab.id === "5" })}
                onClick={() => {
                  setactiveTab({
                    ...activeTab,
                    id: "5",
                    title: "Delivered Orders",
                    sort: "delivered",
                  })
                }}
              >
                Delivered Orders
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab.id === "6" })}
                onClick={() => {
                  setactiveTab({
                    ...activeTab,
                    id: "6",
                    title: "Order History",
                    sort: "",
                  })
                }}
              >
                Order History
              </NavLink>
            </NavItem>
          </Nav>

          {/* //TABLE DATA */}
          <TabContent activeTab={activeTab.id} className="mt-4">
            <TabPane tabId="1">
              {activeTab.id === "1" && (
                <OrderHistory
                  orderStatus={activeTab.sort}
                  title={activeTab.title}
                />
              )}
            </TabPane>

            <TabPane tabId="2">
              {activeTab.id === "2" && (
                <OrderHistory
                  orderStatus={activeTab.sort}
                  title={activeTab.title}
                />
              )}
            </TabPane>

            {/* <TabPane tabId="3">
              {activeTab.id === "3" && (
                <OrderHistory
                  orderStatus={activeTab.sort}
                  title={activeTab.title}
                />
              )}
            </TabPane> */}
            <TabPane tabId="4">
              {activeTab.id === "4" && (
                <OrderHistory
                  orderStatus={activeTab.sort}
                  title={activeTab.title}
                />
              )}
            </TabPane>
            <TabPane tabId="5">
              {activeTab.id === "5" && (
                <OrderHistory
                  orderStatus={activeTab.sort}
                  title={activeTab.title}
                />
              )}
            </TabPane>
            <TabPane tabId="6">
              {activeTab.id === "6" && (
                <OrderHistory
                  orderStatus={activeTab.sort}
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

export default OrdersList
