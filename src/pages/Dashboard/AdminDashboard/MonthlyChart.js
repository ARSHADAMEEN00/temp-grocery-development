import React, { useEffect, useState } from "react"
import { Row, Col, Card, CardBody, Spinner } from "reactstrap"
import ReactApexChart from "react-apexcharts"
import { useSelector, useDispatch } from "react-redux"
import moment from "moment"
import DatePicker from "react-datepicker"

//actions
import { getMonthlyChart } from "../../../store/actions"

import "react-datepicker/dist/react-datepicker.css"

function MonthlyChart(props) {
  const dispatch = useDispatch()

  const { loading, productChart } = useSelector(state => ({
    productChart: state.Dashboard.monthlyData.products,
    loading: state.Dashboard.loading,
  }))

  const [ChartDate, setChartDate] = useState(Date.now())

  const options = {
    chart: {
      toolbar: "false",
      dropShadow: {
        enabled: !0,
        color: "#000",
        top: 18,
        left: 7,
        blur: 8,
        opacity: 0.2,
      },
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    dataLabels: {
      enabled: !1,
    },
    colors: ["#50a5f1", "#E91E63"],
    stroke: {
      curve: "smooth",
      width: 3,
    },
  }

  const series = [
    {
      name: "Sold Product",
      data: productChart,
    },
  ]

  useEffect(() => {
    dispatch(getMonthlyChart(moment(ChartDate).format("YYYY")))
  }, [dispatch, ChartDate])

  const totalProduct = productChart?.reduce((a, b) => a + b)

  return (
    <React.Fragment>
      <Col xl="12">
        <Card>
          <CardBody>
            <div className="clearfix">
              <div className="float-end ">
                <div className="input-group input-group-sm ">
                  <DatePicker
                    selected={ChartDate}
                    onChange={date => setChartDate(date)}
                    dateFormat="yyyy"
                    showYearPicker
                    className="form-control"
                  />
                </div>
              </div>
              {totalProduct > 0 ? (
                <>
                  <>
                    <h4 className="card-title mb-0 d-inline-block pt-4">
                      Monthly Analytics{" "}
                    </h4>
                    <p className="text-gray mt-4 mb-1">
                      <i className="mdi mdi-circle align-middle font-size-10 me-2 text-warning"></i>
                      Total Sold Product In this Year (
                      {moment(ChartDate).format("YYYY")})
                    </p>
                    <h5 className="text-info mx-2">{totalProduct}</h5>
                  </>
                </>
              ) : (
                <h4 className="card-title mb-0 d-inline-block pt-4">
                  {" "}
                  Analytics{" "}
                </h4>
              )}
            </div>
            {loading ? (
              <>
                <Spinner type="grow" color="info" />
              </>
            ) : (
              <>
                {totalProduct > 0 ? (
                  <Row style={{ paddingBottom: "1rem" }}>
                    <Col lg="12">
                      <div id="line-chart" dir="ltr">
                        <ReactApexChart
                          series={series}
                          options={options}
                          type="line"
                          height={320}
                          className="apex-charts"
                        />
                      </div>
                    </Col>
                  </Row>
                ) : (
                  <p className="text-info mt-3">No Product Analytics yet!</p>
                )}
              </>
            )}
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  )
}

export default MonthlyChart
