import { Outlet } from "react-router-dom";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";
import MypageNav from "../components/common/MypageNav";
import MypageCSS from "./css/MypageLayout.module.css";

function MypageLayout(props) {
	return (
		<div className={MypageCSS.mypage_grid_layout}>
			<Header />
			<MypageNav className={MypageCSS.side_nav_bar} />
			<main className={MypageCSS.mypage_main}>
				<Outlet />
			</main>
			<Footer />
		</div>
	);
}

export default MypageLayout;
