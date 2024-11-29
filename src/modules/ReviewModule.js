import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = {};

/* 액션 */
export const GET_REVIEW = 'review/GET_REVIEW';
export const GET_REVIEWS = 'review/GET_REVIEWS';
export const GET_PRODUCT_REVIEWS = 'review/GET_PRODUCT_REVIEWS';
export const POST_REVIEW = 'review/POST_REVIEW';
export const PUT_REVIEW = 'review/PUT_REVIEW';
export const DELETE_REVIEW = 'review/DELETE_REVIEW';

const actions = createActions({
    [GET_REVIEW]: () => {},
    [GET_REVIEWS]: () => {},
    [POST_REVIEW]: () => {},
    [PUT_REVIEW]: () => {},
    [DELETE_REVIEW]: () => {},
    [GET_PRODUCT_REVIEWS]: () => {}
});

/* 리듀서 */
const reviewReducer = handleActions(
    {
        [GET_REVIEW]: (state, { payload }) => ({
            ...state,
            review: payload
        }),
        [GET_REVIEWS]: (state, { payload }) => ({
            ...state,
            reviews: payload
        }),
        [POST_REVIEW]: (state, { payload }) => ({
            ...state,
            postResult: payload
        }),
        [PUT_REVIEW]: (state, { payload }) => ({
            ...state,
            updateResult: payload
        }),
        [DELETE_REVIEW]: (state, { payload }) => ({
            ...state,
            deleteResult: payload
        }),
        [GET_PRODUCT_REVIEWS]: (state, { payload }) => ({
            ...state,
            ProductReview: payload
        })
    },
    initialState
);

export default reviewReducer;
