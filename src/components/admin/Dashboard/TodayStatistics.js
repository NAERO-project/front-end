import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchTodaySales,
  fetchTodayQuantity,
  fetchTodayItems,
  fetchTodayMembers,
} from "../../../apis/DashboardApiCall";
import styles from "./css/TodayStatistics.module.css";

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
          <h1>
            {todaySales?.data?.Level !== undefined
              ? todaySales.data.Level
              : "Loading..."}
          </h1>
          <p>
            {todaySales?.data?.Ratio !== undefined
              ? todaySales.data.Ratio
              : "Loading..."}
          </p>
        </div>
        <div className={styles["today-quantity"]}>
          <h1>
            {todayQuantity?.data?.Level !== undefined
              ? todayQuantity.data.Level
              : "Loading..."}
          </h1>
          <p>
            {todayQuantity?.data?.Ratio !== undefined
              ? todayQuantity.data.Ratio
              : "Loading..."}
          </p>
        </div>
        <div className={styles["today-items"]}>
          <h1>
            {todayItems?.data?.Level !== undefined
              ? todayItems.data.Level
              : "Loading..."}
          </h1>
          <p>
            {todayItems?.data?.Ratio !== undefined
              ? todayItems.data.Ratio
              : "Loading..."}
          </p>
        </div>
        <div className={styles["today-members"]}>
          <h1>
            {todayMembers?.data?.Level !== undefined
              ? todayMembers.data.Level
              : "Loading..."}
          </h1>
          <p>
            {todayMembers?.data?.Ratio !== undefined
              ? todayMembers.data.Ratio
              : "Loading..."}
          </p>
        </div>
      </div>
    </>
  );
}

export default TodayStatistics;
