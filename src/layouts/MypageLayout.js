import { Outlet } from "react-router-dom";
import MypageNav from "../components/common/MypageNav";
import MypageCSS from "./css/MypageLayout.module.css";

function MypageLayout(props) {
	return (
		<>
			<Header />
			<div className="">
				<MypageNav />
				<main className="">
					<Outlet />
				</main>
			</div>
			<Footer />
		</>
	);
}

export default MypageLayout;
