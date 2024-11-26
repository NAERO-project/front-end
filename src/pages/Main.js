import MainBanner from "./banner/MainBanner";
import MainList from "./products/MainList";

import GlobalCSS from "../components/common/Global.module.css";
import MainProducer from "./products/MainProducer";

function Main(props) {
	return (
		<div>
			<MainBanner />
			<div className={GlobalCSS}>
				<MainList />
			</div>
			<div>
				<MainProducer />
			</div>
		</div>
	);
}

export default Main;
