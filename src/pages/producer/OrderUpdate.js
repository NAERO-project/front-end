import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProducerOrderProductList from "./ProducerOrderProductList";

import {
    callOrderDetailApi,
    callCancelOrderApi,
} from "../../apis/OrderApiCall";

function OrderUpdate() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const orderDetail = useSelector((state) => state.orderReducer);

    useEffect(() => {
        console.log("[OrderUpdate] orderId : ", params.orderId);

        dispatch(
            callOrderDetailApi({
                orderId: params.orderId,
            })
        );

        console.log("뭘 갖고 왔나???", orderDetail);
    }, []);

    const onClickCancelOrderHandler = (orderId) => {
        let answer = window.confirm("해당 주문을 취소 하시겠습니까?");
        if (answer) {
            dispatch(
                callCancelOrderApi({
                    orderId,
                })
            )
                .then(() => {
                    alert("주문이 취소되었습니다."); // 주문 취소 완료 알림
                    window.location.reload(); // 페이지 리로딩
                })
                .catch((error) => {
                    console.error("주문 취소 중 오류 발생:", error);
                    alert("주문 취소 실패. 관리자에게 문의하세요.");
                });
        }
    };

    return (
        <div>
            <h2>주문 상세</h2>
            {orderDetail && (
                <div className="">
                    <div className="">
                        <div className="">
                            <ProducerOrderProductList
                                key={params.orderId}
                                orderId={params.orderId}
                            />
                        </div>
                    </div>
                    <div className="">
                        <p>회원번호: {orderDetail.userId}</p>
                        <p>
                            총 결제 금액:{" "}
                            {orderDetail.orderTotalAmount != null
                                ? orderDetail.orderTotalAmount.toLocaleString()
                                : "0"}
                            원
                        </p>
                        <p>총 주문 수량: {orderDetail.orderTotalCount}</p>
                        <p>
                            주문 일시:{" "}
                            {orderDetail?.createdAt
                                ? orderDetail.createdAt
                                      .replace("T", " ")
                                      .replace("Z", "") // "T"를 공백으로, "Z"를 제거
                                : "정보 없음"}
                        </p>

                        <p>
                            배송 상태:{" "}
                            {orderDetail.deliveryStatus === "pending"
                                ? "배송전"
                                : orderDetail.deliveryStatus === "canceled"
                                ? "배송취소"
                                : orderDetail.deliveryStatus === "sent"
                                ? "배송완료"
                                : "상태 미지정"}
                        </p>
                        <p>
                            주문 상태:{" "}
                            {orderDetail.orderStatus === "completed"
                                ? "주문완료"
                                : orderDetail.orderStatus === "canceled"
                                ? "주문취소"
                                : ""}
                        </p>
                        <p>
                            쿠폰 할인:{" "}
                            {orderDetail.couponDiscount != null
                                ? orderDetail.couponDiscount.toLocaleString()
                                : "0"}
                            원
                        </p>
                        <p>
                            포인트 할인:{" "}
                            {orderDetail.pointDiscount != null
                                ? orderDetail.pointDiscount.toLocaleString()
                                : "0"}
                            원
                        </p>
                        <p>수령자: {orderDetail.recipientName}</p>
                        <p>전화번호: {orderDetail.recipientPhoneNumber}</p>
                        <p>우편번호: {orderDetail.postalCode}</p>
                        <p>
                            배송주소: {orderDetail.addressRoad}{" "}
                            {orderDetail.addressDetail !== null
                                ? orderDetail.addressDetail
                                : ""}
                        </p>
                        <p>배송 요청 사항: {orderDetail.deliveryNote}</p>
                        <p>송장번호: {orderDetail.trackingNumber}</p>
                    </div>
                    {orderDetail?.deliveryStatus === "pending" && (
                        <div>
                            <button
                                style={{ color: "red" }}
                                onClick={() => {
                                    onClickCancelOrderHandler(
                                        orderDetail?.orderId
                                    );
                                }}
                            >
                                주문 취소
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default OrderUpdate;
