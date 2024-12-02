import { Outlet } from "react-router-dom";
import MypageNav from "../components/common/MypageNav";
import Footer from "../components/common/Footer";

function MypageLayout(props) {
	return (
		<>
			<div className="">
				<MypageNav />
				<main style={{height: '1000px'}}>
					<Outlet />
				</main>
				<Footer/>
			</div>
		</>
	);
}

export default MypageLayout;
