import React from "react"
import { MetaTags } from "react-meta-tags"
import { Container } from "reactstrap"

//componetns
import AdminDashboard from "./AdminDashboard"
import GeneralManagerDashboard from "./GeneralManagerDashboard"
import DefualtComponent from "./DefualtComponent"
import QCDashboard from "./QcDashboard"
import StoreManagerDashboard from "./StoreManagerDashboard"
import SupervisorDashboard from "./SupervisorDashboard"

function index() {
  const Role = sessionStorage.getItem("role")

  function MyDashboard() {
    let Dashboard = <DefualtComponent />
    switch (Role) {
      case "admin":
        Dashboard = <AdminDashboard />
        break
      case "productionmanager":
        Dashboard = <AdminDashboard />
        break
      case "supervisor":
        Dashboard = <SupervisorDashboard />
        break
      case "storemanager":
        Dashboard = <StoreManagerDashboard />
        break
      case "generalmanager":
        Dashboard = <GeneralManagerDashboard />
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
