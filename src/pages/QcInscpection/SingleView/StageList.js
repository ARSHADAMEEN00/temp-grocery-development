import React from "react"
import { Badge, CardTitle, Media } from "reactstrap"
import PropTypes from "prop-types"
import { map } from "lodash"

function StageList({ stageData }) {
  const stageStatus = status => {
    if (status === "Started") {
      return "warning"
    } else if (status === "Finished") {
      return "success"
    } else if (status === "Pending") {
      return "info"
    }
  }
  return (
    <>
      <CardTitle className="mb-3 mt-4">Stages</CardTitle>
      <ul className="verti-timeline list-unstyled">
        {map(stageData, (item, key) => (
          <li key={key} className="event-list">
            <div className="event-timeline-dot">
              <i
                className={`bx font-size-18 ${
                  item.status === "Started"
                    ? "bxs-right-arrow-circle bx-fade-right text-info"
                    : "bx-right-arrow-circle"
                }`}
              />
            </div>
            <Media>
              <div className="me-5">
                <h5
                  className={` ${
                    item.status === "Started" ? "font-size-16" : "font-size-14"
                  }`}
                >
                  {item.stage}
                  <i className="bx bx-down-arrow-alt font-size-16 text-info align-middle ms-2" />
                </h5>
              </div>
              <Media body className="mx-5 text-end">
                {/* <button
                  className={`btn btn-info btn-sm mx-2 ${
                    item.status === "Pending" ? "" : "disabled"
                  } `}
                >
                  Start
                </button>
                <button
                  className={`btn btn-success btn-sm mx-2 ${
                    item.status === "Started" ? "" : "disabled"
                  } `}
                >
                  Finish
                </button> */}
              </Media>
            </Media>
            <Media body className="mx-4">
              <p>
                Status :{" "}
                <Badge
                  className={
                    "font-size-13 p-2 mx-2 badge-soft-" +
                    `${stageStatus(item.status)}`
                  }
                  pill
                >
                  {item.status}
                </Badge>
              </p>
              <div>{item.note}</div>
            </Media>
          </li>
        ))}
      </ul>
    </>
  )
}

export default StageList

StageList.propTypes = {
  stageData: PropTypes.array,
}
