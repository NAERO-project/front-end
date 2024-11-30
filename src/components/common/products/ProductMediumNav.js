import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { callProductCategoryApi02 } from "../../../apis/CategoryApiCall";
import ProductMediumNavCSS from "./css/ProductMediumNav.module.css";
import ProductPreviewNav from "./ProductPreviewNav";

function ProductMediumNav({setState, state}){

    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const params = useParams();                 //URL에서 파라미터 가져오기
    // const largeId = params.largeId;     //largeId를 가져온다
    
    const [largeId, setLargeId] = useState(1);

    const categoryList = useSelector(state => state.mediumCategoryReducer);
    console.log("medium categoryList", categoryList);

    useEffect(() => {
            fetchData();
        },[largeId]);

    const fetchData=()=>{dispatch(callProductCategoryApi02({
        state,
        largeId
    }))
    };

    useEffect(()=>{
        console.log(categoryList,"확인");
    }, [categoryList]);

    const onClickHandler = id =>{
        console.log("클릭 클릭", id);
        setState(id);
    }

    return(
        <div>
            <ProductPreviewNav state={largeId} setState={setLargeId}/>
            <div className={ProductMediumNavCSS.medium_nav_box}>
                <ul className={ProductMediumNavCSS.medium_nav}>
                {Array.isArray(categoryList) && categoryList.map((category) => (
                    <li onClick={() =>onClickHandler(category.mediumCategoryId)} key={category.mediumCategoryId} className={ProductMediumNavCSS.medium_text}>
                        {category.mediumCategoryName}
                    </li>
                ))}
                </ul>
            </div>
        </div>

    );
}

export default ProductMediumNav;