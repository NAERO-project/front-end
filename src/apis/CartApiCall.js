import {
    POST_CART,
    GET_CART,
    DEL_CART,
} from "../modules/CartModule";

const prefix = `http://${process.env.REACT_APP_RESTAPI_IP}:8080`;

export const callCartInsertAPI = ({ cartItem }) => {
	const requestURL = `${prefix}/api/cart/insert`;
    console.log('cartItem에 아무것도 없어..ㅠㅠ', cartItem);

	return async (dispatch, getState) => {
		const result = await fetch(requestURL, {
			method: "POST",
			headers: {
                "Content-Type": "application/json", // JSON 형식으로 설정
				Accept: "*/*",
                Authorization:
					'Bearer ' + window.localStorage.getItem('accessToken')
			},
            body: JSON.stringify(cartItem),
		}).then(response => response.json());
        
		if (result.status === 200) {
            console.log("[CartApiCall] callCartInsertAPI RESULT : ", result);
            dispatch({ type: POST_CART, payload: result.data });
            alert("장바구니에 성공적으로 추가되었습니다!"); // alert 띄우기
		} 
	};
};

export const callCartListApi = ({ username }) => {
	const requestURL = `${prefix}/api/cart/${username}`;

	return async (dispatch, getState) => {
		const result = await fetch(requestURL, {
			method: "GET",
			headers: {
				Accept: "*/*",
                Authorization:
					'Bearer ' + window.localStorage.getItem('accessToken')
			},
		}).then(response => response.json());
        
		if (result.status === 200) {
            console.log("[CartApiCall] callCartListApi RESULT : ", result);
            dispatch({ type: GET_CART, payload: result.data });
		} 
	};
};

export const callCartDeleteAPI = ({ cartIds }) => {
	const requestURL = `${prefix}/api/cart/delete`;

	return async (dispatch, getState) => {
		const result = await fetch(requestURL, {
			method: "DELETE",
			headers: {
                "Content-Type": "application/json",
				Accept: "*/*",
                Authorization:
					'Bearer ' + window.localStorage.getItem('accessToken')
			},
            body: JSON.stringify(cartIds)
		}).then(response => response.json());
        
		if (result.status === 200) {
            console.log("[CartApiCall] callCartDeleteAPI RESULT : ", result);
            dispatch({ type: DEL_CART, payload: result.data });
            alert("장바구니 삭제 완료");
		} 
	};
};

export const callCartUpdateAPI = ({ optionId, count, price, userId, cartId }) => {
    const requestURL = `${prefix}/api/cart/update`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Accept: "*/*",
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken')
            },
            body: JSON.stringify({ optionId, count, price, cartId }) // CartDTO에 맞게 데이터 전송
        }).then(response => response.json());

        if (result.status === 200) {
            console.log("[CartApiCall] callCartUpdateAPI RESULT : ", result);
        }
    };
};