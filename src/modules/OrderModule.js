import { createActions, handleActions } from "redux-actions";

const initialState = {
    products: {},
    producerProducts: [],
};

export const GET_ORDER_PAGE = "order/GET_ORDER_PAGE";   // 주문 화면
export const POST_ORDER = "order/POST_ORDER";
export const GET_MYPAGE_ORDERLIST = "order/GET_MYPAGE_ORDERLIST";   // 마이페이지 주문 내역
export const GET_MYPAGE_ORDER_PRODUCT_LIST = "order/GET_MYPAGE_ORDER_PRODUCT_LIST"; // 주문 내역 내 주문 상품 리스트
export const GET_PRODUCER_ORDER_LIST = "order/GET_PRODUCER_ORDER_LIST"; // 주문 내역 내 주문 상품 리스트
export const GET_PRODUCER_ORDER_PRODUCT_LIST = "order/GET_PRODUCER_ORDER_PRODUCT_LIST"; // 주문 내역의 판매자에게 해당하는 주문 상품 리스트
export const GET_ORDER_DETAILS = "order/GET_ORDER_DETAILS"; // 주문 내역 상세
export const PUT_CANCEL_ORDER = "order/PUT_CANCEL_ORDER"; // 주문 취소

const actions = createActions({
    [GET_ORDER_PAGE]: () => {},
    [POST_ORDER]: () => {},
    [GET_MYPAGE_ORDERLIST]: () => {},
    [GET_MYPAGE_ORDER_PRODUCT_LIST]: () => {},
    [GET_PRODUCER_ORDER_LIST]: () => {},
    [GET_PRODUCER_ORDER_PRODUCT_LIST]: () => {},
    [GET_ORDER_DETAILS]: () => {},
    [PUT_CANCEL_ORDER]: () => {},
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
        [GET_ORDER_DETAILS]: (state, { payload }) => {
            return { ...state, ...payload };
        },
        [PUT_CANCEL_ORDER]: (state, { payload }) => {
            return { ...state, ...payload };
        },
        [GET_MYPAGE_ORDER_PRODUCT_LIST]: (state, { payload }) => {
            return { ...state, products: payload };
        },
        [GET_PRODUCER_ORDER_PRODUCT_LIST]: (state, { payload }) => {
            return { ...state, producerProducts: payload };
        },
    },
    initialState
);

export default orderReducer;
