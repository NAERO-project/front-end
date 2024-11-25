import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSalesStatistics,
  updateInputs,
} from "../../../apis/DashboardApiCall";
import MyResponsiveBar from "./MyResponsiveBar";
import MyResponsiveLine from "./MyResponsiveLine";
import styles from "./css/SalesStatistics.module.css";

function SalesStatistics() {
  const dispatch = useDispatch();
  const { inputs = {}, data } = useSelector(
    (state) => state.dashboard.salesStatistics
  );
  const [formInputsSales, setFormInputsSales] = useState(inputs);
  const [submittedSpecificationSales, setSubmittedSpecificationSales] =
    useState("");

  // Fetch data on initial load
  useEffect(() => {
    dispatch(fetchSalesStatistics(formInputsSales));
    setSubmittedSpecificationSales(formInputsSales.specification || "");
  }, []);

  // Update Local form state when an input changes
  const handleInputChange = (key, value) => {
    setFormInputsSales((prevInputs) => ({
      ...prevInputs,
      [key]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    // Prevent the default form submission behavior
    e.preventDefault();
    dispatch(updateInputs("salesStatistics", formInputsSales));
    dispatch(fetchSalesStatistics(formInputsSales)); // Dispatch action to fetch data
    setSubmittedSpecificationSales(formInputsSales.specification || "");
  };

  // Determin chart type based on the value of the specification
  const isSpecificationEmpty =
    !submittedSpecificationSales || submittedSpecificationSales.trim() === "";

  // Add console logs to debug
  // console.log("Data received:", data);
  // console.log("isSpecificationEmpty:", isSpecificationEmpty);
  // console.log("formInputs:", formInputs);

  // Add this check before rendering
  // const shouldShowLineChart = !isSpecificationEmpty && data && data.length > 0;
  // console.log("Should show line chart:", shouldShowLineChart);

  return (
    <>
      <h4>매출 통계</h4>
      <form className={styles["sales-statistics-form"]} onSubmit={handleSubmit}>
        <div>
          <select
            value={formInputsSales.categoryOption || ""}
            onChange={(e) =>
              handleInputChange("categoryOption", e.target.value)
            }
          >
            <option value="" disabled>
              카테고리 옵션
            </option>{" "}
            {/* Placeholder option */}
            <option value="브랜드">브랜드</option>
            <option value="상품">상품</option>
          </select>
        </div>
        <div>
          <select
            value={formInputsSales.indexOption || ""}
            onChange={(e) => handleInputChange("indexOption", e.target.value)}
          >
            <option value="" disabled>
              인텍스 옵션
            </option>{" "}
            {/* Placeholder option */}
            <option value="매출액">매출액</option>
            <option value="판매량">판매량</option>
          </select>
        </div>
        <div>
          <input
            id="startDate"
            type="date"
            value={formInputsSales.startDate || ""}
            onChange={(e) => handleInputChange("startDate", e.target.value)}
          />
        </div>
        <span>~</span>
        <div>
          <input
            id="endDate"
            type="date"
            value={formInputsSales.endDate || ""}
            onChange={(e) => handleInputChange("endDate", e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="개별 입력 조회"
            value={formInputsSales.specification || ""}
            onChange={(e) => handleInputChange("specification", e.target.value)}
          />
        </div>
        <button type="submit">조회</button>
      </form>

      {/* Render chart based on the form data */}
      {data && data.data && data.data.length > 0 ? (
        <div style={{ height: 400 }}>
          {isSpecificationEmpty ? (
            <MyResponsiveBar data={data.data} />
          ) : (
            <MyResponsiveLine data={data.data} />
          )}
        </div>
      ) : (
        <p>No data available yet. Please search to fetch data</p>
      )}
    </>
  );
}

export default SalesStatistics;
