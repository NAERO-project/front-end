import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decodeJwt } from "../../utils/tokenUtils";
import { callOrderPageApi, callInsertOrderApi } from "../../apis/OrderApiCall";
import { callUserCouponApi } from "../../apis/CouponApiCall";
import Postcode from "react-daum-postcode";
import ModalCSS from "../../components/common/Modal.module.css"; // 모달 스타일

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
            couponDiscount: 0, // 쿠폰 할인 초기화
            pointDiscount: 0, // 포인트 할인 초기화
        },
        paymentDTO: {
            paymentMethod: "카카오페이",
            amount: 0,
            currency: "KRW",
            paymentStatus: "pending",
        },
        optionIds: {}, // <optionId, 수량>
    });

    const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);

    // 주문 정보를 사전에 로드하여 Redux에 저장
    useEffect(() => {
        if (username && cartItems.length > 0) {
            dispatch(callOrderPageApi({ cartItems, username }));
        }
    }, [cartItems, dispatch, username]);

    // 주소 검색 완료 후 상태 업데이트
    const onChangeAddressHandler = (data) => {
        console.log(data);
        setPayRequest((prev) => ({
            ...prev,
            orderDTO: {
                ...prev.orderDTO,
                postalCode: data.zonecode,
                addressRoad: `${data.roadAddress}(${data.bname}, ${data.buildingName})` || "",
                addressDetail: "",
            },
        }));
        setIsPostcodeOpen(false); // 주소 검색 창 닫기
    };

    // orderData에서 payRequest 초기값 설정
    useEffect(() => {
        if (orderData?.orderDTO) {
            setPayRequest((prev) => ({
                ...prev,
                orderDTO: {
                    ...prev.orderDTO,
                    recipientName: orderData.orderDTO.recipientName || "",
                    recipientPhoneNumber: orderData.orderDTO.recipientPhoneNumber || "",
                    postalCode: orderData.orderDTO.postalCode || "",
                    addressRoad: orderData.orderDTO.addressRoad || "",
                    addressDetail: orderData.orderDTO.addressDetail || "",
                },
            }));
        }
    }, [orderData]);

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

    // 쿠폰 선택 시 적용 가능 여부 확인
    const onChangeCouponHandler = (e) => {
        const selectedCouponId = e.target.value;
        console.log("선택된 쿠폰 ID:", selectedCouponId); // 선택된 쿠폰 ID 확인

        // 쿠폰 배열이 비어있지 않은지 확인
        if (coupon.length === 0) {
            console.error("쿠폰 데이터가 없습니다.");
            return;
        }
        console.log(coupon);

        // selectedCouponId를 숫자로 변환하여 비교
        const selectedCoupon = coupon.find(
            (c) => c.couponId == String(selectedCouponId)
        );

        if (selectedCoupon) {
            console.log("쿠폰 적용 가능함");
            const isApplicable = orderData.orderPageProductDTOList.some(
                (item) => item.producerId === selectedCoupon.producerId
            );

            if (isApplicable) {
                let couponDiscount = 0;
                const orderTotalAmount = calculateOrderTotalAmount(); // 주문 총 금액 계산

                if (selectedCoupon.couponType === "price") {
                    couponDiscount = selectedCoupon.salePrice; // 고정 금액 할인
                } else if (selectedCoupon.couponType === "percent") {
                    const discountAmount = (orderTotalAmount * selectedCoupon.salePrice) / 100;
                    couponDiscount = Math.min(discountAmount, selectedCoupon.maxSalePrice);
                }

                setPayRequest((prev) => ({
                    ...prev,
                    orderDTO: {
                        ...prev.orderDTO,
                        couponId: selectedCouponId, // 쿠폰 ID 저장
                        couponDiscount: couponDiscount, // 할인 금액 저장
                    },
                }));
            } else {
                alert("선택한 쿠폰은 현재 주문 상품에 적용할 수 없습니다.");
            }
        } else {
            alert("선택한 쿠폰이 유효하지 않습니다.");
            setPayRequest((prev) => ({
                ...prev,
                orderDTO: {
                    ...prev.orderDTO,
                    couponId: "", // 쿠폰 ID 초기화
                    couponDiscount: 0, // 할인 금액 초기화
                },
            }));
        }
    };

    // 결제 및 주문 데이터 전송
    const onClickPaymentHandler = () => {
        const orderTotalAmount = calculateOrderTotalAmount();
        const deliveryFee = orderData.orderDTO?.deliveryFee || 0;

        // optionIds를 orderPageProductDTOList의 optionId로 초기화
        const updatedOptionIds = {};
        orderData.orderPageProductDTOList.forEach((item) => {
            updatedOptionIds[item.optionId] = item.count; // optionId와 수량 설정
        });

        setPayRequest((prev) => ({
            ...prev,
            orderDTO: {
                ...prev.orderDTO,
                orderTotalAmount,
            },
            optionIds: updatedOptionIds, // optionIds 업데이트
            paymentDTO: {
                ...prev.paymentDTO,
                amount: orderTotalAmount + deliveryFee,
            },
        }));

        // Redux 액션 호출로 서버에 데이터 전송
        dispatch(callInsertOrderApi({ payRequest, username }));
    };

    // 주문 총 금액 계산
    function calculateOrderTotalAmount() {
        const { orderPageProductDTOList } = orderData;

        console.log(payRequest);
        console.log(orderData);

        // orderPageProductDTOList가 정의되어 있는지 확인
        if (!orderPageProductDTOList || orderPageProductDTOList.length === 0) {
            console.log("orderPageProductDTOList가 비어있습니다.");
            return 0; // 0 반환
        }

        return orderPageProductDTOList.reduce((totalAmount, o) => {
            const count = o.count;
            const pricePerItem = o.amount + (o.addPrice || 0);
            return totalAmount + count * pricePerItem;
        }, 0);
    }

    // 포인트 적용 핸들러
    const onChangePointHandler = (e) => {
        const inputPoint = Number(e.target.value);
        const availablePoint = orderData?.userDTO?.userPoint || 0;
        const validPoint = Math.min(inputPoint, availablePoint);
        setPoint(validPoint);
    };

    // 포인트가 변경될 때마다 payRequest 업데이트
    useEffect(() => {
        setPayRequest((prev) => ({
            ...prev,
            orderDTO: {
                ...prev.orderDTO,
                pointDiscount: point, // point 상태를 pointDiscount에 저장
            },
        }));
    }, [point]); // point가 변경될 때마다 실행

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
                    <p>{formatNumber((item.amount + item.addPrice) * item.count)} 원</p>
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
                <div className={ModalCSS.Modal} onClick={() => setIsPostcodeOpen(false)}>
                    <div className={ModalCSS.ModalContent} onClick={(e) => e.stopPropagation()}>
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
            <p>배송비: +{formatNumber(orderData.orderDTO?.deliveryFee || 0)}원</p>
            <p>쿠폰 할인: -{formatNumber(payRequest.orderDTO.couponDiscount || 0)}원</p>
            <p>포인트 할인: -{formatNumber(payRequest.orderDTO.pointDiscount || 0)}원</p>
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
            />&nbsp; 잔여: {orderData?.userDTO?.userPoint || "0"}P
            <br />
            <hr style={{ border: "1px solid #000" }} />
            <h3>결제 정보</h3>
            <br />
            <button onClick={onClickPaymentHandler}>결제하기</button>
        </div>
    );
}

export default Order;
