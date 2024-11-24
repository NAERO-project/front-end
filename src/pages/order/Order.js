import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decodeJwt } from "../../utils/tokenUtils";
import { callOrderPageApi, callInsertOrderApi } from "../../apis/OrderApiCall";
import { callUserCouponApi } from "../../apis/CouponApiCall";
import Postcode from "react-daum-postcode";
import ModalCSS from "../../components/common/Modal.module.css"; // 모달 스타일
import * as PortOne from "@portone/browser-sdk/v2";

function Order() {
    const dispatch = useDispatch();
    const orderData = useSelector((state) => state.orderReducer);
    const couponData = useSelector((state) => state.couponReducer);
    const cartItems = useSelector((state) => state.orderReducer.cartItems);
    const isLogin = window.localStorage.getItem("accessToken");
    const username = isLogin ? decodeJwt(isLogin).sub : null;
    const formatNumber = (num) => num.toLocaleString("ko-KR");

    const [point, setPoint] = useState(0);
    const [coupon, setCoupon] = useState([]);
    const [payRequest, setPayRequest] = useState({
        orderDTO: {
            recipientName: "",
            recipientPhoneNumber: "",
            postalCode: "",
            addressRoad: "",
            addressDetail: "",
            deliveryNote: "",
            couponId: "",
            couponDiscount: 0,
            pointDiscount: 0,
            deliveryStatus: "pending",
            orderStatus: "pending",
            orderTotalAmount: 0,
            orderTotalCount: 0,
            deliveryFee: 0,
        },
        paymentDTO: {
            paymentMethod: "",
            amount: 0,
            currency: "KRW",
            paymentStatus: "pending",
            impUid: "",
            merchantUid: "",
            transactionId: "",
        },
        optionIds: {},
    });

    const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);

    // 주문 총 금액 계산
    const calculateOrderTotalAmount = useCallback(() => {
        const { orderPageProductDTOList } = orderData;
        if (!orderPageProductDTOList || orderPageProductDTOList.length === 0) {
            return 0;
        }
        return orderPageProductDTOList.reduce((total, item) => {
            return total + item.count * (item.amount + (item.addPrice || 0));
        }, 0);
    }, [orderData]);

    // Redux 데이터 로드
    useEffect(() => {
        if (username && cartItems.length > 0) {
            dispatch(callOrderPageApi({ cartItems, username }));
        }
    }, [cartItems, dispatch, username]);

    // payRequest 초기화 및 업데이트
    useEffect(() => {
        if (orderData?.orderDTO) {
            const orderTotalAmount = calculateOrderTotalAmount();
            setPayRequest((prev) => ({
                ...prev,
                orderDTO: {
                    ...prev.orderDTO,
                    ...orderData.orderDTO,
                    deliveryStatus: "pending",
                    orderStatus: "pending",
                    orderTotalAmount,
                },
                paymentDTO: {
                    ...prev.paymentDTO,
                    amount: orderTotalAmount,
                },
            }));
        }
    }, [orderData, calculateOrderTotalAmount]);

    // 쿠폰 데이터 설정
    useEffect(() => {
        if (username) {
            dispatch(callUserCouponApi({ username }));
        }
    }, [username, dispatch]);

    useEffect(() => {
        if (couponData) {
            setCoupon(couponData);
        }
    }, [couponData]);

    // 주소 검색 완료 후 상태 업데이트
    const onChangeAddressHandler = (data) => {
        setPayRequest((prev) => ({
            ...prev,
            orderDTO: {
                ...prev.orderDTO,
                postalCode: data.zonecode,
                addressRoad:
                    `${data.roadAddress}(${data.bname}, ${data.buildingName})` ||
                    "",
                addressDetail: "",
            },
        }));
        setIsPostcodeOpen(false); // 주소 검색 창 닫기
    };

    // 입력 필드 상태 업데이트
    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setPayRequest((prev) => ({
            ...prev,
            orderDTO: {
                ...prev.orderDTO,
                [name]: value,
            },
        }));
    };

    // 쿠폰 선택 핸들러
    const onChangeCouponHandler = (e) => {
        const selectedCouponId = e.target.value;
        const selectedCoupon = coupon.find(
            (c) => c.couponId === selectedCouponId
        );
        if (!selectedCoupon) {
            alert("잘못된 쿠폰입니다.");
            return;
        }

        const discountAmount =
            selectedCoupon.couponType === "percent"
                ? Math.min(
                      calculateOrderTotalAmount() *
                          (selectedCoupon.salePrice / 100),
                      selectedCoupon.maxSalePrice
                  )
                : selectedCoupon.salePrice;

        setPayRequest((prev) => ({
            ...prev,
            orderDTO: {
                ...prev.orderDTO,
                couponId: selectedCouponId,
                couponDiscount: discountAmount,
            },
        }));
    };

    // 포인트 적용 핸들러
    const onChangePointHandler = (e) => {
        const inputPoint = Math.min(
            Number(e.target.value),
            orderData?.userDTO?.userPoint || 0
        );
        setPoint(inputPoint);
        setPayRequest((prev) => ({
            ...prev,
            orderDTO: {
                ...prev.orderDTO,
                pointDiscount: inputPoint,
            },
        }));
    };

    useEffect(() => {
        if (orderData?.orderPageProductDTOList) {
            const updatedOptionIds = {};
            orderData.orderPageProductDTOList.forEach((item) => {
                updatedOptionIds[item.optionId] = item.count; // optionId와 수량 설정
            });

            setPayRequest((prev) => ({
                ...prev,
                optionIds: updatedOptionIds, // optionIds 업데이트
            }));
        }
    }, [orderData?.orderPageProductDTOList]);

    const paymentProviders = {
        KAKAOPAY: {
            storeId: "store-83b99bc8-449f-47f1-84f3-2c6a3ff42d0a",
            channelKey: "channel-key-e6a5937e-0f6b-422a-8748-c1f5f9c509f3",
        },
        NICE: {
            storeId: "store-83b99bc8-449f-47f1-84f3-2c6a3ff42d0a",
            channelKey: "channel-key-f319586f-8110-4c7c-8a71-f4a7e8adb6ad",
        },
        TOSS: {
            storeId: "store-83b99bc8-449f-47f1-84f3-2c6a3ff42d0a",
            channelKey: "channel-key-a1486b37-abc8-4deb-af8a-7ce531cc3b3a",
        },
        KG_INICIS: {
            storeId: "store-83b99bc8-449f-47f1-84f3-2c6a3ff42d0a",
            channelKey: "channel-key-5feab618-65b4-4f5f-9368-455c3acb6196",
        },
    };

    const paymentMethodMapping = {
        KAKAOPAY: "EASY_PAY", // 카카오페이는 EASY_PAY로 매핑
        NICE: "CARD", // NICE Payments는 CARD로 매핑
        TOSS: "EASY_PAY", // Toss Payments는 EASY_PAY로 매핑
        KG_INICIS: "CARD", // KG Inicis는 CARD로 매핑
    };

    // 결제 및 주문 데이터 전송
    const onClickPaymentHandler = async () => {
        const orderTotalAmount =
            calculateOrderTotalAmount() +
            (orderData.orderDTO?.deliveryFee || 0) -
            (payRequest.orderDTO.couponDiscount || 0);

        const updatedPayRequest = {
            ...payRequest,
            orderDTO: {
                ...payRequest.orderDTO,
                orderTotalAmount,
                orderTotalCount: orderData?.orderDTO.orderTotalCount || 1,
            },
            paymentDTO: {
                ...payRequest.paymentDTO,
                amount: orderTotalAmount,
            },
        };

        const payMethod = updatedPayRequest.paymentDTO.paymentMethod;
        const easyPayProvider = updatedPayRequest.paymentDTO.easyPayProvider;

        // 간편결제 방식의 필수 제공자 검증
        if (payMethod === "EASY_PAY" && !easyPayProvider) {
            alert("간편결제 제공자를 선택해주세요.");
            return;
        }

        try {
            const response = await PortOne.requestPayment({
                storeId: "store-83b99bc8-449f-47f1-84f3-2c6a3ff42d0a",
                channelKey: "channel-key-f319586f-8110-4c7c-8a71-f4a7e8adb6ad",
                paymentId: `payment-${new Date().getTime()}`,
                orderName: "테스트 결제",
                totalAmount: updatedPayRequest.orderDTO.orderTotalAmount,
                currency: "KRW",
                payMethod,
                easyPayProvider:
                    payMethod === "EASY_PAY" ? easyPayProvider : undefined,
                isTestMode: true,
            });

            if (response.transactionType === "PAYMENT") {
                updatedPayRequest.paymentDTO.impUid = response.paymentId;
                updatedPayRequest.paymentDTO.transactionId = response.txId;
                dispatch(
                    callInsertOrderApi({
                        payRequest: updatedPayRequest,
                        username,
                    })
                );
                alert("결제가 성공적으로 완료되었습니다.");
            } else {
                alert("결제에 실패했습니다.");
            }
        } catch (error) {
            console.error("결제 오류:", error);
            alert("결제 요청 중 오류가 발생했습니다.");
        }
    };

    return (
        <div>
            <h1>주문 페이지</h1>
            <br />
            <hr style={{ border: "1px solid #000" }} />
            <h3>주문자 정보</h3>
            <br />
            <p>{orderData?.userDTO?.userFullName || "이름 없음"}</p>
            <p>{orderData?.userDTO?.userPhone || "전화번호 없음"}</p>
            <p>{orderData?.userDTO?.userEmail || "이메일 없음"}</p>
            <hr style={{ border: "1px solid #000" }} />
            <h3>주문 상품 정보</h3>
            {orderData?.orderPageProductDTOList?.map((item, index) => (
                <div key={index}>
                    <img src={item.productImg} alt={item.productName} />
                    <p>{item.productName}</p>
                    <p>구매수량: {item.count}</p>
                    <p>
                        {formatNumber(
                            (item.amount + item.addPrice) * item.count
                        )}{" "}
                        원
                    </p>
                </div>
            ))}
            <hr />
            <h3>배송지 정보</h3>
            <br />
            <input
                type="text"
                name="recipientName"
                value={payRequest.orderDTO.recipientName}
                placeholder="받는 사람 이름"
                onChange={onChangeHandler}
            />
            <br />
            <input
                type="text"
                name="recipientPhoneNumber"
                value={payRequest.orderDTO.recipientPhoneNumber}
                placeholder="받는 사람 전화번호"
                onChange={onChangeHandler}
            />
            <br />
            <input
                type="text"
                value={payRequest.orderDTO.postalCode}
                readOnly
                placeholder="우편번호"
            />
            <button onClick={() => setIsPostcodeOpen(true)}>주소 검색</button>
            <br />
            <input
                type="text"
                value={payRequest.orderDTO.addressRoad}
                readOnly
                placeholder="주소를 입력하세요"
            />
            <br />
            <input
                type="text"
                value={payRequest.orderDTO.addressDetail}
                readOnly
                placeholder="상세주소"
            />
            {isPostcodeOpen && (
                <div
                    className={ModalCSS.Modal}
                    onClick={() => setIsPostcodeOpen(false)}
                >
                    <div
                        className={ModalCSS.ModalContent}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Postcode onComplete={onChangeAddressHandler} />
                    </div>
                </div>
            )}
            <br />
            <textarea
                name="deliveryNote"
                value={payRequest.orderDTO.deliveryNote}
                placeholder="배송 요청사항"
                onChange={onChangeHandler}
            ></textarea>
            <hr style={{ border: "1px solid #000" }} />
            <h3>결제 금액</h3>
            <br />
            <p>주문 금액: {formatNumber(calculateOrderTotalAmount())}원</p>
            <p>
                배송비: +{formatNumber(orderData.orderDTO?.deliveryFee || 0)}원
            </p>
            <p>
                쿠폰 할인: -
                {formatNumber(payRequest.orderDTO.couponDiscount || 0)}원
            </p>
            <p>
                포인트 할인: -
                {formatNumber(payRequest.orderDTO.pointDiscount || 0)}원
            </p>
            <p>
                최종 주문 금액:{" "}
                {formatNumber(
                    calculateOrderTotalAmount() +
                        (orderData.orderDTO?.deliveryFee || 0) -
                        (payRequest.orderDTO.couponDiscount || 0)
                )}{" "}
                원
            </p>
            <hr style={{ border: "1px solid #000" }} />
            <h3>할인 정보</h3>
            <br />
            <label>쿠폰 적용</label>&nbsp;&nbsp;&nbsp;&nbsp;
            <select
                value={payRequest.orderDTO.couponId || ""} // 선택한 쿠폰 ID 관리
                onChange={onChangeCouponHandler} // 쿠폰 선택 시 처리
            >
                <option value="">적용할 쿠폰 선택</option>
                {coupon.map((c) => (
                    <option key={c.couponId} value={c.couponId}>
                        {c.couponName}
                    </option>
                ))}
            </select>
            <br />
            <label>포인트 적용</label>&nbsp;&nbsp;&nbsp;&nbsp;
            <input
                type="number"
                value={point}
                onChange={onChangePointHandler} // 수정된 핸들러 사용
                min="1"
            />
            &nbsp; 잔여: {orderData?.userDTO?.userPoint || "0"}P
            <br />
            <hr style={{ border: "1px solid #000" }} />
            <h3>결제 정보</h3>
            <label>결제 수단 선택</label>
<select
    value={payRequest.paymentDTO.paymentMethod}
    onChange={(e) => {
        setPayRequest((prev) => ({
            ...prev,
            paymentDTO: {
                ...prev.paymentDTO,
                paymentMethod: e.target.value,
                easyPayProvider: e.target.value === "EASY_PAY" ? "" : prev.paymentDTO.easyPayProvider, // 간편결제 선택 시 초기화
            },
        }));
    }}
>
    <option value="">결제 수단 선택</option>
    <option value="CARD">신용카드</option>
    <option value="TRANSFER">실시간 계좌이체</option>
    <option value="VIRTUAL_ACCOUNT">가상계좌</option>
    <option value="EASY_PAY">간편결제</option>
</select>

{/* 간편결제를 선택한 경우 제공자 선택 */}
{payRequest.paymentDTO.paymentMethod === "EASY_PAY" && (
    <div>
        <label>간편결제 제공자 선택</label>
        <select
            value={payRequest.paymentDTO.easyPayProvider}
            onChange={(e) => {
                setPayRequest((prev) => ({
                    ...prev,
                    paymentDTO: {
                        ...prev.paymentDTO,
                        easyPayProvider: e.target.value,
                        easyPayMethod: "", // 결제 방식 초기화
                    },
                }));
            }}
        >
            <option value="">간편결제 제공자 선택</option>
            <option value="KAKAOPAY">카카오페이</option>
            <option value="NAVERPAY">네이버페이</option>
            <option value="SSGPAY">SSG페이</option>
        </select>
    </div>
)}

{/* 네이버페이 또는 SSG페이를 선택한 경우 결제 방식 선택 */}
{payRequest.paymentDTO.easyPayProvider === "NAVERPAY" && (
    <div>
        <label>네이버페이 결제 방식</label>
        <select
            value={payRequest.paymentDTO.easyPayMethod}
            onChange={(e) => {
                setPayRequest((prev) => ({
                    ...prev,
                    paymentDTO: {
                        ...prev.paymentDTO,
                        easyPayMethod: e.target.value,
                    },
                }));
            }}
        >
            <option value="">결제 방식 선택</option>
            <option value="CARD">카드 결제</option>
            <option value="CHARGE">포인트/머니 결제</option>
        </select>
    </div>
)}

{payRequest.paymentDTO.easyPayProvider === "SSGPAY" && (
    <div>
        <label>SSG페이 결제 방식</label>
        <select
            value={payRequest.paymentDTO.easyPayMethod}
            onChange={(e) => {
                setPayRequest((prev) => ({
                    ...prev,
                    paymentDTO: {
                        ...prev.paymentDTO,
                        easyPayMethod: e.target.value,
                    },
                }));
            }}
        >
            <option value="">결제 방식 선택</option>
            <option value="TRANSFER">계좌 결제</option>
        </select>
    </div>
)}
            <br />
            <button onClick={onClickPaymentHandler}>결제하기</button>
        </div>
    );
}

export default Order;
