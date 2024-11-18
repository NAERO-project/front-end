import { NavLink } from "react-router-dom";

function MainProductNav(){

    
    return(
        <div>
            <ul>
                <li>
                    <NavLink to="/products/preview">전체</NavLink>
                </li>
                <li>
                    <NavLink to="/products/preview/food">식품&음료</NavLink>
                </li>
                <li>
                    <NavLink to="/products/preview/beauty">건강&뷰티</NavLink>
                </li>
                <li>
                    <NavLink to="/products/preview/fashion">의류</NavLink>
                </li>
            </ul>
        </div>
    );
}

export default MainProductNav;