import {
    GET_QUESTIONS,
    GET_QUESTION_DETAIL,
    POST_QUESTION,
    PUT_QUESTION,
    DELETE_QUESTION,
} from '../modules/QuestionModule.js';

const prefix = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api`;

/* 1:1 문의 전체 조회 */
export const callQuestionListApi = ({ userId, page = 1, size = 10 }) => {
    const requestURL = `${prefix}/questions?userId=${userId}&page=${page}&size=${size}`;

    console.log('[QuestionAPICalls] requestURL: ', requestURL);

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
            },
        }).then((response) => response.json());

        console.log('[QuestionAPICalls] API RESULT: ', result);

        if (result.status === 200) {
            console.log('[QuestionAPICalls] callQuestionListApi RESULT: ', result);
            
            console.log('log1', result.data);
            console.log('log2', result.data.data);
            dispatch({ type: GET_QUESTIONS, payload: result.data });
        }
    };
};

/* 1:1 문의 상세 조회 */
export const callQuestionDetailApi = (questionId, userId) => {
    const requestURL = `${prefix}/questions/${questionId}?userId=${userId}`;

    console.log('[QuestionAPICalls] requestURL: ', requestURL);

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
            },
        }).then((response) => response.json());

        if (result.status === 200) {
            console.log('[QuestionAPICalls] callQuestionDetailApi RESULT: ', result);
            dispatch({ type: GET_QUESTION_DETAIL, payload: result.data });
        } else {
            console.error('Error fetching question detail:', result);
        }
    };
};

/* 1:1 문의 등록 */
export const callQuestionCreateApi = ({ form, userId }) => {
    const requestURL = `${prefix}/questions`;

    console.log('[QuestionAPICalls] callQuestionCreateApi Call');
    console.log('[QuestionAPICalls] requestURL: ', requestURL); 

    const body = {
        ...form,
        userId: userId
    };

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
            },
            body: JSON.stringify(body),
        }).then((response) => response.json());

        console.log('[QuestionAPICalls] callQuestionCreateApi RESULT: ', result);

        if (result.status === 200) {
            dispatch({ type: POST_QUESTION, payload: result });
        } else {
            console.error('Error creating question:', result);
        }
    };
};

/* 1:1 문의 수정 */
export const callQuestionUpdateApi = ({ questionId, userId, form }) => {
    const requestURL = `${prefix}/questions/${questionId}?userId=${userId}`;

    console.log('[QuestionAPICalls] callQuestionUpdateApi Call');
    console.log('[QuestionAPICalls] requestURL: ', requestURL);

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
            },
            body: JSON.stringify(form),
        }).then((response) => response.json());

        console.log('[QuestionAPICalls] callQuestionUpdateApi RESULT: ', result);

        if (result.status === 200) {
            dispatch({ type: PUT_QUESTION, payload: result });
        } else {
            console.error('Error updating question:', result);
        }
    };
};

/* 1:1 문의 삭제 */
export const callQuestionDeleteApi = (questionId, userId) => {
    const requestURL = `${prefix}/questions/${questionId}?userId=${userId}`;

    console.log('[QuestionAPICalls] callQuestionDeleteApi Call');
    console.log('[QuestionAPICalls] requestURL: ', requestURL);

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
            },
        }).then((response) => response.json());

        console.log('[QuestionAPICalls] callQuestionDeleteApi RESULT: ', result);

        if (result.status === 200) {
            dispatch({ type: DELETE_QUESTION, payload: questionId });
        } else {
            console.error('Error deleting question:', result);
        }
    };
};
