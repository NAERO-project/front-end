import { NavLink, useNavigate, useParams } from "react-router-dom";
import MainProductNavCSS from "./css/MainProductNav.module.css"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { callProductCategoryApi01 } from "../../../apis/CategoryApiCall";

function ProductNav({
    category: largeCategoryId, largeCategoryName 
}){

    const navigate = useNavigate();    
    const dispatch = useDispatch();

    const params = useParams();
    const producerId = params.producerId

    const categoryList = useSelector(state => state.largeCategoryReducer);
    console.log("categoryList", categoryList);

    useEffect(() =>{
        fetchData();
    }, [producerId]);


const fetchData=()=>{
    dispatch(callProductCategoryApi01({
        largeCategoryId, 
        largeCategoryName,
        producerId: producerId
    } ))
    };

    useEffect(() =>{
        console.log('categoryList:', categoryList);
    }, [categoryList]);

    return (
        <div className={MainProductNavCSS.product_nav}>
            <ul className={MainProductNavCSS.nav_ul}>
            {Array.isArray(categoryList) && categoryList.map((category) => (
                    <li key={category.largeCategoryId}>
                        <NavLink 
                            className={MainProductNavCSS.nav} 
                            to={`/products/more/${category.largeCategoryId}`}>
                            {category.largeCategoryName}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    );

}

export default ProductNav;