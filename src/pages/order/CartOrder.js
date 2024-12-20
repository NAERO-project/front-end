import React, { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { decodeJwt } from "../../utils/tokenUtils";
import { callInsertOrderApi , callCartOrderAPI, callOrderPageApi } from "../../apis/OrderApiCall";
import { callUserCouponApi } from "../../apis/CouponApiCall";
import { callCartDeleteAPI } from "../../apis/CartApiCall";
import Postcode from "react-daum-postcode";
import ModalCSS from "../../components/common/Modal.module.css"; // 모달 스타일
import * as PortOne from "@portone/browser-sdk/v2"; // 결제 API

import CartOrderCSS from "./css/CartOrder.module.css";
import UserInfoCSS from "../../components/signup/css/UserInfoForm.module.css";
import Footer from "../../components/common/Footer";

function CartOrder() {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const orderData = useSelector((state) => state.orderReducer);
    const couponData = useSelector((state) => state.couponReducer);
    const { cartItems } = location.state || {}; // 상태에서 cartItems 가져오기
    const isLogin = window.localStorage.getItem("accessToken");
    const username = isLogin ? decodeJwt(isLogin).sub : null;

    const [point, setPoint] = useState(0);
    const [userPoint, setUserPoint] = useState(0);
    const [coupon, setCoupon] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState(""); // 결제 수단 상태
    const [easyPayProvider, setEasyPayProvider] = useState(""); // 간편 결제 제공자 상태
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

    // 금액 포매팅 함수
    const formatNumber = (num) => num.toLocaleString("ko-KR");

    // 주문 총 금액 계산
    const calculateOrderTotalAmount = useCallback(() => {
        const { orderPageProductDTOList } = orderData;
        if (!orderPageProductDTOList || orderPageProductDTOList.length === 0) {
            return 0;
        }
        return orderPageProductDTOList.reduce(
            (total, item) => total + item.count * (item.amount + (item.addPrice || 0)),
            0
        );
    }, [orderData]);

    // Redux 데이터 로드
    useEffect(() => {
        console.log('cartItems 뭔데???', cartItems);
        if (username && cartItems) {
            dispatch(callCartOrderAPI({ cartItems: cartItems, username }));
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
                    orderStatus: prev.orderDTO.orderStatus || "pending", // 초기값 설정
                    deliveryStatus: prev.orderDTO.deliveryStatus || "pending", // 기본값 설정
                    orderTotalAmount,
                },
                paymentDTO: {
                    ...prev.paymentDTO,
                    amount: orderTotalAmount,
                },
            }));
            const addPoint =  (calculateOrderTotalAmount() +
            (orderData.orderDTO?.deliveryFee || 0) -
            (parseInt(payRequest.orderDTO.couponDiscount, 10) || 0)) * 0.01;
            console.log("addPoint", addPoint);
            setUserPoint(addPoint);
            // setPoint(addPoint);
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
                addressRoad: `${data.roadAddress}(${data.bname}, ${data.buildingName})` || "",
                addressDetail: "",
            },
        }));
        setIsPostcodeOpen(false);
    };

    // 입력 필드 상태 업데이트
    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setPayRequest((prev) => ({
            ...prev,
            orderDTO: {
                ...prev.orderDTO, // 기존 필드 유지
                [name]: value, // 입력 필드 업데이트
            },
        }));
    };

    // 쿠폰 선택 핸들러
    const onChangeCouponHandler = (e) => {
        const selectedCouponId = e.target.value;
        const selectedCoupon = coupon.find((c) => c.couponId === selectedCouponId);
        if (!selectedCoupon) {
            alert("현재 주문건에 사용 불가한 쿠폰입니다.");
            return;
        }

        const discountAmount =
            selectedCoupon.couponType === "percent"
                ? Math.min(
                      calculateOrderTotalAmount() * (selectedCoupon.salePrice / 100),
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

    // 결제 수단 변경 핸들러
    const handlePaymentMethodChange = (method) => {
        setPaymentMethod(method);
        setPayRequest((prev) => ({
            ...prev,
            paymentDTO: {
                ...prev.paymentDTO,
                paymentMethod: method,
            },
        }));

        // if (method !== "BANK_TRANSFER") {
        //     setAccountInfo("");
        //     setDepositorName("");
        // }
    };

    // 간편 결제 선택 핸들러
    const handleEasyPay = (provider) => {
        setEasyPayProvider(provider);
        setPayRequest((prev) => ({
            ...prev,
            paymentDTO: {
                ...prev.paymentDTO,
                easyPayProvider: provider,
            },
        }));
    };

    // 결제 및 주문 데이터 전송
    const onClickPaymentHandler = async () => {
        // 주소 입력 확인
        if (!payRequest.orderDTO.postalCode || !payRequest.orderDTO.addressRoad) {
            alert("결제 전 주소를 입력해주세요.");
            return;
        }

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

        const { paymentMethod: payMethod, easyPayProvider } = updatedPayRequest.paymentDTO;

        if (!payMethod) {
            alert("결제 수단을 선택해주세요.");
            return;
        }

        if (payMethod === "BANK_TRANSFER") {
            dispatch(
                callInsertOrderApi({
                    payRequest: updatedPayRequest,
                    username,
                    navigate
                })
            );

            // 결제 성공 후 장바구니에서 아이템 삭제
            const cartIdsToDelete = cartItems.map(item => item.cartId);
            await dispatch(callCartDeleteAPI({ cartIds: cartIdsToDelete }));

            return;
        }

        try {
            const response = await PortOne.requestPayment({
                storeId: "store-83b99bc8-449f-47f1-84f3-2c6a3ff42d0a",
                paymentId: `payment-${new Date().getTime()}`,
                orderName: "naero-order",
                totalAmount: updatedPayRequest.orderDTO.orderTotalAmount,
                currency: "KRW",
                channelKey: "channel-key-f319586f-8110-4c7c-8a71-f4a7e8adb6ad",
                payMethod,
                isTestMode: true,
            });

            // 성공한 경우 처리
        if (response.transactionType === "PAYMENT" && response.code !== "FAILURE_TYPE_PG") {
            console.log("결제 성공:", response);
            updatedPayRequest.paymentDTO.impUid = response.paymentId;
            updatedPayRequest.paymentDTO.transactionId = response.txId;

            await dispatch(
                callInsertOrderApi({
                    payRequest: updatedPayRequest,
                    username,
                    navigate
                })
            );

            // 결제 성공 후 장바구니에서 아이템 삭제
            const cartIdsToDelete = cartItems.map(item => item.cartId);
            await dispatch(callCartDeleteAPI({ cartIds: cartIdsToDelete }));

        } else {
            // 실패한 경우 처리
            console.error("결제 실패 또는 창 닫힘:", response);
            if (response.code === "FAILURE_TYPE_PG") {
                alert("결제가 취소되었습니다.");
            } else {
                alert("결제 실패: " + (response.message || "알 수 없는 오류"));
            }
        }
    } catch (error) {
        console.error("간편 결제 오류:", error);
        alert("간편 결제 요청 중 오류가 발생했습니다.");
    }
    };

    const formattedCustomerIdentifier = (() => {
        const rawPhone = orderData?.userDTO?.userPhone || "";
        const sanitizedPhone = rawPhone.replace(/-/g, "").trim(); // 하이픈 제거 및 공백 제거
    
        // 10~11자리 숫자인지 확인
        if (/^\d{10,11}$/.test(sanitizedPhone)) {
            return sanitizedPhone;
        } else {
            return "01000000000"; // 기본값 설정
        }
    })();

    // 간편 결제 진행 함수
const processEasyPay = async (provider) => {

    // 주소 입력 확인
    if (!payRequest.orderDTO.postalCode || !payRequest.orderDTO.addressRoad) {
        alert("결제 전 주소를 입력해주세요.");
        return;
    }

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
            paymentMethod: "EASY_PAY",
        },
    };

    try {
        const response = await PortOne.requestPayment({
            storeId: "store-83b99bc8-449f-47f1-84f3-2c6a3ff42d0a",
            paymentId: `payment-${new Date().getTime()}`,
            orderName: "naero-order",
            totalAmount: updatedPayRequest.orderDTO.orderTotalAmount,
            currency: "KRW",
            channelKey: "channel-key-f319586f-8110-4c7c-8a71-f4a7e8adb6ad",
            payMethod: "EASY_PAY",
            easyPay: {
                easyPayProvider: provider,
                availablePayMethods: provider === "NAVERPAY" ? ["CHARGE"] : undefined,
                cashReceiptType: "PERSONAL", // 현금영수증 발급 유형 추가
                customerIdentifier: formattedCustomerIdentifier, // 고객 식별자 (전화번호)
            },
            receipt_url: `${window.location.origin}/products`,
            isTestMode: true,
        });

       // 성공한 경우 처리
       if (response.transactionType === "PAYMENT" && response.code !== "FAILURE_TYPE_PG") {
        console.log("결제 성공:", response);
        updatedPayRequest.paymentDTO.impUid = response.paymentId;
        updatedPayRequest.paymentDTO.transactionId = response.txId;

        dispatch(
            callInsertOrderApi({
                payRequest: updatedPayRequest,
                username,
                navigate
            })
        );

    } else {
        // 실패한 경우 처리
        console.error("결제 실패 또는 창 닫힘:", response);
        if (response.code === "FAILURE_TYPE_PG") {
            alert("결제가 취소되었습니다.");
        } else {
            alert("결제 실패: " + (response.message || "알 수 없는 오류"));
        }
    }
} catch (error) {
    console.error("간편 결제 오류:", error);
    alert("간편 결제 요청 중 오류가 발생했습니다.");
}
};

    // 버튼 클릭 이벤트
    const handleEasyPayClick = (provider) => {
        processEasyPay(provider);
    };

    return (
        <>
            <div className={CartOrderCSS.cart_box}>
                <h1>주문 페이지</h1>
                <hr style={{border: '1px soled #626E53', margin: '50px 0 30px 0'}}/>

                <div>
                    <h3>주문자 정보</h3>

                    <div className={UserInfoCSS.info}>
                        <p style={{width: '75px', padding: '5px 0 0 0'}}>이름 :</p>
                        <p style={{width: '408px', padding: '5px 10px'}} className={UserInfoCSS.txt}>{orderData?.userDTO?.userFullName || "이름 없음"}</p>
                    </div>

                    <div className={UserInfoCSS.info}>
                        <p style={{width: '75px', padding: '5px 0 0 0'}}>전화번호 :</p>
                        <p style={{width: '408px', padding: '5px 10px'}} className={UserInfoCSS.txt}>{orderData?.userDTO?.userPhone || "전화번호 없음"}</p>
                    </div>

                    <div className={UserInfoCSS.info}>
                        <p style={{width: '75px', padding: '5px 0 0 0'}}>이메일 :</p>
                        <p style={{width: '408px', padding: '5px 10px'}} className={UserInfoCSS.txt}>{orderData?.userDTO?.userEmail || "이메일 없음"}</p>
                    </div>
                </div>

            
                {/* <hr style={{border: '1px soled #626E53', margin: '50px 0 30px 0'}}/> */}
                <h3 style={{margin: '40px 0 30px 0'}}>주문 상품 정보</h3>

                {orderData?.orderPageProductDTOList?.map((item, index) => (
                    <div className={CartOrderCSS.product} key={index}>
                        <div className={CartOrderCSS.product_img}>
                            <img src={item.productImg} alt={item.productName} />
                        </div>
                        
                        <div className={CartOrderCSS.product_txt}>
                            <p>{item.productName}</p>
                            <p>구매수량: {item.count}</p>
                            <p>
                                {formatNumber(
                                    (item.amount + item.addPrice) * item.count
                                )}{" "}
                                원
                            </p> 
                        </div> 
                        
                    </div>
                ))}
            
                <hr style={{border: '1px soled #626E53', margin: '50px 0 30px 0'}}/>
                
                <h3>배송지 정보</h3>

                <div style={{margin: '0 0 20px 0'}}>
                    <label style={{width: '75px', padding: '5px 0 0 0'}}>이름 :</label>
                    <input
                        style={{width: '408px', padding: '5px 10px', margin: '0 30px 0 0'}} 
                        className={UserInfoCSS.txt}
                        type="text"
                        name="recipientName"
                        value={payRequest.orderDTO.recipientName}
                        placeholder="받는 사람 이름"
                        onChange={onChangeHandler}
                    />
                </div>

                <div style={{margin: '0 0 20px 0'}}>
                    <label style={{width: '75px', padding: '5px 0 0 0'}}>전화번호 :</label>
                    <input
                        style={{width: '408px', padding: '5px 10px', margin: '0 30px 0 0'}} 
                        className={UserInfoCSS.txt}
                        type="text"
                        name="recipientPhoneNumber"
                        value={payRequest.orderDTO.recipientPhoneNumber}
                        placeholder="받는 사람 전화번호"
                        onChange={onChangeHandler}
                    />
                </div>
                
                <div style={{margin: '0 0 20px 0'}}>
                <label style={{width: '75px', padding: '5px 0 0 0'}}>우편번호 :</label>
                    <input
                        style={{width: '408px', padding: '5px 10px', margin: '0 30px 0 0'}} 
                        className={UserInfoCSS.txt}
                        type="text"
                        value={payRequest.orderDTO.postalCode}
                        readOnly
                        placeholder="우편번호"
                    />
                    <button className={CartOrderCSS.post_btn} onClick={() => setIsPostcodeOpen(true)}>주소 검색</button>
                </div>
                
                
                <label style={{width: '75px', padding: '5px 0 0 0'}}>도로명 :</label>
                <input
                    style={{width: '408px', padding: '5px 10px', margin: '0 0 20px 0'}} 
                    className={UserInfoCSS.txt}
                    type="text"
                    value={payRequest.orderDTO.addressRoad}
                    readOnly
                    placeholder="주소를 입력하세요"
                />
                <br />
                <label style={{width: '75px', padding: '5px 0 0 0'}}>상세주소 :</label>
                <input
                    style={{width: '408px', padding: '5px 10px', margin: '0 0 20px 0'}} 
                    className={UserInfoCSS.txt}
                    type="text"
                    name="addressDetail"
                    value={payRequest.orderDTO.addressDetail}
                    onChange={onChangeHandler}
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
                    style={{width: '480px', height: '100px', padding: '5px 10px', borderRadius: '10px', border: '1px solid #828282'}} 
                    className={CartOrderCSS.post_txt}
                    name="deliveryNote"
                    value={payRequest.orderDTO.deliveryNote}
                    placeholder="배송 요청사항"
                    onChange={onChangeHandler}
                ></textarea>

                <hr style={{border: '1px soled #626E53', margin: '50px 0 30px 0'}}/>

                <div>
                    <h3>결제 금액</h3>
                    
                    <div className={UserInfoCSS.info}>
                        <p style={{width: '100px', padding: '5px 0 0 0'}}>주문 금액:</p>
                        <p style={{width: '408px', padding: '5px 10px'}} className={UserInfoCSS.txt}>{formatNumber(calculateOrderTotalAmount())}원</p>
                    </div>

                    <div className={UserInfoCSS.info}>
                        <p style={{width: '100px', padding: '5px 0 0 0'}}>배송비:</p>
                        <p style={{width: '408px', padding: '5px 10px'}} className={UserInfoCSS.txt}>+{formatNumber(orderData.orderDTO?.deliveryFee || 0)}원</p>
                    </div>

                    <div className={UserInfoCSS.info}>
                        <p style={{width: '100px', padding: '5px 0 0 0'}}>쿠폰 할인:</p>
                        <p style={{width: '408px', padding: '5px 10px'}} className={UserInfoCSS.txt}>-{formatNumber(payRequest.orderDTO.couponDiscount || 0)}원</p>
                    </div>

                    <div className={UserInfoCSS.info}>
                        <p style={{width: '100px', padding: '5px 0 0 0'}}>포인트 할인:</p>
                        <p style={{width: '408px', padding: '5px 10px'}} className={UserInfoCSS.txt}>-{formatNumber(payRequest.orderDTO.pointDiscount || 0)}원</p>
                    </div>

                    <div className={UserInfoCSS.info}>
                        <p style={{width: '100px', padding: '5px 0 0 0'}}>최종 주문 <br/>금액:</p>
                        <p style={{width: '408px', padding: '5px 10px'}} className={UserInfoCSS.txt}>{formatNumber(
                            calculateOrderTotalAmount() +
                                (orderData.orderDTO?.deliveryFee || 0) -
                                (payRequest.orderDTO.couponDiscount || 0)
                        )}{" "}
                        원</p>
                    </div> 
                </div>

                <hr style={{border: '1px soled #626E53', margin: '50px 0 30px 0'}}/>

                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <div>
                        <h3>할인 정보</h3>
                        <div className={UserInfoCSS.info}>
                            <p style={{width: '75px', padding: '5px 0 0 0'}}>쿠폰 적용</p>
                            <div style={{width: '408px', padding: '5px 10px'}} className={UserInfoCSS.txt}>
                                <select
                                    style={{width: '100%'}}
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
                            </div>
                        </div>
                    
                        <div className={UserInfoCSS.info}>
                            <p style={{width: '75px', padding: '5px 0 0 0'}}>포인트<br/>적용</p>
                            <div>
                                <input
                                className={UserInfoCSS.txt}
                                style={{width: '408px', padding: '5px 10px'}}
                                type="number"
                                value={point}
                                onChange={onChangePointHandler} // 수정된 핸들러 사용
                                min="1"
                                />
                            </div>
                            <p style={{margin: '10px 0 0 10px'}}>잔여: {orderData?.userDTO?.userPoint || "0"}P</p>
                        </div>
                    </div>
                    
                    <div>
                        <h3>결제 정보</h3>
                        <h4>결제 수단 선택</h4>
                        <div>
                            <span>
                                <input 
                                    className={CartOrderCSS.radio}
                                    type="radio"
                                    value="CARD"
                                    checked={paymentMethod === "CARD"}
                                    onChange={() => handlePaymentMethodChange("CARD")}
                                />
                                <label>신용카드</label>
                            </span>
                            <span style={{margin: '0 20px'}}>
                                <input
                                    className={CartOrderCSS.radio}
                                    type="radio"
                                    value="TRANSFER"
                                    checked={paymentMethod === "TRANSFER"}
                                    onChange={() => handlePaymentMethodChange("TRANSFER")}
                                />
                                <label>실시간 계좌이체</label>
                            </span>
                            <span>
                                <input
                                    className={CartOrderCSS.radio}
                                    type="radio"
                                    value="BANK_TRANSFER"
                                    checked={paymentMethod === "BANK_TRANSFER"}
                                    onChange={() => handlePaymentMethodChange("BANK_TRANSFER")}
                                />
                                <label>무통장입금</label>
                            </span>       
                        </div>

                        {/* 무통장입금을 선택한 경우 계좌 정보 및 입금자명 입력 */}
                        {paymentMethod === "BANK_TRANSFER" && (
                            <div>
                                <div className={UserInfoCSS.info}>
                                    <p style={{width: '75px', padding: '5px 0 0 0'}}>입금할 계좌 정보 :</p>
                                    <input
                                    style={{width: '408px', padding: '5px 10px'}} 
                                    className={UserInfoCSS.txt}
                                    type="text"
                                    value="신한은행 100-071-391803 주식회사 네로"
                                    readOnly
                                    />
                                </div>

                                <div className={UserInfoCSS.info}>
                                    <p style={{width: '75px', padding: '5px 0 0 0'}}>입금자명 :</p>
                                    <input
                                    style={{width: '408px', padding: '5px 10px'}} 
                                    className={UserInfoCSS.txt}
                                    type="text"
                                    value={orderData?.userDTO?.userFullName}
                                    readOnly
                                    />
                                </div>
                            </div>
                        )}
                        <div style={{margin: '10px 0 20px 0'}}>{userPoint.toLocaleString()} 환경기여 포인트 적립 예정</div>

                        <button style={{padding: '5px 10px', borderRadius: '10px' , backgroundColor: '#fee500', color: 'rgba(0, 0, 0, 85%)'}} onClick={() => handleEasyPayClick("KAKAOPAY")}>카카오페이</button>
                        <button style={{padding: '5px 10px', margin: '0 20px', borderRadius: '10px', backgroundColor: '#05d686', color: '#fff'}} onClick={() => handleEasyPayClick("NAVERPAY")}>네이버페이</button>
                        <button style={{padding: '5px 10px', borderRadius: '10px', backgroundColor: '#849076', color: '#fff'}} onClick={onClickPaymentHandler}>결제하기</button>
                    </div>
                </div>

                
                
                
            </div>
            <Footer/>
        </>
        


            
            
            
    );
}

export default CartOrder;
