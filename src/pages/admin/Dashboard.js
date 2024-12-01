import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProductList, fetchBrandList } from "../../apis/DashboardApiCall";
import TodayStatistics from "../../components/admin/Dashboard/TodayStatistics";
import SalesStatistics from "../../components/admin/Dashboard/SalesStatistics";
import TopSales from "../../components/admin/Dashboard/TopSales";
import LikedStatistics from "../../components/admin/Dashboard/LikedStatistics";
import TopLiked from "../../components/admin/Dashboard/TopLiked";
import styles from "./css/Dashboard.module.css";

function Dashboard() {
  const dispatch = useDispatch();

  // Dispatch actions to fetch productList and brandList
  useEffect(() => {
    dispatch(fetchProductList());
    dispatch(fetchBrandList());
  }, [dispatch]);

  return (
    <div className={styles.dashboardContainer}>
      <div className={`${styles.section} ${styles.todayStats}`}>
        <TodayStatistics />
      </div>
      <div className={`${styles.section} ${styles.salesStats}`}>
        <SalesStatistics />
      </div>
      <div className={`${styles.section} ${styles.topSales}`}>
        <TopSales />
      </div>
      <div className={`${styles.section} ${styles.topLiked}`}>
        <TopLiked />
      </div>
      <div className={`${styles.section} ${styles.likedStats}`}>
        <LikedStatistics />
      </div>
    </div>
  );
}

export default Dashboard;
