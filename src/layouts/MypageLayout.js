import { Outlet } from "react-router-dom";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";
import MypageNav from "../components/common/MypageNav";

function MypageLayout(props) {
	return (
		<>
			<Header />
			<h2>마이페이지</h2>
			<MypageNav />
			<main>
				<Outlet />
			</main>
			<Footer />
		</>
	);
}

export default MypageLayout;
