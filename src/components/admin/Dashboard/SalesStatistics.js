import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSalesStatistics } from "../../../apis/DashboardApiCall";
import MyResponsiveBar from "./MyResponsiveBar";
import MyResponsiveLine from "./MyResponsiveLine";
import styles from "./css/SalesStatistics.module.css";

function SalesStatistics() {
  const dispatch = useDispatch();
  const listRef = useRef(null); // Ref for the filtered list

  // Fetch productList and brandList from Redux store
  const productList = useSelector((state) => state.dashboard.productList);
  // console.log("productList:", productList);
  const brandList = useSelector((state) => state.dashboard.brandList);
  // console.log("brandList:", brandList);

  // Fetch salesStatistics from Redux store
  const { data } = useSelector((state) => state.dashboard.salesStatistics);

  const initialInputs = {
    categoryOption: "상품",
    indexOption: "매출액",
    startDate: "",
    endDate: "",
    specification: "",
  };

  const [formInputsSales, setFormInputsSales] = useState(initialInputs);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [isTyping, setIsTyping] = useState(false); // Track if the user is typing
  const [highlightedIndex, setHighlightedIndex] = useState(-1); // Track the highlighted index
  const [submittedSpecificationSales, setSubmittedSpecificationSales] =
    useState("");

  // Fetch data on initial render and when formInputsSales changes
  useEffect(() => {
    dispatch(fetchSalesStatistics(formInputsSales));
    setSubmittedSpecificationSales(formInputsSales.specification || "");
  }, [dispatch, formInputsSales]);

  useEffect(() => {
    if (listRef.current && highlightedIndex >= 0) {
      const listItem = listRef.current.children[highlightedIndex];
      if (listItem) {
        listItem.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }
  }, [highlightedIndex]);

  // Version1: Update Local form state when an input changes
  // const handleInputChange = (key, value) => {
  //   setFormInputsSales((prevInputs) => ({
  //     ...prevInputs,
  //     [key]: value,
  //   }));
  //   console.log("formInputsSales:", formInputsSales);
  // };

  // Version2: Handle input changes and dynamic filtering
  const handleInputChange = (key, value) => {
    setFormInputsSales((prevInputs) => ({
      ...prevInputs,
      [key]: value,
    }));
    // console.log("formInputsSales:", formInputsSales);

    if (key === "specification") {
      setIsTyping(true); // User is typing

      if (value.trim() !== "") {
        const options =
          formInputsSales.categoryOption === "상품"
            ? productList.data.data.map((item) => item.productName)
            : brandList.data.data.map((item) => item.producerName);

        // console.log("options:", options);

        const filtered = options.filter(
          (option) =>
            option.normalize("NFC").includes(value.trim().normalize("NFC")) // Trim to remove leading/trailing whitespace
        );

        // console.log("options:", options);

        setFilteredOptions(filtered);
        setHighlightedIndex(-1); // Reset highlighted index
      } else {
        setIsTyping(false); // User cleared the input
        setFilteredOptions([]);
        setFormInputsSales((prevInputs) => ({
          ...prevInputs,
          specification: "",
        }));
      }
    }
  };

  // Handle option selection from fitered list
  const handleOptionSelect = (option) => {
    setFormInputsSales((prevInputs) => ({
      ...prevInputs,
      specification: option,
    }));
    setIsTyping(false); // User is not typing
    setFilteredOptions([]); // Clear dropdown after selection
    setSubmittedSpecificationSales(option); // Update submitted specification
  };

  // Version1: Handle form submission
  // const handleSubmit = (e) => {
  //   // Prevent the default form submission behavior
  //   e.preventDefault();
  //   dispatch(updateInputs("salesStatistics", formInputsSales)); // Update Redux inputs
  //   dispatch(fetchSalesStatistics(formInputsSales)); // Fetch updated sales statistics
  //   setSubmittedSpecificationSales(formInputsSales.specification || "");
  // };

  const handleKeyDown = (e) => {
    if (filteredOptions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault(); // Prevent default scrolling behavior
      setHighlightedIndex((prevIndex) =>
        prevIndex < filteredOptions.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault(); // Prevent default scrolling behavior
      setHighlightedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex
      );
    } else if (e.key === "Enter" && highlightedIndex >= 0) {
      e.preventDefault(); // Prevent form submission
      handleOptionSelect(filteredOptions[highlightedIndex]);
    }
  };

  // Determin chart type based on the value of the specification
  const isSpecificationEmpty =
    !submittedSpecificationSales || submittedSpecificationSales.trim() === "";

  // Add console logs to debug
  // console.log("Data received:", data);
  // console.log("isSpecificationEmpty:", isSpecificationEmpty);
  // console.log("formInputsSales:", formInputsSales);

  // Add this check before rendering
  // const shouldShowLineChart = !isSpecificationEmpty && data && data.length > 0;
  // console.log("Should show line chart:", shouldShowLineChart);

  return (
    <div className={styles["sales-statistics-container"]}>
      <h4 className={styles["sales-statistics-title"]}>매출 통계</h4>
      {/* Version1: Handle form submission */}
      {/* <form className={styles["sales-statistics-form"]} onSubmit={handleSubmit}> */}
      <form className={styles["sales-statistics-form"]}>
        <div>
          <select
            value={formInputsSales.categoryOption || ""}
            onChange={(e) =>
              handleInputChange("categoryOption", e.target.value)
            }
          >
            {/* <option value="" disabled>
              카테고리 옵션
            </option>{" "} */}
            {/* Placeholder option */}
            <option value="상품">상품</option>
            <option value="브랜드">브랜드</option>
          </select>
        </div>
        <div>
          <select
            value={formInputsSales.indexOption || ""}
            onChange={(e) => handleInputChange("indexOption", e.target.value)}
          >
            {/* <option value="" disabled>
              인텍스 옵션
            </option>{" "} */}
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
            onKeyDown={handleKeyDown} // Attach the keydown event listener
          />
          {filteredOptions.length > 0 && (
            <ul className={styles["filtered-list"]} ref={listRef}>
              {filteredOptions.map((option, index) => (
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
        {/* <button type="submit">조회</button> */}
      </form>

      {/* Render chart based on the form data */}
      {isTyping || filteredOptions.length > 0 ? null : data &&
        data.data &&
        data.data.length > 0 ? (
        <div className={styles["chart-container"]}>
          {isSpecificationEmpty ? (
            <MyResponsiveBar data={data.data} />
          ) : (
            <MyResponsiveLine data={data.data} />
          )}
        </div>
      ) : (
        !isTyping && (
          <p>
            조회 결과가 없습니다. 조회 조건을 확인해주시고 다시 시도해주세요.
          </p>
        )
      )}
    </div>
  );
}

export default SalesStatistics;
