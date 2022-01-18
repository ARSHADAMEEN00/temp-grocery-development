import React from "react"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Col } from "reactstrap"
import login_img from "../../assets/images/home_header.png"

const LoginDetails = () => {
  return (
    <React.Fragment>
      <Col xl={8} className="bg-light">
        <div className="pt-lg-5 p-4">
          <div className="w-100 ">
            <div className="d-flex h-100 flex-column">
              <div className="p-4 mt-auto">
                <div className="row justify-content-center">
                  <div className="col-lg-7">
                    <div className="text-center">

                      <div dir="ltr">
                        <div>
                          <div className="item">
                            <div className="py-3">
                              <p className="font-size-24 text-info  mb-0" style={{
                                fontWeight: "600",
                                textTransform: "capitalize"
                              }}>
                                Weaving solutions for
                                enhanced patient experience
                              </p>
                              <h4 className="mb-3">
                                <img className="img-fluid mx-auto d-block" src={login_img} alt="login_img" ></img>
                              </h4>
                              <div>
                                <h4 className="font-size-16 text-primary">
                                  indtech
                                </h4>
                                <p className="font-size-14 mb-0">
                                  Kerala
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Col>
    </React.Fragment>
  )
}
export default LoginDetails
