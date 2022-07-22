import React from "react"

import loading from "../../assets/imgs/theme/loading.gif"

const Preloader = () => {
  return (
    <>
      <div id="preloader-active">
        <div className="preloader d-flex align-items-center justify-content-center">
          <div className="preloader-inner position-relative">
            <div className="text-center">
              <img src={loading} alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Preloader
