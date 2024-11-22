import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decodeJwt } from "../../utils/tokenUtils";
import { callOrderPageApi, callInsertOrderApi } from "../../apis/OrderApiCall";
import Postcode from "react-daum-postcode";
import ModalCSS from "../../components/common/Modal.module.css"; // 모달 스타일

function Order() {
    const dispatch = useDispatch();
    const orderData = useSelector((state) => state.orderReducer); // Redux에서 주문 정보 가져오기
    const cartItems = useSelector((state) => state.orderReducer.cartItems); // Redux에서 cartItems 가져오기
    const isLogin = window.localStorage.getItem("accessToken");
    const username = isLogin ? decodeJwt(isLogin).sub : null;
    const formatNumber = (num) => num.toLocaleString("ko-KR");

    const [payRequest, setPayRequest] = useState({
        orderDTO: {
            recipientName: "",
            recipientPhoneNumber: "",
            postalCode: "",
            addressRoad: "",
            addressDetail: "",
            deliveryNote: "",
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
            console.log("callOrderPageApi 실행");
            dispatch(callOrderPageApi({ cartItems, username }));
        } else {
            console.log("장바구니가 비어 있거나 username이 없습니다.");
        }
    }, [cartItems, dispatch, username]);

    // 주소 검색 완료 후 상태 업데이트
    const handleComplete = (data) => {
        console.log(data);
        setPayRequest((prev) => ({
            ...prev,
            orderDTO: {
                ...prev.orderDTO,
                postalCode: data.zonecode,
                addressRoad: `${data.roadAddress}(${data.bname}, ${data.buildingName}}` || ""
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
                    recipientPhoneNumber:
                        orderData.orderDTO.recipientPhoneNumber || "",
                    postalCode: orderData.orderDTO.postalCode || "",
                    addressRoad: orderData.orderDTO.addressRoad || "",
                    addressDetail: orderData.orderDTO.addressDetail || "",
                },
            }));
        }
    }, [orderData]);

    // 입력 필드 상태 업데이트
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPayRequest((prev) => ({
            ...prev,
            orderDTO: {
                ...prev.orderDTO,
                [name]: value,
            },
        }));
    };

    // 결제 및 주문 데이터 전송
    const handlePayment = () => {
        const orderTotalAmount = calculateOrderTotalAmount();
        const deliveryFee = orderData.orderDTO?.deliveryFee || 2500;

        setPayRequest((prev) => ({
            ...prev,
            orderDTO: {
                ...prev.orderDTO,
                orderTotalAmount,
            },
            paymentDTO: {
                ...prev.paymentDTO,
                amount: orderTotalAmount + deliveryFee,
            },
        }));

        // Redux 액션 호출로 서버에 데이터 전송
        dispatch(callInsertOrderApi({ payRequest, username }));
    };

    // 주문 총 금액 계산
    const calculateOrderTotalAmount = () => {
        const { optionIds } = payRequest;
        let total = 0;

        Object.keys(optionIds).forEach((optionId) => {
            const count = optionIds[optionId];
            const pricePerItem = 10000; // 예시로 각 상품 가격을 10,000원으로 설정
            total += count * pricePerItem;
        });

        return total;
    };

    return (
        <div>
            <h1>주문 페이지</h1>
            <br></br>
            <hr style={{ border: "1px solid #000" }} />
            <h3>주문자 정보</h3>
            <br></br>
            <p>{orderData?.userDTO?.userFullName || "이름 없음"}</p>
            <p>{orderData?.userDTO?.userPhone || "전화번호 없음"}</p>
            <p>{orderData?.userDTO?.userEmail || "이메일 없음"}</p>

            <hr style={{ border: "1px solid #000" }} />
            <h3>장바구니 정보</h3>
            <br></br>
            {orderData?.orderPageProductDTOList ? (
                orderData.orderPageProductDTOList.map((item, index) => (
                    <div key={index}>
                        <img src={item.productImg} alt={item.productName}/>
                        <p>{item.productName}</p>
                        <p>총 금액: {formatNumber(item.amount + item.addPrice)}원</p>
                    </div>
                ))
            ) : (
                <p>장바구니가 비어 있습니다.</p>
            )}

            <hr style={{ border: "1px solid #000" }} />
            <h3>배송지 정보</h3>
            <br></br>
            <input
                type="text"
                name="recipientName"
                value={payRequest.orderDTO.recipientName}
                placeholder="받는 사람 이름"
                onChange={handleInputChange}
            />
            <input
                type="text"
                name="recipientPhoneNumber"
                value={payRequest.orderDTO.recipientPhoneNumber}
                placeholder="받는 사람 전화번호"
                onChange={handleInputChange}
            />
            <input
                type="text"
                value={payRequest.orderDTO.postalCode}
                readOnly
                placeholder="우편번호"
            />
            <input
                type="text"
                value={payRequest.orderDTO.addressRoad}
                readOnly
                placeholder="주소를 입력하세요"
            />
            <input
                type="text"
                value={payRequest.orderDTO.addressDetail}
                readOnly
                placeholder="상세주소"
            />
            <button onClick={() => setIsPostcodeOpen(true)}>주소 검색</button>
            {isPostcodeOpen && (
                <div
                    className={ModalCSS.Modal}
                    onClick={() => setIsPostcodeOpen(false)} // 모달 외부 클릭 시 닫기
                >
                    <div
                        className={ModalCSS.ModalContent}
                        onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 시 이벤트 버블링 방지
                    >
                        {/* Daum Postcode */}
                        <Postcode onComplete={handleComplete} />
                    </div>
                </div>
            )}

            <textarea
                name="deliveryNote"
                value={payRequest.orderDTO.deliveryNote}
                placeholder="배송 요청사항"
                onChange={handleInputChange}
            ></textarea>

            <hr style={{ border: "1px solid #000" }} />
            <h3>결제 금액</h3>
            <br></br>
            <p>주문 금액: {orderData.orderDTO?.orderTotalAmount || 0}원</p>
            <p>배송비: {orderData.orderDTO?.deliveryFee || 2500}원</p>
            <p>
                최종 주문 금액:{" "}
                {(orderData.orderDTO?.orderTotalAmount || 0) +
                    (orderData.orderDTO?.deliveryFee || 2500)}
                원
            </p>

            <hr style={{ border: "1px solid #000" }} />
            <h3>결제 정보</h3>
            <br></br>
            <button onClick={handlePayment}>결제하기</button>
        </div>
    );
}

export default Order;
