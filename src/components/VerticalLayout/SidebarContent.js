import PropTypes from "prop-types"
import React, { useEffect, useRef } from "react"
import { map } from "lodash"
import { mySideBar } from "./sidebarData"

// //Import Scrollbar
import SimpleBar from "simplebar-react"

// MetisMenu
import MetisMenu from "metismenujs"
import { withRouter } from "react-router-dom"
import { Link } from "react-router-dom"

//i18n
import { withTranslation } from "react-i18next"

const SidebarContent = props => {
  const ref = useRef()



  // Use ComponentDidMount and ComponentDidUpdate method symultaniously
  useEffect(() => {
    const pathName = props.location.pathname

    const initMenu = () => {
      new MetisMenu("#side-menu")
      let matchingMenuItem = null
      const ul = document.getElementById("side-menu")
      const items = ul.getElementsByTagName("a")
      for (let i = 0; i < items.length; ++i) {
        if (pathName === items[i].pathname) {
          matchingMenuItem = items[i]
          break
        }
      }
      if (matchingMenuItem) {
        activateParentDropdown(matchingMenuItem)
      }
    }
    initMenu()
  }, [props.location.pathname])

  useEffect(() => {
    ref.current.recalculate()
  })

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300
      }
    }
  }

  function activateParentDropdown(item) {
    item.classList.add("active")
    const parent = item.parentElement
    const parent2El = parent.childNodes[1]
    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show")
    }

    if (parent) {
      parent.classList.add("mm-active")
      const parent2 = parent.parentElement

      if (parent2) {
        parent2.classList.add("mm-show") // ul tag

        const parent3 = parent2.parentElement // li tag

        if (parent3) {
          parent3.classList.add("mm-active") // li
          parent3.childNodes[0].classList.add("mm-active") //a
          const parent4 = parent3.parentElement // ul
          if (parent4) {
            parent4.classList.add("mm-show") // ul
            const parent5 = parent4.parentElement
            if (parent5) {
              parent5.classList.add("mm-show") // li
              parent5.childNodes[0].classList.add("mm-active") // a tag
            }
          }
        }
      }
      scrollElement(item)
      return false
    }
    scrollElement(item)
    return false
  }

  const Role = sessionStorage.getItem("role")



  function storeManagerSidebar() {
    const sidebar = mySideBar?.filter(
      sidebar => sidebar.heading == "Product" || sidebar.heading == "Store"
    )
    sidebar?.forEach(bar => {
      bar.subTitles = bar.subTitles?.filter(
        subTitle => subTitle.title !== "Create Product"
      )
    })
    return sidebar
  }

  function productionManagerSidebar() {
    const sidebar = mySideBar?.filter(
      sidebar => sidebar.heading !== "Production Manager" && sidebar.heading !== "General Manager"
    )
    sidebar?.forEach(bar => {
      bar.subTitles = bar.subTitles?.filter(
        subTitle => subTitle.title !== "Create Product" && subTitle.title !== "Create Clients"
      )
    })
    return sidebar
  }

  function qcSidebar() {
    const sidebar = mySideBar?.filter(
      sidebar => sidebar.heading == "Production"
    )
    sidebar?.forEach(bar => {
      bar.subTitles = bar.subTitles?.filter(
        subTitle => subTitle.title !== "Create Stages"
      )
    })
    return sidebar
  }


  function sidebarProtected() {
    let sidebar = []
    switch (Role) {
      case "admin":
        sidebar = mySideBar
        break
      case "generalmanager":
        sidebar = mySideBar?.filter(
          sidebar => sidebar.heading !== "General Manager"
        )
        break
      case "productionmanager":
        sidebar = productionManagerSidebar()
        break
      case "storemanager":
        sidebar = storeManagerSidebar()
        break

      case "qualitychecker":
        sidebar = qcSidebar()
        break
      default:
        sidebar = []
        break
    }
    return sidebar
  }





  return (
    <React.Fragment>
      <SimpleBar className="h-100" ref={ref}>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title">{props.t("Menu")} </li>
            <li>
              <Link to="/#" className="">
                <i className="bx bxs-dashboard"></i>
                <span>{props.t("Dashboard")}</span>
              </Link>
            </li>

            {map(sidebarProtected(), (item, index) => (
              <li key={index}>
                <Link
                  to="/#"
                  className={`${item?.badgeValue ? "" : "has-arrow"} `}
                >
                  <i className={`bx bxs-${item.iconClass}`}></i>
                  <span>{props.t(`${item?.heading}`)}</span>
                  <span
                    className={`badge rounded-pill float-end bg-${item?.badgeClass}`}
                  >
                    {item?.badgeValue}
                  </span>
                </Link>
                <ul className="sub-menu" aria-expanded="false">
                  {map(item?.subTitles, (title, index1) => (
                    <li key={index1}>
                      <Link to={title?.routeLink}>
                        {props.t(`${title?.title}`)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </SimpleBar>
    </React.Fragment>
  )
}

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
}

export default withRouter(withTranslation()(SidebarContent))
