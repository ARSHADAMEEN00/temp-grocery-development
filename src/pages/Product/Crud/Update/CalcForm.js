import React, { useEffect, useState } from "react"
import { Badge, Col, Row } from "reactstrap"
import PropTypes from "prop-types"
import { map } from "lodash"

function CalcForm({ fields, type, unit }) {
  const [values, setValues] = useState({})

  const handleCalculate = ({ target: { name, value } }) => {
    setValues(values => {
      return { ...values, [name]: value }
    })
  }
  useEffect(() => {
    setValues({ ...values, density: 7.86 })
  }, [])

  //calu L/1000 * W/1000 * T * S
  // specific material density (Steel = 7.85)
  const totalSheetWeight =
    ((((values.length ? values.length : 1) / 39.37) *
      (values.width ? values.width : 1)) /
      39.37) *
    (values.thickness ? values.thickness : 1) *
    7.85 *
    (values.quantity ? values.quantity : 0)

  const sheetWeight =
    ((((values.length ? values.length : 1) / 39.37) *
      (values.width ? values.width : 1)) /
      39.37) *
    (values.thickness ? values.thickness : 1) *
    7.85 *
    (values.quantity ? 1 : 0)

  //pipe
  const totalPipeWeight =
    ((values.length ? values.length : 1) / 39.37) *
    ((values.diameter ? values.diameter : 1) / 39.37 -
      (values.thickness ? values.thickness : 1)) *
    (values.thickness ? values.thickness : 1) *
    (values.quantity ? values.quantity : 0)

  const pipeWeight =
    ((values.length ? values.length : 1) / 39.37) *
    ((values.diameter ? values.diameter : 1) / 39.37 -
      (values.thickness ? values.thickness : 1)) *
    (values.thickness ? values.thickness : 1) *
    (values.quantity ? 1 : 0)

  //tupe [ { B - ( 2 × T )} × T × 2 nos]
  const totalTupeWeight =
    ((values.width ? values.width : 1) *
      (values.thickness ? values.thickness : 1) *
      2 +
      ((values.width ? values.width : 1) -
        (values.thickness ? values.thickness : 1) * 2) *
        (values.thickness ? values.thickness : 1) *
        2) *
    (values.length ? values.length : 1) *
    (values.quantity ? values.quantity : 0)

  const tupeWeight =
    ((values.width ? values.width : 1) *
      (values.thickness ? values.thickness : 1) *
      2 +
      ((values.width ? values.width : 1) -
        (values.thickness ? values.thickness : 1) * 2) *
        (values.thickness ? values.thickness : 1) *
        2) *
    (values.length ? values.length : 1) *
    (values.quantity ? 1 : 0)

  const handeleWeight = () => {
    if (type === "sheet") {
      return sheetWeight
    }
    if (type === "pipe") {
      return pipeWeight
    }
    if (type === "tube") {
      return tupeWeight
    }
  }

  const handeleTotelWeight = () => {
    if (type === "sheet") {
      return totalSheetWeight
    }
    if (type === "pipe") {
      return totalPipeWeight
    }
    if (type === "tube") {
      return totalTupeWeight
    }
  }

  return (
    <>
      <form className="form-horizontal mt-1">
        <Row className="col-12 p-0 m-0">
          {map(fields, (field, key) => (
            <Col lg={6} md={3} key={key}>
              <div className="mb-3">
                <label htmlFor={field}>
                  {field?.field} &nbsp; ({field?.unit})
                  {/* {field?.charAt(0).toUpperCase() + field?.slice(1)} */}
                </label>
                <input
                  name={field?.field}
                  id={field}
                  className="form-control"
                  type="number"
                  required
                  onChange={e => handleCalculate(e)}
                />
              </div>
            </Col>
          ))}

          <Col lg={12} className="p-0 text-end">
            <h6 className="mt-1 p-2">
              Single piece weight:{" "}
              <Badge className="p-2 mx-2 font-size-14 badge-soft-success">
                {handeleWeight()?.toFixed(2)} kg
              </Badge>
            </h6>
            <h6 className="mt-1 p-2">
              Total weight:{" "}
              <Badge className="p-2 mx-2 font-size-14 badge-soft-success">
                {handeleTotelWeight()?.toFixed(2)} kg
              </Badge>
            </h6>
          </Col>
        </Row>
      </form>
    </>
  )
}

export default CalcForm

CalcForm.propTypes = {
  fields: PropTypes.array,
  type: PropTypes.string,
  unit: PropTypes.string,
}
