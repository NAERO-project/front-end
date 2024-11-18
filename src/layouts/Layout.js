import { Outlet } from "react-router-dom";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";

function Layout() {
	return (
		<>
			<Header />
			<main>
				<Outlet />
			</main>
			<Footer />
		</>
	);
}

export default Layout;