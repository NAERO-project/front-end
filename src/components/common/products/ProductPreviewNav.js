import { NavLink, useNavigate, useParams } from "react-router-dom";
import MainProductNavCSS from "./css/MainProductNav.module.css"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { callProductCategoryApi01 } from "../../../apis/CategoryApiCall";

function ProductPreviewNav({setState, state}){
    const [isActive, setIsActive] = useState(null);

    // function activeHandleClick(){
    //     setIsActive(!isActive);
    // }
    
    const navigate = useNavigate();    
    const dispatch = useDispatch();

    const params = useParams();
    const producerId = params.producerId;

    const categoryList = useSelector(state => state.largeCategoryReducer);
    console.log("categoryList", categoryList);

    useEffect(() =>{
        fetchData();
    }, [producerId]);


const fetchData=()=>{
    dispatch(callProductCategoryApi01({
        state, 
        producerId: producerId
    } ))
    };

    useEffect(() =>{
        console.log('categoryList:', categoryList);
    }, [categoryList]);

const onClickHandler = (id)=>{
    console.log("버튼 클릭", id);
    setIsActive(id);
    setState(id);

}
    return (
        <>
            <div className={MainProductNavCSS.product_nav}>
                <ul className={MainProductNavCSS.nav_ul}>
                {Array.isArray(categoryList) && categoryList.map((category) => (
                        <li onClick={()=>onClickHandler(category.largeCategoryId)} key={category.largeCategoryId} className={`${MainProductNavCSS.nav} ${isActive === category.largeCategoryId ? MainProductNavCSS.active : ''}`}>
                        {category.largeCategoryName}
                            {/* <NavLink 
                                className={MainProductNavCSS.nav} 
                                to={`/${category.largeCategoryId}`}>
                                {category.largeCategoryName}
                            </NavLink> */}
                        </li>
                    ))}
                </ul>
                {/* <div className={MainProductNavCSS.line}></div> */}
            </div>
        </>
    );

}

export default ProductPreviewNav;