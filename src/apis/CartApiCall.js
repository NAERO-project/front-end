import {
    POST_CART
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
			// body: JSON.stringify({
			// 	userId: cartItem.userId,
			// 	count: cartItem.count,
            //     optionId: cartItem.optionId
			// }),
		}).then(response => response.json());
        
		if (result.status === 200) {
            console.log("[CartApiCall] callCartInsertAPI RESULT : ", result);
            dispatch({ type: POST_CART, payload: result.data });
            alert("장바구니에 성공적으로 추가되었습니다!"); // alert 띄우기
		} 
	};
};
