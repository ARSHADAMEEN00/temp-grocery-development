import PropTypes from "prop-types"
import React from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { Col, Card, CardBody, Spinner } from "reactstrap"

const MiniWidget = () => {
  const { dashboardLoading, dashboardData, Quoatations } = useSelector(state => ({
    dashboardLoading: state.Dashboard.dashboardLoading,
    dashboardData: state.Dashboard.dashboardData,
    Quoatations: state.Orders.quotation.count
  }))

  const analatics = [
    {
      icon: "bx bx-copy-alt",
      title: "Chartered Orders",
      value: dashboardData?.chartered_orders,
      badgeValue: dashboardData?.total_orders,
      color: "success",
      desc: "Orders ",
      warningMsg: "No Order ",
      msgColor: "info",
      loading: dashboardLoading,
      linkPath: "/orders",
    },
    // {
    //   icon: "bx bx-copy-alt",
    //   title: "Wage Paid Today",
    //   value: (
    //     <>
    //       <i className="fas fa-rupee-sign mx-1 font-size-17 "></i>
    //       {dashboardData?.wage_paid_per_day}
    //     </>
    //   ),
    //   badgeValue: dashboardData?.no_of_transactions,
    //   color: "success",
    //   desc: "Transaction",
    //   warningMsg: "No Transaction Today",
    //   msgColor: "info",
    //   loading: dashboardLoading,
    //   linkPath: "",
    // },
    {
      icon: "bx bx-purchase-tag-alt",
      title: "Out Of Stock",
      value: dashboardData?.out_of_stock_items?.length,
      badgeValue: dashboardData?.total_store_item,
      color: "success",
      desc: "Stocks Available",
      warningMsg: "",
      msgColor: "success",
      loading: dashboardLoading,
      linkPath: "/store",
    },
    {
      icon: "bx bx-copy-alt",
      title: "Pending Quotation",
      value: dashboardData?.pending_quotations,
      badgeValue: 0,
      color: "success",
      desc: "Quotations",
      warningMsg: <>{`${dashboardData?.pending_quotations} - ${"Pending Quotations"}`} </>,
      msgColor: "info",
      loading: dashboardLoading,
      linkPath: "/quotations?Pending",
    },
    // {
    //   icon: "bx bx-copy-alt",
    //   title: "Pending Orders",
    //   value: dashboardData?.pending_orders,
    //   badgeValue: dashboardData?.total_orders,
    //   color: "success",
    //   desc: "Totel Orders",
    //   warningMsg: "",
    //   msgColor: "info",
    //   loading: dashboardLoading,
    //   linkPath: "/orders",
    // },
    // {
    //   icon: "bx bx-archive-in",
    //   title: "Finished Products",
    //   value: dashboardData?.finished_product,
    //   badgeValue: "",
    //   color: "success",
    //   desc: "Finished Orders",
    //   warningMsg: `${new Date().getFullYear()}- ${
    //     new Date().getFullYear() + 1
    //   }`,
    //   msgColor: "info",
    //   loading: dashboardLoading,
    //   linkPath: "/products",
    // },
    // {
    //   icon: "bx bx-purchase-tag-alt",
    //   title: "Store",
    //   value: dashboardData?.total_store_item,
    //   badgeValue: dashboardData?.out_of_stock_items?.length,
    //   color: "warning",
    //   desc: "Out Of Stock Item",
    //   warningMsg: "Stocks Available",
    //   msgColor: "success",
    //   loading: dashboardLoading,
    //   linkPath: "/sttore",
    // },
  ]
  return (
    <React.Fragment>
      {analatics.map((report, index) => (
        <Col sm="4" key={index}>
          <Card>
            <CardBody>
              <Link
                to={report.linkPath}
                className="d-flex align-items-center mb-3"
              >
                <div className="avatar-xs me-3">
                  <span className="avatar-title rounded-circle bg-primary bg-soft text-primary font-size-18">
                    <i className={report.icon} />
                  </span>
                </div>
                <h5 className="font-size-14 mb-0">{report.title}</h5>
              </Link>
              {report.loading ? (
                <Spinner type="grow" color="info" />
              ) : (
                <div className="text-muted mt-4">
                  <h4>
                    {report.value}
                    <i className="mdi mdi-chevron-up ms-1 text-success" />
                  </h4>
                  <div className="d-flex">
                    {report.badgeValue > 0 ? (
                      <span
                        className={
                          "badge badge-soft-" +
                          `${report.badgeValue > 0
                            ? report.color
                            : report.msgColor
                          }` +
                          " font-size-12"
                        }
                      >
                        {report.badgeValue}
                      </span>
                    ) : (
                      <span className="text-info">{report.warningMsg}</span>
                    )}
                    {report.badgeValue > 0 && (
                      <span className="ms-2 text-truncate">{report.desc}</span>
                    )}
                  </div>
                </div>
              )}
            </CardBody>
          </Card>
        </Col>
      ))}
    </React.Fragment>
  )
}

MiniWidget.propTypes = {
  analatics: PropTypes.array,
}

export default MiniWidget
