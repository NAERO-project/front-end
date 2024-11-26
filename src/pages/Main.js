import GlobalCSS from "../components/common/Global.module.css";
import MainList from "./products/MainList";

function Main(props) {
	return <div className={GlobalCSS}>
		<MainList/>
	</div>;
}

export default Main;