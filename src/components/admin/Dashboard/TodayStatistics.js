import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchTodaySales,
  fetchTodayQuantity,
  fetchTodayItems,
  fetchTodayMembers,
} from "../../../apis/DashboardApiCall";
import styles from "./css/TodayStatistics.module.css";
import { FaArrowUp, FaArrowDown } from "react-icons/fa"; // Icons for upward and downward arrows
import { TbReportMoney } from "react-icons/tb";
import { BiPurchaseTag } from "react-icons/bi";
import { AiOutlineProduct } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";

function TodayStatistics() {
  const dispatch = useDispatch();

  const todaySales = useSelector((state) => state.dashboard.todaySales?.data);
  const todayQuantity = useSelector(
    (state) => state.dashboard.todayQuantity?.data
  );
  const todayItems = useSelector((state) => state.dashboard.todayItems?.data);
  const todayMembers = useSelector(
    (state) => state.dashboard.todayMembers?.data
  );

  useEffect(() => {
    dispatch(fetchTodaySales());
    dispatch(fetchTodayQuantity());
    dispatch(fetchTodayItems());
    dispatch(fetchTodayMembers());
  }, [dispatch]);

  return (
    <>
      <h4 className={styles.title}>오늘의 통계 </h4>
      <div className={styles["today-statistics-container"]}>
        <div className={styles["today-sales"]}>
          <div className={styles["stat-icon-container"]}>
            <h1>
              {todaySales?.data?.Level !== undefined
                ? `${new Intl.NumberFormat("ko-KR", {
                    style: "currency",
                    currency: "KRW",
                  }).format(todaySales.data.Level)}`
                : "Loading..."}
            </h1>
            <TbReportMoney className={styles["stat-icon"]} />
          </div>
          <p>매출 총액</p>
          <p>
            24시간 전보다{" "}
            {todaySales?.data?.Ratio !== undefined ? (
              <span>
                {todaySales.data.Ratio > 0 ? (
                  <FaArrowUp style={{ color: "green", marginRight: "4px" }} /> // Upward arrow for positive ratio
                ) : todaySales.data.Ratio < 0 ? (
                  <FaArrowDown style={{ color: "red", marginRight: "4px" }} /> // Downward arrow for negative ratio
                ) : null}
                {`${Math.abs(todaySales.data.Ratio * 100).toFixed(2)}%`}{" "}
              </span>
            ) : (
              "Loading..."
            )}
          </p>
        </div>
        <div className={styles["today-quantity"]}>
          <div className={styles["stat-icon-container"]}>
            <h1>
              {todayQuantity?.data?.Level !== undefined
                ? `${new Intl.NumberFormat("ko-KR").format(
                    todayQuantity.data.Level
                  )}` // Format in #,000 format
                : "Loading..."}
            </h1>
            <BiPurchaseTag className={styles["stat-icon"]} />
          </div>

          <p>주문 수량</p>
          <p>
            24시간 전보다{" "}
            {todayQuantity?.data?.Ratio !== undefined ? (
              <span>
                {todayQuantity.data.Ratio > 0 ? (
                  <FaArrowUp style={{ color: "green", marginRight: "4px" }} /> // Upward arrow for positive ratio
                ) : todayQuantity.data.Ratio < 0 ? (
                  <FaArrowDown style={{ color: "red", marginRight: "4px" }} /> // Downward arrow for negative ratio
                ) : null}
                {`${Math.abs(todayQuantity.data.Ratio * 100).toFixed(2)}%`}{" "}
              </span>
            ) : (
              "Loading..."
            )}
          </p>
        </div>
        <div className={styles["today-items"]}>
          <div className={styles["stat-icon-container"]}>
            <h1>
              {todayItems?.data?.Level !== undefined
                ? `${new Intl.NumberFormat("ko-KR").format(
                    todayItems.data.Level
                  )}` // Format in #,000 format
                : "Loading..."}
            </h1>
            <AiOutlineProduct className={styles["stat-icon"]} />
          </div>
          <p>판매 상품</p>
          <p>
            24시간 전보다{" "}
            {todayItems?.data?.Ratio !== undefined ? (
              <span>
                {todayItems.data.Ratio > 0 ? (
                  <FaArrowUp style={{ color: "green", marginRight: "4px" }} />
                ) : todayItems.data.Ratio < 0 ? (
                  <FaArrowDown style={{ color: "red", marginRight: "4px" }} />
                ) : null}
                {`${Math.abs(todayItems.data.Ratio * 100).toFixed(2)}%`}{" "}
              </span>
            ) : (
              "Loading..."
            )}
          </p>
        </div>
        <div className={styles["today-members"]}>
          <div className={styles["stat-icon-container"]}>
            <h1>
              {todayMembers?.data?.Level !== undefined
                ? `${new Intl.NumberFormat("ko-KR").format(
                    todayMembers.data.Level
                  )}` // Format in #,000 format
                : "Loading..."}
            </h1>
            <FaRegUser className={styles["stat-icon"]} />
          </div>
          <p>신규 회원</p>
          <p>
            24시간 전보다{" "}
            {todayMembers?.data?.Ratio !== undefined ? (
              <span>
                {todayMembers.data.Ratio > 0 ? (
                  <FaArrowUp style={{ color: "green", marginRight: "4px" }} />
                ) : todayMembers.data.Ratio < 0 ? (
                  <FaArrowDown style={{ color: "red", marginRight: "4px" }} />
                ) : null}
                {`${Math.abs(todayMembers.data.Ratio * 100).toFixed(2)}%`}{" "}
              </span>
            ) : (
              "Loading..."
            )}
          </p>
        </div>
      </div>
    </>
  );
}

export default TodayStatistics;
