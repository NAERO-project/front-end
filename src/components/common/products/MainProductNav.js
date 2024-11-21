import { NavLink } from "react-router-dom";
import ProductNavCSS from "./MainProductNav.module.css";

function MainProductNav(){

    let array =  [
        {url: "preview", content:"전체"},
        {url: "preview/food", content:"식품&음료"},
        {url: "preview/beauty", content:"건강&뷰티"},
        {url: "preview/fashion", content:"의류"}
    ]

    return (
    <div className={ProductNavCSS.ProductNavBox}>
        <ul className={ProductNavCSS.ProductNav}>

            {array.map((item) => (
                <li className={ProductNavCSS.ProductAll}>
                <NavLink className={ProductNavCSS.Nav} to={"/products/" + item.url}>
                    {item.content}
                </NavLink>
                </li>
            ))}

        </ul>
    </div>   
    );
}

export default MainProductNav;