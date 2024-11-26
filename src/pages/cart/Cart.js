import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { decodeJwt } from "../../utils/tokenUtils";
import {
    callCartListApi,
    callCartDeleteAPI,
    callCartUpdateAPI,
} from "../../apis/CartApiCall";
import { callCartOrderAPI } from "../../apis/OrderApiCall";
import CartCSS from "./css/Cart.module.css";

function Cart() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cartData = useSelector((state) => state.cartReducer) || [];
    const isLogin = window.localStorage.getItem("accessToken");
    const username = isLogin ? decodeJwt(isLogin).sub : null;

    const [selectedItems, setSelectedItems] = useState({});

    useEffect(() => {
        if (username) {
            dispatch(callCartListApi({ username }));
        }
    }, [username, dispatch]);

    useEffect(() => {
        console.log("cartData", cartData);
    }, [cartData]);

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

        await dispatch(callCartDeleteAPI({ cartIds: itemsToDelete }));
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
        <div className={CartCSS.content}>
            <h2 className={CartCSS.title}>장바구니</h2>
            {Array.isArray(cartData) && cartData.length > 0 ? (
                <div>
                    <button onClick={onClickCartDeleteHandler}>삭제</button>
                    &nbsp;&nbsp;
                    <button onClick={onClickCartOrderHandler}>결제</button>
                    {cartData.map((item) => (
                        <div key={item.cartId} className={CartCSS.item}>
                            <input
                                type="checkbox"
                                checked={!!selectedItems[item.cartId]}
                                onChange={() => selectItemHandler(item.cartId)}
                            />
                            <img src={item.productImg} alt={item.productName} />
                            <h3>{item.productName}</h3>
                            <p>
                                {item.optionDesc} (추가 금액:{" "}
                                {item.addPrice.toLocaleString()}원)
                            </p>
                            <p>
                                {(
                                    selectedItems[item.cartId]?.price ||
                                    (item.productPrice + item.addPrice) *
                                        item.count
                                ).toLocaleString()}
                                원
                            </p>
                            <div>
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
                        </div>
                    ))}
                </div>
            ) : (
                <p>장바구니가 비어 있습니다.</p>
            )}
        </div>
    );
}

export default Cart;
