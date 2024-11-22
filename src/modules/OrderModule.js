import { createActions, handleActions } from "redux-actions";

const initialState = {};

export const GET_ORDER_PAGE = 'order/GET_ORDER_PAGE';   // 주문 페이지 정보 조회

const actions = createActions({
    [GET_ORDER_PAGE]: () => {}
});

const orderReducer = handleActions({
    [GET_ORDER_PAGE]: (state, {payload}) => {
        return payload;
    }
}, initialState);

export default orderReducer;

