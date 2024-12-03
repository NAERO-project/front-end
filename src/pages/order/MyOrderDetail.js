import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import OrderProductList from "./OrderProductList";
import { decodeJwt } from "../../utils/tokenUtils";

import {
  callOrderDetailApi,
  callCancelOrderApi,
} from "../../apis/OrderApiCall";
import { callPaymentDetailApi } from "../../apis/PaymentApiCall";
import { callUserDetailAPI } from "../../apis/UserApiCall";

import MyOrderDetailCSS from "./css/MyOrderDetail.module.css";
import UserInfoCSS from "../../components/signup/css/UserInfoForm.module.css";
import Footer from "../../components/common/Footer";

function MyOrderDetail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const orderDetail = useSelector((state) => state.orderReducer);
  const paymentDetail = useSelector((state) => state.paymentReducer);
  const loginUser = useSelector((state) => state.userReducer.data || {});
  const isLogin = window.localStorage.getItem("accessToken");
  const isProducer = decodeJwt(isLogin).auth.some((a) =>
    /ROLE_PRODUCER/.test(a)
  );
  const username = decodeJwt(isLogin).sub;
  const user = isProducer ? loginUser.user : loginUser;

  useEffect(() => {
    dispatch(
      callOrderDetailApi({
        orderId: params.orderId,
      })
    );

    console.log("orderDetail 뭘 갖고 왔나???", orderDetail);
  }, []);

  useEffect(() => {
    dispatch(
      callPaymentDetailApi({
        orderId: params.orderId,
      })
    );

    console.log("paymentDetail 뭘 갖고 왔나???", paymentDetail);
  }, []);

  useEffect(() => {
    if (username) {
      dispatch(
        callUserDetailAPI({
          username: username,
        })
      );
    }

    console.log("userDetail 뭘 갖고 왔나???", user);
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
          alert("주문 취소 실패. 판매자에게 문의하세요.");
        });
    }
  };

  return (
    <>
      {orderDetail && paymentDetail && user && (
        <div className={MyOrderDetailCSS.box}>
          <div className={MyOrderDetailCSS.order}>
            <h3>주문 내역</h3>

            <div className={UserInfoCSS.info}>
              <p style={{ width: "80px", margin: "10px 0 0 0" }}>결제 번호:</p>
              <p
                style={{ width: "408px", padding: "5px 10px" }}
                className={UserInfoCSS.txt}
              >
                {paymentDetail.impUid}
              </p>
            </div>
            <div className={MyOrderDetailCSS.hoverPointer}>
              <OrderProductList
                className={MyOrderDetailCSS.product}
                key={orderDetail.orderId}
                orderId={orderDetail.orderId}
              />
            </div>
          </div>

          <hr style={{ border: "1px soled #626E53" }} />

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <div className={MyOrderDetailCSS.order}>
                <h3>주문자 정보</h3>
              </div>
              <div className={UserInfoCSS.info}>
                <p style={{ width: "75px", padding: "5px 0 0 0" }}>주문자:</p>
                <p
                  style={{ width: "408px", padding: "5px 10px" }}
                  className={UserInfoCSS.txt}
                >
                  {user?.userFullName}
                </p>
              </div>

              <div className={UserInfoCSS.info}>
                <p style={{ width: "75px", padding: "5px 0 0 0" }}>전화번호:</p>
                <p
                  style={{ width: "408px", padding: "5px 10px" }}
                  className={UserInfoCSS.txt}
                >
                  {user?.userPhone}
                </p>
              </div>

              <div className={UserInfoCSS.info}>
                <p style={{ width: "75px", padding: "5px 0 0 0" }}>이메일:</p>
                <p
                  style={{
                    width: "408px",
                    padding: "5px 10px",
                    margin: "0 0 30px 0",
                  }}
                  className={UserInfoCSS.txt}
                >
                  {user?.userEmail}
                </p>
              </div>
            </div>

            <div>
              <div className={MyOrderDetailCSS.order}>
                <h3>배송 정보</h3>
              </div>
              <div className={UserInfoCSS.info}>
                <p style={{ width: "75px", padding: "5px 0 0 0" }}>수령자:</p>
                <p
                  style={{ width: "408px", padding: "5px 10px" }}
                  className={UserInfoCSS.txt}
                >
                  {orderDetail?.recipientName}
                </p>
              </div>

              <div className={UserInfoCSS.info}>
                <p style={{ width: "75px", padding: "5px 0 0 0" }}>전화번호:</p>
                <p
                  style={{ width: "408px", padding: "5px 10px" }}
                  className={UserInfoCSS.txt}
                >
                  {orderDetail?.recipientPhoneNumber}
                </p>
              </div>

              <div className={UserInfoCSS.info}>
                <p style={{ width: "75px", padding: "5px 0 0 0" }}>우편번호:</p>
                <p
                  style={{ width: "408px", padding: "5px 10px" }}
                  className={UserInfoCSS.txt}
                >
                  {orderDetail?.postalCode}
                </p>
              </div>

              <div className={UserInfoCSS.info}>
                <p style={{ width: "75px", padding: "5px 0 0 0" }}>배송주소:</p>
                <p
                  style={{
                    width: "408px",
                    padding: "5px 10px",
                    margin: "0 0 30px 0",
                  }}
                  className={UserInfoCSS.txt}
                >
                  {orderDetail?.addressRoad}{" "}
                  {orderDetail?.addressDetail ? orderDetail?.addressDetail : ""}
                </p>
              </div>
            </div>
          </div>

          <hr style={{ border: "1px soled #626E53" }} />

          <div>
            <div className={MyOrderDetailCSS.order}>
              <h3>결제 정보</h3>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <div className={UserInfoCSS.info}>
                  <p style={{ width: "75px", padding: "5px 0 0 0" }}>
                    주문 상태:
                  </p>
                  <p
                    style={{ width: "408px", padding: "5px 10px" }}
                    className={UserInfoCSS.txt}
                  >
                    {" "}
                    {orderDetail?.orderStatus === "completed"
                      ? "주문완료"
                      : orderDetail?.orderStatus === "canceled"
                      ? "주문취소"
                      : ""}
                  </p>
                </div>

                <div className={UserInfoCSS.info}>
                  <p style={{ width: "75px", padding: "5px 0 0 0" }}>
                    결제 수단:
                  </p>
                  <p
                    style={{ width: "408px", padding: "5px 10px" }}
                    className={UserInfoCSS.txt}
                  >
                    {" "}
                    {paymentDetail?.paymentMethod === "BANK_TRANSFER"
                      ? "무통장입금"
                      : paymentDetail?.paymentMethod === "EASY_PAY"
                      ? "간편결제"
                      : paymentDetail?.paymentMethod === "CARD"
                      ? "신용카드"
                      : paymentDetail?.paymentMethod === "TRANSFER"
                      ? "실시간 계좌이체"
                      : ""}
                  </p>
                </div>

                <div className={UserInfoCSS.info}>
                  <p style={{ width: "75px", padding: "5px 0 0 0" }}>
                    총 결제 금액:
                  </p>
                  <p
                    style={{ width: "408px", padding: "5px 10px" }}
                    className={UserInfoCSS.txt}
                  >
                    {" "}
                    {paymentDetail?.amount?.toLocaleString()}원
                  </p>
                </div>

                <div className={UserInfoCSS.info}>
                  <p style={{ width: "75px", padding: "5px 0 0 0" }}>
                    총 배송비:
                  </p>
                  <p
                    style={{ width: "408px", padding: "5px 10px" }}
                    className={UserInfoCSS.txt}
                  >
                    {" "}
                    {orderDetail?.deliveryFee?.toLocaleString()}원
                  </p>
                </div>
              </div>

              <div>
                <div className={UserInfoCSS.info}>
                  <p style={{ width: "75px", padding: "5px 0 0 0" }}>
                    총 포인트 <br />
                    할인:
                  </p>
                  <p
                    style={{ width: "408px", padding: "5px 10px" }}
                    className={UserInfoCSS.txt}
                  >
                    {" "}
                    {orderDetail?.pointDiscount?.toLocaleString()}원
                  </p>
                </div>

                <div className={UserInfoCSS.info}>
                  <p style={{ width: "75px", padding: "5px 0 0 0" }}>
                    총 쿠폰 <br />
                    할인:
                  </p>
                  <p
                    style={{ width: "408px", padding: "5px 10px" }}
                    className={UserInfoCSS.txt}
                  >
                    {" "}
                    {orderDetail?.couponDiscount
                      ? orderDetail?.couponDiscount.toLocaleString()
                      : 0}
                    원
                  </p>
                </div>

                <div className={UserInfoCSS.info}>
                  <p style={{ width: "75px", padding: "5px 0 0 0" }}>
                    결제 일시:
                  </p>
                  <p
                    style={{ width: "408px", padding: "5px 10px" }}
                    className={UserInfoCSS.txt}
                  >
                    {" "}
                    {paymentDetail?.createdAt
                      ? paymentDetail.createdAt
                          .replace("T", " ")
                          .replace("Z", "") // "T"를 공백으로, "Z"를 제거
                      : "정보 없음"}
                  </p>
                </div>

                <div className={UserInfoCSS.info}>
                  <p style={{ width: "75px", padding: "5px 0 0 0" }}>
                    배송 상태:
                  </p>
                  <p
                    style={{ width: "408px", padding: "5px 10px" }}
                    className={UserInfoCSS.txt}
                  >
                    {" "}
                    {orderDetail?.deliveryStatus === "pending"
                      ? "배송전"
                      : orderDetail?.deliveryStatus === "sent"
                      ? "배송완료"
                      : orderDetail?.deliveryStatus === "canceled"
                      ? "배송취소"
                      : ""}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {orderDetail?.deliveryStatus === "sent" && (
            <div>
              <button onClick="">배송조회</button>
            </div>
          )}
          {orderDetail?.deliveryStatus === "pending" && (
            <div>
              <button
                style={{
                  padding: "5px 10px",
                  border: "1px solid #cf5346",
                  color: "#cf5346",
                  backgroundColor: "#fff",
                  borderRadius: "10px",
                }}
                onClick={() => {
                  onClickCancelOrderHandler(paymentDetail?.orderId);
                }}
              >
                주문 취소
              </button>
              <button
                style={{
                  padding: "5px 10px",
                  border: "1px solid",
                  color: "gray",
                  backgroundColor: "lightgray",
                  borderRadius: "10px",
                  disabled: true,
                }}
              >
                배송조회
              </button>
            </div>
          )}
        </div>
      )}
      <Footer />
    </>
  );
}

export default MyOrderDetail;
