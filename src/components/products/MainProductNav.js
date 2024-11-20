import { NavLink } from "react-router-dom";
import ProductNavCSS from "./MainProductNav.module.css";

function MainProductNav(){

    return(
        <div className={ProductNavCSS.ProductNavBox}>
            <ul className={ProductNavCSS.ProductNav}>
                <li className={ProductNavCSS.ProductAll}>
                    <h3><NavLink to="/products/preview">전체</NavLink></h3>
                </li>
                <li className={ProductNavCSS.ProductFood}> 
                    <h3><NavLink to="/products/preview/food">식품&음료</NavLink></h3>
                </li>
                <li className={ProductNavCSS.ProductBeauty}>
                    <h3><NavLink to="/products/preview/beauty">건강&뷰티</NavLink></h3>
                </li>
                <li className={ProductNavCSS.ProductFashion}>
                    <h3><NavLink to="/products/preview/fashion">의류</NavLink></h3>
                </li>
            </ul>
        </div>
    );
}

export default MainProductNav;