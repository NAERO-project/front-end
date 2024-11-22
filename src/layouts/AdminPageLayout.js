import { Outlet } from "react-router-dom";
import AdminPageSideNav from "../components/common/admin/AdminPageSideNav";

function AdminPageLayout() {
    return (
        <>
            <AdminPageSideNav />
            <main className="admin-main">
                <Outlet />
            </main>
        </>
    )
}

export default AdminPageLayout;