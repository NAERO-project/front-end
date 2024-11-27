import MainBanner from "./banner/MainBanner";

import GlobalCSS from "../components/common/Global.module.css";
import MainProducer from "./products/MainProducer";
import MainListPreview from "./products/MainListPreview";
import MainList from "./products/MainList";

function Main(props) {
	return <div>
			<MainBanner/>
			<div className={GlobalCSS}>
				<MainListPreview/>
			</div>
			<div>
				<MainProducer/>
			</div>
		</div>
}

export default Main;
