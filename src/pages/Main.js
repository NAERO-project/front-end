import GlobalCSS from "../components/common/Global.module.css";
import MainBanner from "./banner/MainBanner";

function Main(props) {
	return <div className={GlobalCSS}>
		<MainBanner/>
	</div>;
}

export default Main;
