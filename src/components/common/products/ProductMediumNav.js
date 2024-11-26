import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { callProductCategoryApi02 } from "../../../apis/CategoryApiCall";
import ProductMediumNavCSS from "./css/ProductMediumNav.module.css";

function ProductMediumNav({
    category: mediumCategoryId, mediumCategoryName
}){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const mediumCategoryList = useSelector(state => state.mediumCategoryReducer);

    const params = useParams();                 //URL에서 파라미터 가져오기
    const largeCategoryId = params.largeId;     //largeId를 가져온다

    useEffect(() => {
            fetchData();
        },[largeCategoryId, mediumCategoryId]);

    const fetchData=()=>{dispatch(callProductCategoryApi02({
        mediumCategoryId, 
        mediumCategoryName,
        largeId: largeCategoryId
    }))
    };

    useEffect(()=>{
        console.log(mediumCategoryList,"확인");
    }, [mediumCategoryList]);

    return(
        <div className={ProductMediumNavCSS.medium_nav_box}>
            {Array.isArray(mediumCategoryList) && mediumCategoryList.map((category) => (
                <div className={ProductMediumNavCSS.medium_nav}>
                    <NavLink className={ProductMediumNavCSS.medium_text}
                        to={`/products/more/${largeCategoryId}/${category.mediumCategoryId}`}>
                        {category.mediumCategoryName}
                    </NavLink>
                </div>
            ))}
        </div>
    );
}

export default ProductMediumNav;