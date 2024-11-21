import { NavLink } from 'react-router-dom';
// import './AdminPageSideNav.module.css';

const navItems = [
    { to: '/admin/dashboard', label: '모니터링' },
    { to: '/admin/user-manage', label: '회원관리' },
    { to: '/admin/seller-manage', label: '셀러관리' },
    { to: '/admin/promotion-manage', label: '홍보관리' },
    { to: '/admin/inquiry-manage', label: '1:1 문의' },
    { to: '/admin/FAQ-manage', label: 'FAQ' },
];

function AdminPageSideNav() {
    return (
        <div>
            <ul>
                {navItems.map((item, index) => (
                    <li key={index}>
                        <NavLink to={item.to} className="nav-link" activeClassName="active-link">{item.label}</NavLink>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default AdminPageSideNav;
