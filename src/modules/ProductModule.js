import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const GET_PRODUCT = 'product/GET_PRODUCT';                                       // 상품 단일 조회
export const GET_PRODUCTS = 'product/GET_PRODUCTS';                                     // 상품 리스트 전체 조회
export const GET_PRODUCTS_PREVIEW = 'product/GET_PRODUCTS_PREVIEW';                     // 전체 상품 미리보기 조회
export const GET_PRODUCTS_PREVIEW_FOOD = 'product/GET_PRODUCTS_PREVIEW_FOOD';           // 전체 상품 음식 미리보기 조회
export const GET_PRODUCTS_PREVIEW_FASHION = 'product/GET_PRODUCTS_PREVIEW_FASHION';     // 전체 상품 패션 미리보기 조회
export const GET_PRODUCTS_PREVIEW_BEAUTY = 'product/GET_PRODUCTS_PREVIEW_BEAUTY';       // 전체 상품 뷰티 미리보기 조회
export const GET_PRODUCTS_PRODUCER_PREVIEW = 'product/GET_PRODUCTS_PRODUCER_PREVIEW';   // 판매자별 상품 미리보기 조회
export const GET_PRODUCTS_PRODUCER = 'product/GET_PRODUCTS_PRODUCER';                   // 판매자별 상품 전체 조회
export const POST_PRODUCTS = 'product/POST_PRODUCTS';                                   // 판매자 상품 등록
export const PUT_PRODUCTS = 'product/PUT_PRODUCTS';                                     // 판매자 상품 수정
export const DELETE_PRODUCTS = 'product/DELETE_PRODUCTS';                               // 판매자 상품 삭제

const actions = createActions({
    [GET_PRODUCT]: () => {},
    [GET_PRODUCTS]: () => {},
    [GET_PRODUCTS_PREVIEW]: () => {},
    [GET_PRODUCTS_PREVIEW_FOOD]: () => {},
    [GET_PRODUCTS_PREVIEW_FASHION]: () => {},
    [GET_PRODUCTS_PREVIEW_BEAUTY]: () => {},
    [GET_PRODUCTS_PRODUCER_PREVIEW]: () => {},
    [GET_PRODUCTS_PRODUCER]: () => {},
    [POST_PRODUCTS]: () => {},
    [PUT_PRODUCTS]: () => {},
    [DELETE_PRODUCTS]: () => {}
});

const productReducer = handleActions({
    [GET_PRODUCT]: (state, {payload}) => {
        return payload
    },
    [GET_PRODUCTS]: (state, {payload}) => {
        return payload
    },
    [GET_PRODUCTS_PREVIEW]: (state, {payload}) => {
        return payload
    },
    [GET_PRODUCTS_PREVIEW_FOOD]: (state, {payload}) => {
        return payload
    },
    [GET_PRODUCTS_PREVIEW_FASHION]: (state, {payload}) => {
        return payload
    },
    [GET_PRODUCTS_PREVIEW_BEAUTY]: (state, {payload}) => {
        return payload
    },
    [GET_PRODUCTS_PRODUCER_PREVIEW]: (state, {payload}) => {
        return payload
    },
    [GET_PRODUCTS_PRODUCER]: (state, {payload}) => {
        return payload
    },
    [POST_PRODUCTS]: (state, {payload}) => {
        return payload
    },
    [PUT_PRODUCTS]: (state, {payload}) => {
        return payload
    },
    [DELETE_PRODUCTS]: (state, {payload}) => {
        return payload
    }
}, initialState);

export default productReducer;

