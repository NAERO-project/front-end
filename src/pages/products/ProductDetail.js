import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { decodeJwt } from "../../utils/tokenUtils";
import { callProductDetailApi } from "../../apis/ProductApiCall";
import { SET_CART_ITEMS } from "../../modules/OrderModule";
import ProductDetailCSS from "./css/ProductDetail.module.css";

import { callUserDetailAPI } from "../../apis/UserApiCall";
import { callCartInsertAPI } from "../../apis/CartApiCall";

import { FaRegHeart } from "react-icons/fa6";
import { LuShoppingCart } from "react-icons/lu";
import { IoCardOutline } from "react-icons/io5";

function ProductDetail() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const productData = useSelector((state) => state.productReducer);

    const isLogin = window.localStorage.getItem("accessToken"); // Local Storage 에 token 정보 확인
    const username = isLogin ? decodeJwt(isLogin).sub : null; // JWT에서 사용자 ID 추출

    const [amount, setAmount] = useState(1);
    const [price, setPrice] = useState(productData?.productPrice * amount);
    const [selectedOption, setSelectedOption] = useState(null); // 선택된 옵션 상태 추가

    useEffect(() => {
        dispatch(callProductDetailApi({ productId: params.productId }));
    }, [params.productId]);

    useEffect(() => {
        const selectedOptionData = productData?.options?.find(
            (option) => option.optionId === Number(selectedOption)
        ); // 타입 변환
        const selectedOptionPrice = selectedOptionData
            ? selectedOptionData.addPrice
            : 0; // 가격 설정
        setPrice(
            ((productData?.productPrice || 0) + selectedOptionPrice) * amount
        ); // price 계산
    }, [amount, selectedOption, productData]);

    const onChangeAmountHandler = (e) => {
        setAmount(e.target.value);
    };

    const onChangeOptionHandler = (e) => {
        setSelectedOption(e.target.value); // 드롭다운에서 선택된 옵션 저장
    };

    const onClickAddCartHandler = () => {
        const token = decodeJwt(window.localStorage.getItem("accessToken"));

        if (token === undefined || token === null) {
            alert("로그인을 먼저해주세요");
            return;
        }

        if (!!!selectedOption) {
            alert("옵션을 선택해주세요");
            return;
        }

        const cartItem = {
            count: parseInt(amount), // 수량
            optionId: selectedOption, // 선택된 옵션 ID 추가
            price: price,
        };

        dispatch(callCartInsertAPI({ cartItem, username }));
    };

    const onClickOrderHandler = () => {
        const token = decodeJwt(window.localStorage.getItem("accessToken"));

        if (token === undefined || token === null) {
            alert("로그인을 먼저해주세요");
            return;
        }

        if (!!!selectedOption) {
            alert("옵션을 선택해주세요");
            return;
        }

        const cartItem = {
            count: parseInt(amount),
            optionId: selectedOption,
            amount: price,
        };

        // 상태를 사용하여 주문 페이지로 이동
        navigate("/order", { state: { cartItem } });
    };

    return (
        <div className={ProductDetailCSS.product_detail}>
            <div className={ProductDetailCSS.product_box}>
                <div className={ProductDetailCSS.product_img_box}>
                    <img
                        src={productData.productImg}
                        alt={productData.productName}
                    />
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
                            {price.toLocaleString("ko-KR")}
                            <span className={ProductDetailCSS.small_txt}>
                                원
                            </span>
                        </h2>
                        <button className={ProductDetailCSS.discount_btn}>
                            <strong>할인쿠폰</strong> 다운받기
                        </button>
                    </div>

                    <hr />

                    <div className={ProductDetailCSS.content02}>
                        <h3>상세설명</h3>
                        <div className={ProductDetailCSS.product_desc}>
                            <p>{productData.productDesc}</p>
                        </div>
                    </div>

                    <hr />

                    <div className={ProductDetailCSS.content03}>
                        <select
                            onChange={onChangeOptionHandler}
                            value={selectedOption}
                        >
                            <option value="">옵션 선택</option>
                            {productData &&
                                productData.options &&
                                productData.options
                                    .filter(option => option.optionCheck !== "N")
                                    .map((option) => (
                                        <option
                                            key={option.optionId}
                                            value={option.optionId}
                                            disabled={option.optionQuantity <= 0}
                                            style={{
                                                color: option.optionQuantity <= 0 ? 'gray' : 'black',
                                            }}
                                        >
                                            {option.optionDesc} 
                                            {option.optionQuantity <= 0 ? " (품절)" : ""} 
                                            (추가 금액: {option.addPrice ? option.addPrice : 0} 원)
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
                            <button>
                                <FaRegHeart /> 찜하기
                            </button>
                            <button onClick={onClickAddCartHandler}>
                                <LuShoppingCart /> 장바구니
                            </button>
                            <button onClick={onClickOrderHandler}>
                                <IoCardOutline /> 바로구매
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
