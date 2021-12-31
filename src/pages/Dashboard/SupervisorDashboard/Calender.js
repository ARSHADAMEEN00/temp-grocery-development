import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { map } from "lodash"

import {
  Card,
  CardBody,
  CardHeader,
  CardText,
  CardTitle,
  Col,
  Row,
} from "reactstrap"

import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin from "@fullcalendar/interaction"
import BootstrapTheme from "@fullcalendar/bootstrap"
import ActivityComp from "./ActivityComp"

//css
import "@fullcalendar/bootstrap/main.css"

//redux
import { useSelector, useDispatch } from "react-redux"
import { getSchecduleEvents } from "store/actions"

const Calender = props => {
  const dispatch = useDispatch()

  const { scheduleEvents } = useSelector(state => ({
    scheduleEvents: state.Supervisors.scheduleEvents,
  }))

  useEffect(() => {
    dispatch(getSchecduleEvents())
  }, [dispatch])

  const events = map(scheduleEvents?.results, (event, index) => ({
    ...event,
    key: index,
    id: event.auto_id,
    title: event.product,
    date: event.start_date,
    end: event.start_date,
    // event.quantity,
    className: "bg-info text-white ",
  }))

  const [modal, setModal] = useState(false)
  const [detailsEvent, setDetailsEvent] = useState(null)
  const [color, setColor] = useState()

  const toggle = () => {
    setModal(!modal)
  }
  const handleDateClick = arg => {
    if (arg?.event?._def?.extendedProps) {
      toggle()
    }
  }
  const handleEventClick = arg => {
    if (arg?.event?._def?.extendedProps) {
      setDetailsEvent(arg?.event._def.extendedProps)
    } else {
      setDetailsEvent({})
    }
    toggle()
  }

  const allColors = ["primary", "info", "danger", "success", "warning", "dark"]
  useEffect(() => {
    setColor(allColors[Math.floor(Math.random() * allColors.length)])
  }, [detailsEvent])

  return (
    <React.Fragment>
      <Col className="col-12">
        <Card>
          <CardBody>
            <CardTitle style={{ marginBottom: "2rem" }}>Scheduled</CardTitle>
            <Row>
              <Col lg={8}>
                {/* fullcalendar control */}
                <FullCalendar
                  plugins={[BootstrapTheme, dayGridPlugin, interactionPlugin]}
                  slotDuration={"00:15:00"}
                  handleWindowResize={true}
                  themeSystem="bootstrap"
                  headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,dayGridWeek,dayGridDay",
                  }}
                  events={events}
                  dateClick={handleDateClick}
                  eventClick={handleEventClick}
                />
              </Col>
              <Col lg={4}>
                {detailsEvent == null ? (
                  <></>
                ) : (
                  <>
                    <Card className={`border border-${color}`}>
                      <CardHeader className="bg-transparent">
                        <h5 className={`my-0 text-${color}`}>
                          <i className="mdi mdi-bullseye-arrow me-3" />
                          Schedule Details
                        </h5>
                      </CardHeader>
                      <CardBody>
                        <CardTitle className="mt-0">
                          {detailsEvent?.product}
                        </CardTitle>
                        <CardText>
                          <ul className={`ps-3 mb-0 text-${color}`}>
                            <li className="py-1">
                              Quantity : {detailsEvent?.quantity},
                            </li>
                            <li className="py-1">
                              id : {detailsEvent?.auto_id},
                            </li>
                          </ul>
                          <p className="pt-2">
                            This Schedule is created on{" "}
                            {detailsEvent?.start_date},{" "}
                          </p>
                        </CardText>
                      </CardBody>
                    </Card>
                  </>
                )}
                <ActivityComp />
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  )
}

Calender.propTypes = {
  events: PropTypes.array,
  categories: PropTypes.array,
  className: PropTypes.string,
  getEvents: PropTypes.func,
  addNewEvent: PropTypes.func,
  updateEvent: PropTypes.func,
  deleteEvent: PropTypes.func,
  getCategories: PropTypes.func,
}

export default Calender
