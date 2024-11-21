import {
    GET_QUESTIONS,
    GET_QUESTION,
    POST_QUESTION,
    PUT_QUESTION,
    DELETE_QUESTION,
} from '../modules/QuestionModule';

const API_BASE_URL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/questions`;

// 전체 문의 조회
export const getUserQuestions = ({ userId, page, size }) => {
    return async (dispatch) => {
        const result = await fetch(`${API_BASE_URL}?userId=${userId}&page=${page}&size=${size}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
            },
        }).then((response) => response.json());

        dispatch({ type: GET_QUESTIONS, payload: result.data });
    };
};

// 특정 문의 상세 조회
export const getQuestionById = ({ userId, questionId }) => {
    return async (dispatch) => {
        const result = await fetch(`${API_BASE_URL}/${questionId}?userId=${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
            },
        }).then((response) => response.json());

        dispatch({ type: GET_QUESTION, payload: result.data });
    };
};

// 문의 등록
export const addQuestion = ({ questionTitle, questionContent, userId }) => {
    return async (dispatch) => {
        const result = await fetch(`${API_BASE_URL}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
            },
            body: JSON.stringify({ questionTitle, questionContent, userId }),
        }).then((response) => response.json());

        dispatch({ type: POST_QUESTION, payload: result });
    };
};

// 문의 수정
export const updateQuestion = ({ questionId, questionTitle, questionContent, userId }) => {
    return async (dispatch) => {
        const result = await fetch(`${API_BASE_URL}/${questionId}?userId=${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
            },
            body: JSON.stringify({ questionTitle, questionContent }),
        }).then((response) => response.json());

        dispatch({ type: PUT_QUESTION, payload: result });
    };
};

// 문의 삭제
export const deleteQuestion = ({ questionId, userId }) => {
    return async (dispatch) => {
        const result = await fetch(`${API_BASE_URL}/${questionId}?userId=${userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
            },
        }).then((response) => response.json());

        dispatch({ type: DELETE_QUESTION, payload: result });
    };
};
