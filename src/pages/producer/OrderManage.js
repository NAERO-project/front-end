import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { decodeJwt } from "../../utils/tokenUtils";

import { callProducerOrderListPageApi } from "../../apis/OrderApiCall";

function ProductManage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLogin = window.localStorage.getItem("accessToken"); // Local Storage 에 token 정보 확인
    const producerUsername = isLogin ? decodeJwt(isLogin).sub : null; // JWT에서 사용자 ID 추출

    const orders = useSelector((state) => state.orderReducer);
    const orderList = orders.data;

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
            callProducerOrderListPageApi({
                currentPage: currentPage,
                producerUsername: producerUsername,
            })
        );
    }, [currentPage]);

    const onClickTableTr = (orderId) => {
        navigate(`/producer/order-update/${orderId}`, { replace: false });
    };

    return (
        <>
            <div className="">
                <table className="">
                    <colgroup>
                        <col width="5%" />
                        <col width="7%" />
                        <col width="8%" />
                        <col width="25%" />
                        <col width="15%" />
                        <col width="8%" />
                        <col width="5%" />
                        {/* <col width="5%" />
                        <col width="10%" /> */}
                    </colgroup>
                    <thead>
                        <tr>
                            <th>주문번호</th>
                            <th>회원번호</th>
                            <th>총 주문 수량</th>
                            <th>총 주문 금액</th>
                            <th>주문 상태</th>
                            <th>배송 상태</th>
                            <th>송장번호</th>
                            {/* <th></th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(orderList) &&
                            orderList.map((o) => (
                                <tr
                                    key={o.orderId}
                                    onClick={() => onClickTableTr(o.orderId)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <td>{o.orderId}</td>
                                    <td>{o.userId}</td>
                                    <td>{o.orderTotalCount}</td>
                                    <td>{o.orderTotalAmount.toLocaleString()} 원</td>
                                    <td>{o.orderStatus}</td>
                                    <td>{o.deliveryStatus}</td>
                                    <td>{o.trackingNumber}</td>
                                    {/* <td>
                                        <button>송장등록</button>
                                    </td> */}
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

export default ProductManage;
