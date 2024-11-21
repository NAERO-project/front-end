import {
    GET_ORDER_PAGE
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