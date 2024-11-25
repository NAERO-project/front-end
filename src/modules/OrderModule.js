import { createActions, handleActions } from "redux-actions";

const initialState = {
    cartItems: [],
    products: []
};

export const GET_ORDER_PAGE = "order/GET_ORDER_PAGE";   // 주문 화면
export const POST_ORDER = "order/POST_ORDER";
export const SET_CART_ITEMS = "order/SET_CART_ITEMS";   // 장바구니에 상품 담기
export const GET_MYPAGE_ORDERLIST = "order/GET_MYPAGE_ORDERLIST";   // 마이페이지 주문 내역
export const GET_MYPAGE_ORDER_PRODUCT_LIST = "order/GET_MYPAGE_ORDER_PRODUCT_LIST"; // 주문 내역 내 주문 상품 리스트
export const GET_PRODUCER_ORDER_LIST = "order/GET_PRODUCER_ORDER_LIST"; // 주문 내역 내 주문 상품 리스트

const actions = createActions({
    [GET_ORDER_PAGE]: () => {},
    [POST_ORDER]: () => {},
    [SET_CART_ITEMS]: () => {},
    [GET_MYPAGE_ORDERLIST]: () => {},
    [GET_MYPAGE_ORDER_PRODUCT_LIST]: () => {},
    [GET_PRODUCER_ORDER_LIST]: () => {},
});

const orderReducer = handleActions(
    {
        [GET_ORDER_PAGE]: (state, { payload }) => {
            return { ...state, ...payload };
        },
        [POST_ORDER]: (state, { payload }) => {
            return { ...state, ...payload };
        },
        [GET_MYPAGE_ORDERLIST]: (state, { payload }) => {
            return { ...state, ...payload };
        },
        [GET_PRODUCER_ORDER_LIST]: (state, { payload }) => {
            return { ...state, ...payload };
        },
        [GET_MYPAGE_ORDER_PRODUCT_LIST]: (state, { payload }) => {
            return { ...state, products: payload };
        },
        [SET_CART_ITEMS]: (state, { payload }) => {
            return { ...state, cartItems: payload };
        },
    },
    initialState
);

export default orderReducer;
