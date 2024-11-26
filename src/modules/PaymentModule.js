import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const GET_MYPAGE_PAYMENT_DETAIL = 'payment/GET_MYPAGE_PAYMENT_DETAIL';

const actions = createActions({
    [GET_MYPAGE_PAYMENT_DETAIL]: () => {},
});

const paymentReducer = handleActions({
    [GET_MYPAGE_PAYMENT_DETAIL]: (state, {payload}) => {
        return payload
    },
}, initialState);

export default paymentReducer;