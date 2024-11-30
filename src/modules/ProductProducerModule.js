import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const GET_PRODUCER_LIST_PREVIEW = 'product/GET_PRODUCER_LIST_PREVIEW';           // 판매자별 조회

const actions = createActions({
    [GET_PRODUCER_LIST_PREVIEW]: () => {},
});

const productProducerReducer = handleActions({
    [GET_PRODUCER_LIST_PREVIEW]: (state, {payload}) => {
        return payload
    },
}, initialState);

export default productProducerReducer;