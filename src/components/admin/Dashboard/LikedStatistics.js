import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLikedStatistics,
  updateInputs,
} from "../../../apis/DashboardApiCall";
import MyResponsiveBar from "./MyResponsiveBar";
import MyResponsiveLine from "./MyResponsiveLine";
import styles from "./css/LikedStatistics.module.css";

function LikedStatistics() {
  const dispatch = useDispatch();
  const { inputs = {}, data } = useSelector(
    (state) => state.dashboard.likedStatistics
  );
  const [formInputsLiked, setFormInputsLiked] = useState(inputs);
  const [submittedSpecificationLiked, setSubmittedSpecificationLiked] =
    useState("");

  // Fetch data on initial load
  useEffect(() => {
    dispatch(fetchLikedStatistics(formInputsLiked));
    setSubmittedSpecificationLiked(formInputsLiked.specification || "");
  }, []);

  // Update Local form state when an input changes
  const handleInputChangeLiked = (key, value) => {
    setFormInputsLiked((prevInputs) => ({
      ...prevInputs,
      [key]: value,
    }));
  };

  // Handle form submission
  const handleSubmitLiked = (e) => {
    // Prevent the default form submission behavior
    e.preventDefault();
    dispatch(updateInputs("likedStatistics", formInputsLiked));
    dispatch(fetchLikedStatistics(formInputsLiked)); // Dispatch action to fetch data
    setSubmittedSpecificationLiked(formInputsLiked.specification || "");
  };

  // Determin chart type based on the value of the specification
  const isSpecificationEmptyLiked =
    !submittedSpecificationLiked || submittedSpecificationLiked.trim() === "";

  // Add console logs to debug
  console.log("LikedStatistics Data received:", data);
  console.log(
    "LikedStatistics isSpecificationEmpty:",
    isSpecificationEmptyLiked
  );
  console.log("LikedStatistics formInputsLiked:", formInputsLiked);

  // Add this check before rendering
  // const shouldShowLineChart = !isSpecificationEmpty && data && data.length > 0;
  // console.log("Should show line chart:", shouldShowLineChart);

  return (
    <>
      <h4>선호도 통계</h4>
      <form
        className={styles["liked-statistics-form"]}
        onSubmit={handleSubmitLiked}
      >
        <div>
          <select
            value={formInputsLiked.categoryOption || ""}
            onChange={(e) =>
              handleInputChangeLiked("categoryOption", e.target.value)
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
          <input
            type="date"
            placeholder="시작 일자" // Placeholder for date input
            value={formInputsLiked.startDate || ""}
            onChange={(e) =>
              handleInputChangeLiked("startDate", e.target.value)
            }
          />
        </div>
        <div>
          <input
            type="date"
            placeholder="종료 일자" // Placeholder for date input
            value={formInputsLiked.endDate || ""}
            onChange={(e) => handleInputChangeLiked("endDate", e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="개별 조회"
            value={formInputsLiked.specification || ""}
            onChange={(e) =>
              handleInputChangeLiked("specification", e.target.value)
            }
          />
        </div>
        <button type="submit">조회</button>
      </form>

      {/* Render chart based on the form data */}
      {data && data.data && data.data.length > 0 ? (
        <div style={{ height: 400 }}>
          {isSpecificationEmptyLiked ? (
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

export default LikedStatistics;
