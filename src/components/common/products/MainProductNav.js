import { NavLink } from "react-router-dom";
import MainProductNavCSS from "./css/MainProductNav.module.css";

function MainProductNav(){

    let array =  [
        {url: "", content:"전체"},
        {url: "preview/food", content:"식품&음료"},
        {url: "preview/beauty", content:"건강&뷰티"},
        {url: "preview/fashion", content:"의류"}
    ]

    return (
    <div className={MainProductNavCSS.product_nav}>
        <ul className={MainProductNavCSS.nav_ul}>
            {array.map((item) => (
                <li>
                    <NavLink className={MainProductNavCSS.nav} to={"/" + item.url}>
                        {item.content}
                    </NavLink>
                </li>
            ))}
        </ul>
    </div>   
    );
}

export default MainProductNav;