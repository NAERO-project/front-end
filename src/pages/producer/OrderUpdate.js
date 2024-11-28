import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProducerOrderProductList from "./ProducerOrderProductList";

import {
  callOrderDetailApi,
  callCancelOrderApi,
} from "../../apis/OrderApiCall";

import styles from "./css/OrderUpdate.module.css";

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
    <div className={styles["order-container"]}>
      <h2>주문 상세</h2>
      {orderDetail && (
        <div className={styles["card"]}>
          <div className={styles["product-list"]}>
            <ProducerOrderProductList
              key={params.orderId}
              orderId={params.orderId}
            />
          </div>
          <div className={styles["aside-info"]}>
            <div className="label">회원번호</div>
            <div className="colon">:</div>
            <div className="value">{orderDetail.userId}</div>
            <div className="label">결제 금액</div>
            <div className="colon">:</div>
            <div className="value">
              {orderDetail.orderTotalAmount != null
                ? orderDetail.orderTotalAmount.toLocaleString()
                : "0"}{" "}
              원
            </div>
            <div className="label">주문 수량</div>
            <div className="colon">:</div>
            <div className="value">{orderDetail.orderTotalCount}</div>
            <div className="label">주문 일시</div>
            <div className="colon">:</div>
            <div className="value">
              {orderDetail?.createdAt
                ? orderDetail.createdAt.replace("T", " ").replace("Z", "")
                : "정보 없음"}
            </div>
            <div className="label">주문 상태</div>
            <div className="colon">:</div>
            <div className="value">
              {orderDetail.orderStatus === "completed"
                ? "주문완료"
                : orderDetail.orderStatus === "canceled"
                ? "주문취소"
                : ""}
            </div>
            <div className="label">쿠폰 할인</div>
            <div className="colon">:</div>
            <div className="value">
              {orderDetail.couponDiscount != null
                ? orderDetail.couponDiscount.toLocaleString()
                : "0"}{" "}
              원
            </div>
            <div className="label">포인트 할인</div>
            <div className="colon">:</div>
            <div className="value">
              {orderDetail.pointDiscount != null
                ? orderDetail.pointDiscount.toLocaleString()
                : "0"}{" "}
              원
            </div>
            <div className="label">수령자</div>
            <div className="colon">:</div>
            <div className="value">{orderDetail.recipientName}</div>
            <div className="label">전화번호</div>
            <div className="colon">:</div>
            <div className="value">{orderDetail.recipientPhoneNumber}</div>
            <div className="label">우편번호</div>
            <div className="colon">:</div>
            <div className="value">{orderDetail.postalCode}</div>
            <div className="label">배송주소</div>
            <div className="colon">:</div>
            <div className="value">
              {orderDetail.addressRoad}{" "}
              {orderDetail.addressDetail !== null
                ? orderDetail.addressDetail
                : ""}
            </div>
            <div className="label">배송 요청</div>
            <div className="colon">:</div>
            <div className="value">{orderDetail.deliveryNote}</div>
          </div>
          {orderDetail?.deliveryStatus === "pending" && (
            <div>
              <button
                className={styles["cancel-button"]}
                onClick={() => {
                  onClickCancelOrderHandler(orderDetail?.orderId);
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
