import GlobalCSS from "../components/common/Global.module.css";
import MainBanner from "./banner/MainBanner";
import MainList from "./products/MainList";

function Main(props) {
	return <div className={GlobalCSS}>
		<MainList/>
		<MainBanner/>
		</div>
}

export default Main;
