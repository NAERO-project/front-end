import { Outlet } from "react-router-dom";
import AdminPageSideNav from "../components/common/admin/AdminPageSideNav";
import styles from "./AdminPageLayout.module.css";

function AdminPageLayout() {
    return (
        <div className={styles.adminGridLayout}>
            <AdminPageSideNav className={styles.adminSideNav}/>
            <main className={styles.adminMain}>
                <Outlet />
            </main>
        </div>
    )
}

export default AdminPageLayout;