import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { decodeJwt } from "../../utils/tokenUtils";
import { callProductDetailApi } from "../../apis/ProductApiCall";

function ProductDetail() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const productData = useSelector((state) => state.productReducer);

    const [amount, setAmount] = useState(1);
    const [cartItems, setCartItems] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null); // 선택된 옵션 상태 추가

    useEffect(() => {
        dispatch(callProductDetailApi({ productId: params.productId }));
    }, [dispatch, params.productId]);

    const onChangeAmountHandler = (e) => {
        setAmount(e.target.value);
    };

    const onChangeOptionHandler = (e) => {
        setSelectedOption(e.target.value); // 드롭다운에서 선택된 옵션 저장
    };

    const onClickAddCartHandler = () => {
        const cartItem = {
            userId: 1, // 사용자 ID를 1로 설정
            count: amount, // 수량
            optionId: selectedOption, // 선택된 옵션 ID 추가
        };

        setCartItems([...cartItems, cartItem]);
    };

    const onClickOrderHandler = () => {
        const token = decodeJwt(window.localStorage.getItem("accessToken"));

        if (token === undefined || token === null) {
            alert("로그인을 먼저해주세요");
            return;
        }

        onClickAddCartHandler(); // 장바구니에 추가
        const updatedCartItems = [
            ...cartItems,
            { userId: 1, count: amount, optionId: selectedOption },
        ];
        console.log("cartItems", updatedCartItems); // 업데이트된 cartItems를 확인
        navigate("/order", { state: { cartItems: updatedCartItems } });
    };

    return (
        <div>
            <p>
                {productData.product == undefined
                    ? ""
                    : productData.product.productName}
            </p>
            <select onChange={onChangeOptionHandler} value={selectedOption}>
                <option value="">옵션 선택</option>
                {productData.product &&
                    productData.product.options &&
                    productData.product.options.map((option) => (
                        <option key={option.optionId} value={option.optionId}>
                            {option.optionDesc} (추가 금액: {option.addPrice}원)
                        </option>
                    ))}
            </select>
            <input
                type="number"
                value={amount}
                onChange={onChangeAmountHandler}
                min="1"
            />
            <button onClick={onClickAddCartHandler}>장바구니에 추가</button>
            <button onClick={onClickOrderHandler}>주문하기</button>
        </div>
    );
}

export default ProductDetail;
