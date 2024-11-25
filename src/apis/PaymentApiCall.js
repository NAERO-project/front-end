import {
    GET_MYPAGE_PAYMENT_DETAIL,
} from "../modules/PaymentModule.js";

const prefix = `http://${process.env.REACT_APP_RESTAPI_IP}:8080`;

export const callPaymentDetailApi = ({ orderId }) => {
    const requestURL = `${prefix}/api/payment/details/${orderId}`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "*/*",
                Authorization:
                    "Bearer " + window.localStorage.getItem("accessToken"),
            },
        }).then((response) => response.json());

        console.log(
            "[PaymentApiCalls] callMyPagePaymentDetailApi RESULT : ",
            result
        );
        console.log(
            "[PaymentApiCalls] callMyPagePaymentDetailApi RESULT.data : ",
            result.data
        );

        dispatch({ type: GET_MYPAGE_PAYMENT_DETAIL, payload: result.data });
    };
};