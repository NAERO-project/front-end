import { NavLink, useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { decodeJwt } from "../../../utils/tokenUtils";
import styles from "../../common/admin/css/AdminPageSideNav.module.css";

function SellerPageNavBar() {
    const location = useLocation();
    const token = decodeJwt(window.localStorage.getItem("accessToken"));

    if (
        token === undefined ||
        token === null
        || token.exp * 1000 < Date.now()
    ) {
        alert("로그인 후 이용해주세요");
        return <Navigate to="/" />;
    }

    return (
        <div className={styles.adminSideNavContainer}>
            <ul className={styles.navList}>
                <li className={`${styles.navItem} ${
              location.pathname === "/producer/product-manage" ? styles.active : ""
            }`}>
                    <NavLink to="/producer/product-manage" className={styles.navLink}>상품관리</NavLink>
                </li>
                <li className={`${styles.navItem} ${
              location.pathname === "/producer/order-manage" ? styles.active : ""
            }`}>
                    <NavLink to="/producer/order-manage" className={styles.navLink}>주문관리</NavLink>
                </li>
                <li className={`${styles.navItem} ${
              location.pathname === "/producer/coupon-manage" ? styles.active : ""
            }`}>
                    <NavLink to="/producer/coupon-manage" className={styles.navLink}>쿠폰관리</NavLink>
                </li>
                <li className={`${styles.navItem} ${
              location.pathname === "/producer/banner-manage" ? styles.active : ""
            }`}>
                    <NavLink to="/producer/banner-manage" className={styles.navLink}>배너관리</NavLink>
                </li>
            </ul>
        </div>
    );
}

export default SellerPageNavBar;
