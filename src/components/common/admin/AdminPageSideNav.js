import { NavLink } from 'react-router-dom';
import styles from "./css/AdminPageSideNav.module.css"; 

const navItems = [
    { to: '/admin/dashboard', label: '모니터링' },
    { to: '/admin/user-manage', label: '회원관리' },
    { to: '/admin/producer-manage', label: '셀러관리' },
    { to: '/admin/promotion-manage', label: '홍보관리' },
    { to: '/admin/inquiry-manage', label: '1:1 문의' },
    { to: '/admin/FAQ-manage', label: 'FAQ 관리' },
];

function AdminPageSideNav() {
    return (
        <div className={styles.adminSideNavContainer}>
            <ul>
                {navItems.map((item, index) => (
                    <li key={index} className={styles.navItem}>
                        <NavLink to={item.to} className={styles.navLink} activeClassName="active-link">{item.label}</NavLink>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default AdminPageSideNav;
