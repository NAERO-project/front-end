import {
    GET_ORDER_PAGE,
    POST_ORDER
} from '../modules/OrderModule.js';

const prefix = `http://${process.env.REACT_APP_RESTAPI_IP}:8080`;

// 주문페이지 정보 조회
export const callOrderPageApi = ({ cartItems, username }) =>{
    
    let requestURL = `${prefix}/api/order/start?username=${username}`;

    console.log('[OrderApiCalls] requestURL : ', requestURL);

    return async (dispatch, getState) =>{
        const result = await fetch(requestURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*'
            },
            body: JSON.stringify(cartItems)
        }).then((response) => response.json());

        if (result.status === 200) {
            console.log('[OrderApiCalls] callOrderPageApi RESULT : ', result);
            console.log('Result Data:', result.data); // 추가 로그
            dispatch({ type: GET_ORDER_PAGE, payload: result.data });
        } else {
            console.error('API 호출 실패:', result);
        }
    };
};

// 결제
export const callInsertOrderApi = ({ payRequest, username }) =>{
    
    let requestURL = `${prefix}/api/order/process?username=${username}`;

    console.log('[OrderApiCalls] requestURL : ', requestURL);
    console.log('[OrderApiCalls] payRequest : ', payRequest); // payRequest 로그 추가
    console.log("payRequest 데이터:", JSON.stringify(payRequest));

    return async (dispatch, getState) =>{
        const result = await fetch(requestURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*'
            },
            body: JSON.stringify(payRequest)
            // body: JSON.stringify({
			// 	orderTotalAmount: orderTotalAmount,
			// 	orderTotalCount: orderTotalCount,
			// 	deliveryStatus: deliveryStatus,
			// 	orderStatus: orderStatus,
			// 	deliveryFee: deliveryFee,
			// 	pointDiscount: form.pointDiscount,
			// 	couponId: couponId,
            //     couponDiscount: form.couponDiscount,
            //     recipientName: form.recipientName,
            //     recipientPhoneNumber: form.recipientPhoneNumber,
            //     postalCode: form.postalCode,
            //     addressRoad: form.addressRoad,
            //     addresDetail: form.addresDetail,
            //     deliveryNote: form.deliveryNote,
            //     amount: amount,
            //     currency: currency,
            //     paymentMethod: paymentMethod,
            //     paymentStatus: paymentStatus,
            //     impUid: impUid,
            //     merchantUid: merchantUid,
            //     transactionId: transactionId,
            //     receiptUrl: requestURL
            //     // 여기서 "optionIds": {
            //     // "1": 2,
            //     // "2": 3,
            //     // "3": 1 }
            //     // 이 부분을 어떻게 전달하지..
			// })
        }).then((response) => response.json());

        if (result.status === 200) {
            console.log('[OrderApiCalls] callInsertOrderApi RESULT : ', result);
            dispatch({ type: POST_ORDER, payload: result.data });
        } else {
            console.error('API 호출 실패:', result);
        }
    };
};