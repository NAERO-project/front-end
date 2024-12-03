import { NavLink, useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { decodeJwt } from "../../../utils/tokenUtils";
import styles from "../../common/admin/css/AdminPageSideNav.module.css";
import ProductSideNavContainerCSS from "./css/ProducerPageNav.module.css";

function SellerPageNavBar() {
	const location = useLocation();
	const token = decodeJwt(window.localStorage.getItem("accessToken"));

	if (token === undefined || token === null || token.exp * 1000 < Date.now()) {
		alert("로그인 후 이용해주세요");
		return <Navigate to='/' />;
	}

	return (
		<div className={ProductSideNavContainerCSS.adminSideNavContainer}>
			<ul className={ProductSideNavContainerCSS.navList}>
				<li
					className={`${ProductSideNavContainerCSS.navItem} ${
						location.pathname === "/producer/product-manage"
							? ProductSideNavContainerCSS.active
							: ""
					}`}
				>
					<NavLink
						to='/producer/product-manage'
						className={ProductSideNavContainerCSS.navLink}
					>
						상품관리
					</NavLink>
				</li>
				<li
					className={`${ProductSideNavContainerCSS.navItem} ${
						location.pathname === "/producer/detail"
							? ProductSideNavContainerCSS.active
							: ""
					}`}
				>
					<NavLink to='/producer/detail' className={ProductSideNavContainerCSS.navLink}>
						브랜드 정보
					</NavLink>
				</li>
				<li
					className={`${ProductSideNavContainerCSS.navItem} ${
						location.pathname === "/producer/update"
							? ProductSideNavContainerCSS.active
							: ""
					}`}
				>
					<NavLink to='/producer/update' className={ProductSideNavContainerCSS.navLink}>
						브랜드 정보 수정
					</NavLink>
				</li>

				<li
					className={`${ProductSideNavContainerCSS.navItem} ${
						location.pathname === "/producer/order-manage"
							? ProductSideNavContainerCSS.active
							: ""
					}`}
				>
					<NavLink
						to='/producer/order-manage'
						className={ProductSideNavContainerCSS.navLink}
					>
						주문관리
					</NavLink>
				</li>
				{/* <li className={`${ProductSideNavContainerCSS.navItem} ${
              location.pathname === "/producer/coupon-manage" ? ProductSideNavContainerCSS.active : ""
            }`}>
                    <NavLink to="/producer/coupon-manage" className={ProductSideNavContainerCSS.navLink}>쿠폰관리</NavLink>
                </li> */}
				<li
					className={`${ProductSideNavContainerCSS.navItem} ${
						location.pathname === "/producer/banner-manage"
							? ProductSideNavContainerCSS.active
							: ""
					}`}
				>
					<NavLink
						to='/producer/banner-manage'
						className={ProductSideNavContainerCSS.navLink}
					>
						배너관리
					</NavLink>
				</li>
				<li
					className={`${ProductSideNavContainerCSS.navItem} ${
						location.pathname === "/producer/review"
							? ProductSideNavContainerCSS.active
							: ""
					}`}
				></li>
			</ul>
		</div>
	);
}

export default SellerPageNavBar;
