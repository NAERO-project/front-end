import {
    GET_ANSWERS,
    GET_QUESTIONS,
    GET_ANSWER_DETAIL,
    POST_ANSWER,
    PUT_ANSWER,
    DELETE_ANSWER,
} from '../modules/AnswerModule.js';

// import {
//     GET_QUESTIONS,
//     GET_QUESTION_DETAIL
// } from '../modules/QuestionModule.js';

const prefix = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/admin`;

/* 1:1 문의 답변 전체 조회 */
export const callAnswerListApi = ({ page = 1, size = 10 }) => {
    const requestURL = `${prefix}/answers?page=${page}&size=${size}`;

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
            console.log("--------------------1:1 문의 답변-----------------------")
            console.log("--------------------1:1 문의 답변-----------------------")
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

export const callQuestionListApi = ({ page = 1, size = 10}) => {
    const requestURL = `${prefix}/questions?page=${page}&size=${size}`;

    console.log('[QuestionAPICalls] requestURL: ', requestURL);
    return async (dispatch) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
            },
        }).then((response) => response.json());

        if (result.status === 200) {
            console.log("-------------------------- 1:1문의 ------------------------------")
            console.log("-------------------------- 1:1문의 ------------------------------")
            console.log("-------------------------- 1:1문의 ------------------------------")
            console.log('[QuestionAPICalls] callQuestionListApi RESULT: ', result);
            console.log('[QuestionAPICalls] callQuestionListApi RESULT: ', result.data);
            dispatch({ type: GET_ANSWERS, payload: result.data });
        } else {
            console.error('Error fetching answers:', result);
            dispatch({ type: 'FETCH_ANSWERS_ERROR', payload: result });
        }
    };
}; 


/* 특정 문의 답변 상세 조회 */
export const callAnswerDetailApi = (answerId, questionId) => {
    const requestURL = `${prefix}/questions/${questionId}/answers/${answerId}`;

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
    const requestURL = `${prefix}/questions/${questionId}/${answerEmpId}/answers`;

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
        } else {
            console.error('Error creating answer:', result);
            throw new Error(result.message || '답변 등록에 실패했습니다.');
        }
    };
};

/* 1:1 문의 답변 수정 */
export const callAnswerUpdateApi = ({ questionId, answerId, answerEmpId, answerTitle, answerContent }) => {
    const requestURL = `${prefix}/questions/${questionId}/answers/${answerId}`;

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
    const requestURL = `${prefix}/answers/${answerId}`;

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
