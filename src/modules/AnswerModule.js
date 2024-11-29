import { createActions, handleActions } from 'redux-actions';

// 초기값
const initialState = {
    questions: [],
    answers: [],
    answersDetail: null,
    pageInfo: { pageEnd: 0 },
};

export const GET_ANSWERS = "GET_ANSWERS";
export const GET_ANSWER_DETAIL = "GET_ANSWER_DETAIL";
export const GET_ALL_QUESTIONS = "GET_ALL_QUESTIONS";
export const POST_ANSWER = "POST_ANSWER";
export const PUT_ANSWER = "PUT_ANSWER";
export const DELETE_ANSWER = "DELETE_ANSWER";

const actions = createActions({
    [GET_ANSWERS]: () => {},
    [GET_ALL_QUESTIONS]: () => {},
    [GET_ANSWER_DETAIL]: () => {},
    [POST_ANSWER]: () => {},
    [PUT_ANSWER]: () => {},
    [DELETE_ANSWER]: () => {},
});

// 리듀서
const answerReducer = handleActions(
    {
        [GET_ANSWERS]: (state, { payload }) => ({
            ...state, // 기존 상태 유지
            answers: payload.data, // answers 필드만 업데이트
            pageInfo: payload.pageInfo, // pageInfo 필드도 필요시 업데이트
        }),
        [GET_ALL_QUESTIONS]: (state, { payload }) => ({
            ...state, // 기존 상태 유지
            questions: payload.data, // questions 필드만 업데이트
            pageInfo: payload.pageInfo, // pageInfo 필드도 필요시 업데이트
        }),

        [GET_ANSWER_DETAIL]: (state, { payload }) => {
            return payload;
        },
        [POST_ANSWER]: (state, { payload }) => {
            return payload;
        },
        [PUT_ANSWER]: (state, { payload }) => {
            return payload;
        },
        [DELETE_ANSWER]: (state, { payload }) => {
            return payload;
        },
    },
    initialState
);

export default answerReducer;
