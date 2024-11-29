import {
    GET_ANSWERS,
    GET_ALL_QUESTIONS,
    GET_ANSWER_DETAIL,
    POST_ANSWER,
    PUT_ANSWER,
    DELETE_ANSWER,
} from '../modules/AnswerModule.js';

// import {
//     GET_QUESTIONS,
//     GET_QUESTION_DETAIL
// } from '../modules/QuestionModule.js';

const prefix = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api`;

/* 1:1 문의 답변 전체 조회 */
export const callAnswerListApi = ({ currentPage }) => {
    const requestURL = `${prefix}/admin/answers?offset=${currentPage}`;

    console.log('[AnswerAPICalls] requestURL: ', requestURL);

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
            console.log("--------------------1:1 문의 답변-----------------------")
            console.log('[AnswerAPICalls] 1 callAnswerListApi RESULT: ', result);
            console.log('[AnswerAPICalls] callAnswerListApi RESULT: ', result.data);
            dispatch({ type: GET_ANSWERS, payload: result.data });
        } else {
            console.error('Error fetching answers:', result);
            dispatch({ type: 'FETCH_ANSWERS_ERROR', payload: result });
        }
    };
}; 

// 1:1 문의 전체 조회
export const callQuestionListApi = ({ currentPage }) => {
    const requestURL = `${prefix}/admin/questions?offset=${currentPage}`;

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
            console.log("-------------------------- 1:1문의 ------------------------------")
            console.log("-------------------------- 1:1문의 ------------------------------")
            console.log("-------------------------- 1:1문의 ------------------------------")
            console.log('[QuestionAPICalls] callQuestionListApi RESULT: ', result);
            console.log('[QuestionAPICalls] callQuestionListApi RESULT: ', result.data);
            dispatch({ type: GET_ALL_QUESTIONS, payload: result.data });
        } else {
            console.error('Error fetching answers:', result);
            dispatch({ type: 'FETCH_ANSWERS_ERROR', payload: result });
        }
    };
}; 


/* 특정 문의 답변 상세 조회 */
export const callAnswerDetailApi = (answerId, questionId, username) => {
    const requestURL = `${prefix}/admin/questions/${questionId}/answers/${answerId}/${username}`;

    console.log('[AnswerAPICalls] requestURL: ', requestURL);

    return async (dispatch) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
            },
        }).then((response) => response.json());

        if (result.status === 200) {
            console.log('[AnswerAPICalls] callAnswerDetailApi RESULT: ', result);
            dispatch({ type: GET_ANSWER_DETAIL, payload: result.data });
        }
    };
};

/* 1:1 문의 답변 등록 */
export const callAnswerCreateApi = ({ questionId, answerEmpId, answerTitle, answerContent }) => {
    const requestURL = `${prefix}/admin/questions/${questionId}/${answerEmpId}/answers`;

    console.log('[AnswerAPICalls] requestURL: ', requestURL);

    return async (dispatch) => {
        const result = await fetch(requestURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
            },
            body: JSON.stringify({ answerTitle, answerContent, answerEmpId }),
        }).then((response) => response.json());

        if (result.status === 200) {
            console.log('[AnswerAPICalls] callAnswerCreateApi RESULT: ', result);
            dispatch({ type: POST_ANSWER, payload: result });
            return result;
        } else {
            console.error('Error creating answer:', result);
            throw new Error(result.message || '답변 등록에 실패했습니다.');
        }
    };
};

/* 1:1 문의 답변 수정 */
export const callAnswerUpdateApi = ({ questionId, answerId, answerEmpId, answerTitle, answerContent }) => {
    const requestURL = `${prefix}/admin/questions/${questionId}/answers/${answerId}`;

    console.log('[AnswerAPICalls] requestURL: ', requestURL);

    return async (dispatch) => {
        const result = await fetch(requestURL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
            },
            body: JSON.stringify({ answerEmpId, answerTitle, answerContent }),
        }).then((response) => response.json());

        if (result.status === 200) {
            console.log('[AnswerAPICalls] callAnswerUpdateApi RESULT: ', result);
            dispatch({ type: PUT_ANSWER, payload: result });
        } else {
            console.error('Error updating answer:', result);
            throw new Error(result.message || '답변 수정에 실패했습니다.');
        }
    };
};

/* 1:1 문의 답변 삭제 */
export const callAnswerDeleteApi = (answerId) => {
    const requestURL = `${prefix}/admin/answers/${answerId}`;

    console.log('[AnswerAPICalls] requestURL: ', requestURL);

    return async (dispatch) => {
        const result = await fetch(requestURL, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
            },
        }).then((response) => response.json());

        if (result.status === 200) {
            console.log('[AnswerAPICalls] callAnswerDeleteApi RESULT: ', result);
            dispatch({ type: DELETE_ANSWER, payload: answerId });
        }
    };
};

/* 특정 문의에 대한 답변 존재 여부 및 answerId 가져오기 */
export const callAnswerApi = (questionId) => {
    const requestURL = `${prefix}/questions/${questionId}/answers`;

    console.log('[AnswerAPICalls] requestURL: ', requestURL);

    return async (dispatch) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
            },
        }).then((response) => response.json());

        if (result.status === 200) {
            console.log('[AnswerAPICalls] callAnswerApi RESULT: ', result);
            dispatch({ type: GET_ANSWER_DETAIL, payload: result.data });
            return result.data;  // answerDTO 반환
        } else {
            console.error('Error fetching answer:', result);
        }
    };
};
