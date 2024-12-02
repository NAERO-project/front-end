import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLikedStatistics } from "../../../apis/DashboardApiCall";
import MyResponsiveBar from "./MyResponsiveBar";
import MyResponsiveLine from "./MyResponsiveLine";
import styles from "./css/LikedStatistics.module.css";

function LikedStatistics() {
  const dispatch = useDispatch();
  const listRef = useRef(null); // Ref for the filtered list

  // Fetch productList and brandList from Redux store
  const productList = useSelector((state) => state.dashboard.productList);
  // console.log("productList:", productList);
  const brandList = useSelector((state) => state.dashboard.brandList);
  // console.log("brandList:", brandList);

  // Fetch likedStatistics from Redux store
  const { data } = useSelector((state) => state.dashboard.likedStatistics);

  const initialInputsLiked = {
    categoryOption: "상품",
    startDate: "",
    endDate: "",
    specification: "",
  };

  const [formInputsLiked, setFormInputsLiked] = useState(initialInputsLiked);
  const [filteredOptionsLiked, setFilteredOptionsLiked] = useState([]);
  const [isTypingLiked, setIsTypingLiked] = useState(false); // Track if the user is typing
  const [highlightedIndex, setHighlightedIndex] = useState(-1); // Track the highlighted index
  const [submittedSpecificationLiked, setSubmittedSpecificationLiked] =
    useState("");

  // Fetch data on initial render and when formInputsLiked changes
  useEffect(() => {
    dispatch(fetchLikedStatistics(formInputsLiked));
    setSubmittedSpecificationLiked(formInputsLiked.specification || "");
  }, [dispatch, formInputsLiked]);

  useEffect(() => {
    if (listRef.current && highlightedIndex >= 0) {
      const listItem = listRef.current.children[highlightedIndex];
      if (listItem) {
        listItem.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }
  }, [highlightedIndex]);

  // Handle input changes and dynamic filtering
  const handleInputChange = (key, value) => {
    setFormInputsLiked((prevInputs) => ({
      ...prevInputs,
      [key]: value,
    }));

    if (key === "specification") {
      setIsTypingLiked(true);

      if (value.trim() !== "") {
        const options =
          formInputsLiked.categoryOption === "상품"
            ? productList.data.data.map((item) => item.productName)
            : brandList.data.data.map((item) => item.producerName);

        const filtered = options.filter((option) =>
          option.normalize("NFC").includes(value.trim().normalize("NFC"))
        );

        setFilteredOptionsLiked(filtered);
        setHighlightedIndex(-1); // Reset highlighted index
      } else {
        setIsTypingLiked(false);
        setFilteredOptionsLiked([]);
        setFormInputsLiked((prevInputs) => ({
          ...prevInputs,
          specification: "",
        }));
      }
    }
  };

  // Handle option selection from filtered list
  const handleOptionSelect = (option) => {
    setFormInputsLiked((prevInputs) => ({
      ...prevInputs,
      specification: option,
    }));
    setIsTypingLiked(false); // User is not typing
    setFilteredOptionsLiked([]); // Clear dropdown after selection
    setSubmittedSpecificationLiked(option); // Update submitted specification
  };

  const handleKeyDown = (e) => {
    if (filteredOptionsLiked.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prevIndex) =>
        prevIndex < filteredOptionsLiked.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex
      );
    } else if (e.key === "Enter" && highlightedIndex >= 0) {
      e.preventDefault();
      handleOptionSelect(filteredOptionsLiked[highlightedIndex]);
    }
  };

  // Determin chart type based on the value of the specification
  const isSpecificationEmptyLiked =
    !submittedSpecificationLiked || submittedSpecificationLiked.trim() === "";

  // Add console logs to debug
  // console.log("LikedStatistics Data received:", data);
  // console.log(
  //   "LikedStatistics isSpecificationEmpty:",
  //   isSpecificationEmptyLiked
  // );
  // console.log("LikedStatistics formInputsLiked:", formInputsLiked);

  // Add this check before rendering
  // const shouldShowLineChart = !isSpecificationEmpty && data && data.length > 0;
  // console.log("Should show line chart:", shouldShowLineChart);

  return (
    <div className={styles["liked-statistics-container"]}>
      <h4 className={styles["liked-statistics-title"]}>선호도 통계</h4>
      <form className={styles["liked-statistics-form"]}>
        <div>
          <select
            value={formInputsLiked.categoryOption || ""}
            onChange={(e) =>
              handleInputChange("categoryOption", e.target.value)
            }
          >
            <option value="상품">상품</option>
            <option value="브랜드">브랜드</option>
          </select>
        </div>
        <div>
          <input
            id="startDate"
            type="date"
            value={formInputsLiked.startDate || ""}
            onChange={(e) => handleInputChange("startDate", e.target.value)}
          />
        </div>
        <span>~</span>
        <div>
          <input
            id="endDate"
            type="date"
            value={formInputsLiked.endDate || ""}
            onChange={(e) => handleInputChange("endDate", e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="개별 입력 조회"
            value={formInputsLiked.specification || ""}
            onChange={(e) => handleInputChange("specification", e.target.value)}
            onKeyDown={handleKeyDown} // Attach the keydown event listener
          />
          {filteredOptionsLiked.length > 0 && (
            <ul className={styles["filtered-list"]} ref={listRef}>
              {filteredOptionsLiked.map((option, index) => (
                <li
                  key={index}
                  onClick={() => handleOptionSelect(option)}
                  className={`${styles["filtered-list-item"]} ${
                    highlightedIndex === index ? styles["highlighted"] : ""
                  }`}
                >
                  {option}
                </li>
              ))}
            </ul>
          )}
        </div>
      </form>

      {/* Render chart based on the form data */}
      {isTypingLiked || filteredOptionsLiked.length > 0 ? null : data &&
        data.data &&
        data.data.length > 0 ? (
        <div className={styles["chart-container"]}>
          {isSpecificationEmptyLiked ? (
            <MyResponsiveBar data={data.data} />
          ) : (
            <MyResponsiveLine data={data.data} />
          )}
        </div>
      ) : (
        !isTypingLiked && (
          <p>
            조회 결과가 없습니다. 조회 조건을 확인해주시고 다시 시도해주세요.
          </p>
        )
      )}
    </div>
  );
}

export default LikedStatistics;
