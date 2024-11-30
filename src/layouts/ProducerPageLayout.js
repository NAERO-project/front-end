import { Outlet, useNavigate } from "react-router-dom";
import ProducerPageNav from "../components/common/producer/ProducerPageNav";
import styles from "./css/AdminPageLayout.module.css";

function ProducerPageLayout() {
    return (
        <div className={styles.adminGridLayout}>
            <ProducerPageNav className={styles.adminSideNav} />
            <main className={styles.adminMain}>
                <Outlet />
            </main>
        </div>
    );
}

export default ProducerPageLayout;
