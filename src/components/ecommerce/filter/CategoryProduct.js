import { useRouter } from "next/router"
import { connect } from "react-redux"
import React from "react"
// import { updateProductCategory } from "../../../redux/action/productFiltersAction";

import category3 from "../../../assets/imgs/theme/icons/category-3.svg"
import category2 from "../../../assets/imgs/theme/icons/category-2.svg"
import category1 from "../../../assets/imgs/theme/icons/category-1.svg"

const CategoryProduct = () => {
  const router = useRouter()

  const selectCategory = (e, category) => {
    e.preventDefault()
    // removeSearchTerm();
    // updateProductCategory(category);
    router.push({
      pathname: "/products",
      query: {
        cat: category, //
      },
    })
  }
  return (
    <>
      <ul>
        <li onClick={e => selectCategory(e, "")}>
          <a>All</a>
        </li>
        <li onClick={e => selectCategory(e, "jeans")}>
          <a>
            <img src={category1} alt="" />
            Milks & Dairies
          </a>
          <span className="count">30</span>
        </li>
        <li onClick={e => selectCategory(e, "shoe")}>
          <a>
            <img src={category2} alt="" />
            Clothing
          </a>
          <span className="count">35</span>
        </li>
        <li onClick={e => selectCategory(e, "jacket")}>
          <a>
            <img src={category3} alt="" />
            Pet Foods{" "}
          </a>
          <span className="count">42</span>
        </li>
      </ul>
    </>
  )
}

export default connect(null, {})(CategoryProduct)
