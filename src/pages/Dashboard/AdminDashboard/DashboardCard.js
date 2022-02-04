import React from "react"
import { useSelector } from "react-redux"
import { Card, CardBody, Col, Row } from "reactstrap"
import { Link } from "react-router-dom"

function DashboardCard() {
  const { dashboardLoading, dashboardData } = useSelector(state => ({
    dashboardLoading: state.Dashboard.dashboardLoading,
    dashboardData: state.Dashboard.dashboardData,
  }))

  const cardData = [
    {
      title: "Total Orders",
      cardValue: dashboardData?.total_orders,
      iconClass: "note",
      routeLink: "/orders",
      loading: dashboardLoading,
      alt: "No Orders",
    },
    {
      title: "Pending Orders",
      cardValue: dashboardData?.pending_orders,
      iconClass: "book-bookmark",
      routeLink: "/orders/?Pending",
      loading: dashboardLoading,
      alt: "No Pending Orders",
    },
    {
      title: "Chartered Orders",
      cardValue: dashboardData?.chartered_orders,
      iconClass: "book-bookmark",
      routeLink: "/orders",
      loading: dashboardLoading,
      alt: "No Chartered Orders",
    },
    {
      title: "Pending Quotation",
      cardValue: dashboardData?.pending_quotations,
      iconClass: "book-bookmark",
      routeLink: "/quotations?Pending",
      loading: dashboardLoading,
      alt: "No Pending Quotation",
    },
    {
      title: "Total Store Items",
      cardValue: dashboardData?.total_store_item,
      iconClass: "book-bookmark",
      routeLink: "/store",
      loading: dashboardLoading,
      alt: "No Store Items",
    },

    {
      title: "Out Of Stock",
      cardValue: dashboardData?.out_of_stock_items?.length,
      iconClass: "book-bookmark",
      routeLink: "/store",
      loading: dashboardLoading,
      alt: "All Stocks Available",
    },
  ]

  return (
    <>
      {cardData?.map((item, key) => (
        <Col lg={4} key={key}>
          <Card className="blog-stats-wid">
            <CardBody>
              <Link to={item.routeLink}>
                <div className="d-flex flex-wrap">
                  <div className="me-3">
                    <p className="text-muted mb-2">{item.title}</p>
                    {item.cardValue > 0 && (
                      <h5 className="mb-0">{item.cardValue}</h5>
                    )}
                    <p className="m-0 text-info">
                      {item.cardValue ? <></> : item.alt}
                    </p>
                  </div>

                  <div className="avatar-sm ms-auto">
                    <div className="avatar-title bg-light rounded-circle text-primary font-size-20">
                      <i className={"bx bxs-" + `${item.iconClass}`}></i>
                    </div>
                  </div>
                </div>
              </Link>
            </CardBody>
          </Card>
        </Col>
      ))}
    </>
  )
}

export default DashboardCard
