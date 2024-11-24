import { Outlet } from "react-router-dom";
import MypageNav from "../components/common/MypageNav";

function MypageLayout(props) {
	return (
		<>
			<div className="">
				<MypageNav />
				<main className="">
					<Outlet />
				</main>
			</div>
		</>
	);
}

export default MypageLayout;
