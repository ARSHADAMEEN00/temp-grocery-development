import React from "react"
import { MetaTags } from "react-meta-tags"
import { Container } from "reactstrap"

//componetns
import AdminDashboard from "./AdminDashboard"
import DefualtComponent from "./DefualtComponent"
import QCDashboard from "./QcDashboard"
import StoreManagerDashboard from "./StoreManagerDashboard"
import SalesmanDashboard from "./SalesmanDashboard"
import ProductionManagerDashboard from "./ProductionMnager"

function index() {
  const Role = localStorage.getItem("role")

  function MyDashboard() {
    let Dashboard = <DefualtComponent />
    switch (Role) {
      case "admin":
        Dashboard = <AdminDashboard />
        break
      case "productionmanager":
        Dashboard = <ProductionManagerDashboard />
        break
      case "salesman":
        Dashboard = <SalesmanDashboard />
        break
      case "storemanager":
        Dashboard = <StoreManagerDashboard />
        break
      case "generalmanager":
        Dashboard = <AdminDashboard />
        break
      case "qualitychecker":
        Dashboard = <QCDashboard />
        break

      default:
        Dashboard = <DefualtComponent />
        break
    }
    return Dashboard
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Indtech | Home</title>
        </MetaTags>
        <Container fluid>
          <h4>Dashboard</h4>
        </Container>
        {MyDashboard()}
      </div>
    </React.Fragment>
  )
}

export default index
