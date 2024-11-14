import { Outlet } from "react-router-dom";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";
import Navbar from "../components/common/Navbar";

function Layout() {
	return (
		<>
			<Header />
			<Navbar />
			<main>
				<Outlet />
			</main>
			<Footer />
		</>
	);
}

export default Layout;
