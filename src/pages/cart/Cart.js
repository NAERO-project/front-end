import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { decodeJwt } from "../../utils/tokenUtils";
import {
    callCartListApi,
    callCartDeleteAPI,
    callCartUpdateAPI,
} from "../../apis/CartApiCall";
import CartCSS from "./css/Cart.module.css";
import Footer from "../../components/common/Footer";

function isTokenExpired(decodedToken) {
    const currentTime = Math.floor(Date.now() / 1000);
    return decodedToken.exp < currentTime;
}

function Cart() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cartData = useSelector((state) => state.cartReducer) || [];

    const [selectedItems, setSelectedItems] = useState({});

    const isLogin = window.localStorage.getItem("accessToken");
    const decodedToken = decodeJwt(isLogin);
    const username = isLogin ? decodeJwt(isLogin).sub : null;

    useEffect(() => {
        if (!isLogin || !decodedToken || isTokenExpired(decodedToken)) {
            alert("로그인 세션이 만료되었습니다. 다시 로그인 해주세요.");
            navigate("/login");
            return;
        }

        if (username) {
            dispatch(callCartListApi({ username }));
        }
    }, [username, dispatch]);

    const onClickQuantityChangeHandler = (cartId, change) => {
        setSelectedItems((prev) => {
            const item = cartData.find((item) => item.cartId === cartId);
            const currentQuantity = prev[cartId]?.quantity || item.count;
            const newQuantity = Math.max(1, currentQuantity + change);
            const newPrice = (item.productPrice + item.addPrice) * newQuantity;

            dispatch(
                callCartUpdateAPI({
                    optionId: item.optionId,
                    count: newQuantity,
                    price: newPrice,
                    cartId: item.cartId,
                })
            );

            return {
                ...prev,
                [cartId]: { quantity: newQuantity, price: newPrice },
            };
        });
    };

    const selectItemHandler = (cartId) => {
        setSelectedItems((prev) => {
            if (prev[cartId]) {
                const { [cartId]: _, ...rest } = prev;
                return rest;
            } else {
                const item = cartData.find((item) => item.cartId === cartId);
                const initialCount = item.count;
                const initialPrice =
                    (item.productPrice + item.addPrice) * initialCount;
                return {
                    ...prev,
                    [cartId]: { quantity: initialCount, price: initialPrice },
                };
            }
        });
    };

    const onClickCartDeleteHandler = async () => {
        const itemsToDelete = Object.entries(selectedItems)
            .filter(([_, value]) => value)
            .map(([key]) => key);
        console.log("삭제할 아이템 ID:", itemsToDelete);

        if (itemsToDelete.length === 0) {
            alert("삭제할 상품을 선택하세요.");
            return;
        }

        await dispatch(callCartDeleteAPI({ cartIds: itemsToDelete }));
        alert("장바구니 삭제 완료");
        setSelectedItems({})
        dispatch(callCartListApi({ username })); // 삭제 후 리로딩 제대로 되게 함
    };

    const onClickCartOrderHandler = () => {
        const itemsToOrder = Object.entries(selectedItems)
            .filter(([_, value]) => value)
            .map(([key]) => {
                const item = cartData.find(
                    (item) => item.cartId === parseInt(key)
                );
                return {
                    cartId: item.cartId,
                    optionId: item.optionId,
                    count: selectedItems[key].quantity,
                    price: selectedItems[key].price,
                };
            });

        if (itemsToOrder.length === 0) {
            alert("주문할 상품을 선택하세요.");
            return;
        }

        navigate("/cart-order", { state: { cartItems: itemsToOrder } });
    };

    return (
        <>
            <div className={CartCSS.content}>
            <h2 className={CartCSS.title}>장바구니</h2>
            {Array.isArray(cartData) && cartData.length > 0 ? (
                <div>
                    <button className={CartCSS.order_btn01} onClick={onClickCartDeleteHandler}>삭제하기</button>
                    
                    {cartData.map((item) => (
                        <div key={item.cartId} className={CartCSS.item}>
                            <div className={CartCSS.div_box01}>
                                <div className={CartCSS.img_box}>
                                    <img src={item.productImg} alt={item.productName} />
                                </div>
                                
                                <div>
                                <div className={CartCSS.txt}>
                                    <h3>{item.productName}</h3>
                                    <p>
                                        {(
                                            selectedItems[item.cartId]?.price ||
                                            ((item.productPrice || 0) + (item.addPrice || 0)) *
                                                item.count
                                        ).toLocaleString()}
                                        원
                                    </p>
                                </div>

                                <div className={CartCSS.div_box02}>
                                    <p>
                                        {item.optionDesc} (추가 금액:{" "}
                                        {(item.addPrice || 0).toLocaleString()}원)
                                    </p>
                                </div>
                                </div>
                                
                            </div>
                            
                            

                            <div className={CartCSS.div_box03}>
                                <div className={CartCSS.btn}>
                                    <button
                                        onClick={() =>
                                            onClickQuantityChangeHandler(
                                                item.cartId,
                                                -1
                                            )
                                        }
                                    >
                                        -
                                    </button>
                                    <span>
                                        {selectedItems[item.cartId]?.quantity ||
                                            item.count}
                                    </span>
                                    <button
                                        onClick={() =>
                                            onClickQuantityChangeHandler(
                                                item.cartId,
                                                1
                                            )
                                        }
                                    >
                                        +
                                    </button>
                                </div>
                                <div className={CartCSS.checkbox}>
                                    <input
                                    type="checkbox"
                                    checked={!!selectedItems[item.cartId]}
                                    onChange={() => selectItemHandler(item.cartId)}
                                    />
                                </div>
                                
                            </div>
                        </div>
                    ))}
                    <div className={CartCSS.order_btn}>
                        <button className={CartCSS.order_btn02} onClick={onClickCartOrderHandler}>주문하기</button>
                    </div>
                    
                </div>
            ) : (
                <p>장바구니가 비어 있습니다.</p>
            )}
            </div>
            <Footer/>
        </>
        
    );
}

export default Cart;
