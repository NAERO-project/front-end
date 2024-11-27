import { NavLink, useLocation } from "react-router-dom";
import styles from "./css/AdminPageSideNav.module.css";

const navItems = [
  { to: "/admin/dashboard", label: "모니터링" },
  { to: "/admin/user-manage", label: "회원관리" },
  { to: "/admin/seller-manage", label: "셀러관리" },
  { to: "/admin/banner-manage", label: "배너관리" },
  { to: "/admin/inquiry-manage", label: "1:1 문의" },
  { to: "/admin/FAQ-manage", label: "FAQ 관리" },
];

function AdminPageSideNav() {
  const location = useLocation();

  return (
    <div className={styles.adminSideNavContainer}>
      <ul className={styles.navList}>
        {navItems.map((item, index) => (
          <li
            key={index}
            className={`${styles.navItem} ${
              location.pathname === item.to ? styles.active : ""
            }`}
          >
            <NavLink
              to={item.to}
              className={styles.navLink}
              // activeClassName={styles.activeLink}
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminPageSideNav;
