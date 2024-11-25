import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { decodeJwt } from "../../utils/tokenUtils";
import OrderProductList from "./OrderProductList";

import { callMyPageOrderListApi } from "../../apis/OrderApiCall";

function MyOrders() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isLogin = window.localStorage.getItem("accessToken"); // Local Storage 에 token 정보 확인
    const username = isLogin ? decodeJwt(isLogin).sub : null; // JWT에서 사용자 ID 추출

    const orders = useSelector((state) => state.orderReducer);
    const orderList = orders.data;

    // 페이징 관련 코드
    const pageInfo = orders.pageInfo;

    const [start, setStart] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageEnd, setPageEnd] = useState(1);

    const pageNumber = [];
    if (pageInfo) {
        for (let i = 1; i <= pageInfo.pageEnd; i++) {
            pageNumber.push(i);
        }
    }

    useEffect(() => {
        setStart((currentPage - 1) * 5);
        dispatch(
            callMyPageOrderListApi({
                currentPage: currentPage,
                username,
            })
        );
        console.log('orders!!!!', orders);
        console.log('orderlist!!!', orderList);
    }, [currentPage]);

    return (
        <>
            <div className="">
                <table className="">
                    <colgroup>
                        <col width="20%" />
                        <col width="20%" />
                        <col width="20%" />
                        <col width="20%" />
                    </colgroup>
                    <tbody>
                        {orderList &&
                            orderList.map((order) => (
                                <tr key={order.orderId}>
                                    <td>
                                        주문 번호: {order.orderId}
                                        <br />총 결제 금액:{" "}
                                        {order.orderTotalAmount.toLocaleString(
                                            "ko-KR"
                                        )}
                                        원
                                        <hr style={{ border: "1px solid #000" }} />
                                        <br />
                                        <OrderProductList
                                            key={order.orderId}
                                            orderId={order.orderId}
                                        />
                                        <br />
                                    </td>
                                    <td>
                                        {order.orderStatus === "completed"
                                            ? "주문완료"
                                            : ""}
                                    </td>
                                    <td>
                                        {order.deliveryStatus === "pending"
                                            ? "배송 전"
                                            : order.deliveryStatus ===
                                              "canceled"
                                            ? "배송취소"
                                            : "배송완료"}
                                    </td>
                                    <td>
                                        <button className="" onClick={() => {}}>
                                            주문 상세
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            <div
                style={{
                    listStyleType: "none",
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                {Array.isArray(orderList) && (
                    <button
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className=""
                    >
                        &lt;
                    </button>
                )}
                {pageNumber.map((num) => (
                    <li key={num} onClick={() => setCurrentPage(num)}>
                        <button
                            style={
                                currentPage === num
                                    ? { backgroundColor: "lightgreen" }
                                    : null
                            }
                            className=""
                        >
                            {num}
                        </button>
                    </li>
                ))}
                {Array.isArray(orderList) && (
                    <button
                        className=""
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={
                            currentPage === pageInfo.pageEnd ||
                            pageInfo.total == 0
                        }
                    >
                        &gt;
                    </button>
                )}
            </div>
        </>
    );
}

export default MyOrders;
