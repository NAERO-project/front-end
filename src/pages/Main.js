import MainProductNav from "../components/products/MainProductNav";
import MainList from "./products/MainList";
import GlobalCSS from "../components/common/Global.module.css";


function Main(props) {
	return (
		<div className={GlobalCSS}>
			<MainProductNav />
			<MainList/>
		</div>
	);
}

export default Main;
