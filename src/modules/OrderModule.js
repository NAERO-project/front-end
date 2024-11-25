import { createActions, handleActions } from "redux-actions";

const initialState = {
    cartItems: [],
};

export const GET_ORDER_PAGE = "order/GET_ORDER_PAGE";
export const POST_ORDER = "order/POST_ORDER";
export const SET_CART_ITEMS = "order/SET_CART_ITEMS"; // 장바구니 데이터 저장 액션

const actions = createActions({
    [GET_ORDER_PAGE]: () => {},
    [POST_ORDER]: () => {},
    [SET_CART_ITEMS]: () => {},
});

const orderReducer = handleActions(
    {
        [GET_ORDER_PAGE]: (state, { payload }) => {
            return { ...state, ...payload };
        },
        [POST_ORDER]: (state, { payload }) => {
            return { ...state, ...payload };
        },
        [SET_CART_ITEMS]: (state, { payload }) => {
            return { ...state, cartItems: payload };
        },
    },
    initialState
);

export default orderReducer;
