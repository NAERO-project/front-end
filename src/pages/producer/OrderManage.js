import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { decodeJwt } from "../../utils/tokenUtils";

import { callProducerOrderListPageApi } from "../../apis/OrderApiCall";
import ProductManageCSS from "./css/ProductManage.module.css";

import ProductMoreCSS from "../products/css/ProductMore.module.css";
import OrderManageCSS from "./css/OrderManage.module.css";

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
            <div className={OrderManageCSS.box}>
                <table className="">
                    <colgroup>
                        <col width="5%" />
                        <col width="7%" />
                        <col width="8%" />
                        <col width="25%" />
                        <col width="15%" />
                        <col width="8%" />
                        {/* <col width="5%" /> */}
                        {/* <col width="5%" />
                        <col width="10%" /> */}
                    </colgroup>
                    <thead>
                        <tr>
                            <th style={{textAlign: 'center'}}>주문번호</th>
                            <th style={{textAlign: 'center'}}>회원번호</th>
                            <th style={{textAlign: 'center'}}>총 주문 수량</th>
                            <th style={{textAlign: 'center'}}>총 주문 금액</th>
                            <th style={{textAlign: 'center'}}>주문 상태</th>
                            {/* <th>송장번호</th> */}
                            {/* <th></th> */}
                        </tr>
                    </thead>
                    <tbody className={ProductManageCSS.producer_tbody}>
                        {Array.isArray(orderList) &&
                            orderList.map((o) => (
                                <tr
                                    key={o.orderId}
                                    onClick={() => onClickTableTr(o.orderId)}
                                    style={{ cursor: "pointer" }}
                                >
                                    <td style={{textAlign: 'center'}}>{o.orderId}</td>
                                    <td style={{textAlign: 'center'}}>{o.userId}</td>
                                    <td style={{textAlign: 'right'}}>{o.orderTotalCount}</td>
                                    <td style={{textAlign: 'right'}}>
                                        {o.orderTotalAmount.toLocaleString()} 원
                                    </td>
                                    <td style={{textAlign: 'center'}}>
                                        {o?.orderStatus === "completed"
                                            ? "주문완료"
                                            : o?.orderStatus === "canceled"
                                            ? "주문취소"
                                            : ""}
                                    </td>
                                    {/* <td>{o.trackingNumber}</td> */}
                                    {/* <td>
                                        <button>송장등록</button>
                                    </td> */}
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            <div className={ProductMoreCSS.product_paging} style={{padding: '50px 0 0 0'}}>
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
                    <li key={num} 
                    style={
                        currentPage === num
                            ? { backgroundColor: "#647453" }
                            : null
                    }
                    onClick={() => setCurrentPage(num)}>
                        <button
                            style={
                                currentPage === num
                                    ? { color: "#fff", fontWeight: '500' }
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
