import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { decodeJwt } from "../../utils/tokenUtils";
import { callProductDetailApi } from "../../apis/ProductApiCall";
import { SET_CART_ITEMS } from "../../modules/OrderModule";
import ProductDetailCSS from "./css/ProductDetail.module.css";

import { FaRegHeart } from "react-icons/fa6";	
import { LuShoppingCart } from "react-icons/lu";
import { IoCardOutline } from "react-icons/io5";

function ProductDetail() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const productData = useSelector((state) => state.productReducer);
    const cartItems = useSelector((state) => state.orderReducer.cartItems); // Redux에서 cartItems 참조

    const [amount, setAmount] = useState(1);
    const [selectedOption, setSelectedOption] = useState(null); // 선택된 옵션 상태 추가

    useEffect(() => {
        dispatch(callProductDetailApi({ productId: params.productId }));
    }, [params.productId]);

    const onChangeAmountHandler = (e) => {
        setAmount(e.target.value);
    };

    const onChangeOptionHandler = (e) => {
        setSelectedOption(e.target.value); // 드롭다운에서 선택된 옵션 저장
    };

    const onClickAddCartHandler = () => {
        const cartItem = {
            userId: 1, // 사용자 ID를 1로 설정
            count: parseInt(amount), // 수량
            optionId: selectedOption, // 선택된 옵션 ID 추가
        };

        // Redux에 cartItems 추가
        const updatedCartItems = [...cartItems, cartItem];
        console.log(updatedCartItems);
        dispatch({ type: SET_CART_ITEMS, payload: updatedCartItems });
    };

    const onClickOrderHandler = () => {
        const token = decodeJwt(window.localStorage.getItem("accessToken"));

        if (token === undefined || token === null) {
            alert("로그인을 먼저해주세요");
            return;
        }

        onClickAddCartHandler(); // 장바구니에 추가
        // Redux에 장바구니 데이터 저장
        onClickAddCartHandler();

        // Order 페이지로 이동
        navigate("/order");
    };

    return (
        <div className={ProductDetailCSS.product_box}>
            <div className={ProductDetailCSS.product_img_box}>
                <img src={productData.productImg} alt={productData.productName}/>
            </div>
            <div className={ProductDetailCSS.text_box}>
                <div className={ProductDetailCSS.content01}>
                    {/* <div>{productData.smallCategory}</div> */}
                    <h2>
                        {productData == undefined
                            ? ""
                            : productData.productName}
                    </h2>
                    <h2 className={ProductDetailCSS.price}>
                        {productData.productPrice}<span className={ProductDetailCSS.small_txt}>원</span>
                    </h2>
                    <button className={ProductDetailCSS.discount_btn}>
                        <strong>할인쿠폰</strong> 다운받기
                    </button>
                </div>

                <hr/>

                <div className={ProductDetailCSS.content02}>
                    <h3>상세설명</h3>
                    <div className={ProductDetailCSS.product_desc}>
                        <p>{productData.productDesc}</p>
                    </div>
                </div>

                <hr/>
                
                <div className={ProductDetailCSS.content03}>
                    <select onChange={onChangeOptionHandler} value={selectedOption}>
                        <option value="">옵션 선택</option>
                        {productData &&
                            productData.options &&
                            productData.options.map((option) => (
                                <option key={option.optionId} value={option.optionId}>
                                    {option.optionDesc} (추가 금액: {option.addPrice ? option.addPrice : 0}원)
                                </option>
                            ))}
                    </select>

                    <span className={ProductDetailCSS.amount}>
                        <input
                            type="number"
                            value={amount}
                            onChange={onChangeAmountHandler}
                            min="1"
                        />
                    </span>

                    <div className={ProductDetailCSS.detail_btn}>
                        <button><FaRegHeart/> 찜하기</button>
                        <button onClick={onClickAddCartHandler}><LuShoppingCart/> 장바구니</button>
                        <button onClick={onClickOrderHandler}><IoCardOutline /> 바로구매</button>
                    </div>
                </div>
            </div>
            
           
        </div>
    );
}

export default ProductDetail;
