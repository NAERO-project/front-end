import MainBanner from "./banner/MainBanner";
import MainList from "./products/MainList";

import GlobalCSS from "../components/common/Global.module.css";

function Main(props) {
	return <div>
			<MainBanner/>
			<div className={GlobalCSS}>
				<MainList/>
			</div>
		</div>
}

export default Main;
