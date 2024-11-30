import {
    GET_REVIEW,
    GET_REVIEWS,
    POST_REVIEW,
    PUT_REVIEW,
    DELETE_REVIEW,
    GET_PRODUCT_REVIEWS
} from '../modules/ReviewModule';

const API_BASE_URL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/reviews`;

export const callReviewsByUserAPI = ({ currentPage, username }) => {
    const requestURL = `${API_BASE_URL}/username/${username}?offset=${currentPage}`;
    console.log('[ReviewAPICalls] callReviewsByUserAPI REQUEST URL: ', requestURL);

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
            }
        }).then((response) => response.json());

        console.log('[ReviewAPICalls] callReviewsByUserAPI RESULT: ', result);
        if (result.status === 200) {
            console.log("result : ========", result);
            dispatch({ type: GET_REVIEWS, payload: result.data });
        }
    };
};

export const callReviewsByProductAPI = ({ currentPage, productId }) => {
    const requestURL = `${API_BASE_URL}/product/${productId}?offset=${currentPage}`;
    console.log('[ReviewAPICalls] callReviewsByProductAPI REQUEST URL: ', requestURL);

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken')
            }
        }).then((response) => response.json());

        console.log('[ReviewAPICalls] callReviewsByProductAPI RESULT: ', result);
        console.log('[ReviewAPICalls] callReviewsByProductAPI RESULT.DATA: ', result.data);
        if (result.status === 200) {
            dispatch({ type: GET_PRODUCT_REVIEWS, payload: result.data });
        }
    };
};

export const callReviewDetailAPI = ({ reviewId }) => {
    const requestURL = `${API_BASE_URL}/${reviewId}`;
    console.log('[ReviewAPICalls] callReviewDetailAPI REQUEST URL: ', requestURL);

    return async (dispatch) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*'
            }
        }).then((response) => response.json());

        console.log('[ReviewAPICalls] callReviewDetailAPI RESULT: ', result);
        if (result.status === 200) {
            dispatch({ type: GET_REVIEW, payload: result.data });
        }
    };
};

export const callReviewWriteAPI = ({ productId, reviewDTO, reviewImage }) => {
    const requestURL = `${API_BASE_URL}/${productId}`;
    console.log('[ReviewAPICalls] callReviewWriteAPI REQUEST URL: ', requestURL);

    const formData = new FormData();
    formData.append('review', new Blob([JSON.stringify(reviewDTO)], { type: 'application/json' }));
    if (reviewImage) {
        formData.append('image', reviewImage);
    }

    return (dispatch) => {
        return fetch(requestURL, {
            method: 'POST',
            headers: {
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
            },
            body: formData,
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then((result) => {
            console.log('[ReviewAPICalls] callReviewWriteAPI RESULT: ', result);
            dispatch({ type: POST_REVIEW, payload: result });
            return result;
        })
        .catch((error) => {
            console.error('Error during review write API call:', error);
            throw error;
        });
    };
};


export const callReviewUpdateAPI = ({ productId, reviewId, reviewDTO, reviewImage }) => {
    const requestURL = `${API_BASE_URL}/${productId}/${reviewId}`;
    console.log('[ReviewAPICalls] callReviewUpdateAPI REQUEST URL: ', requestURL);

    const formData = new FormData();
    formData.append('review', new Blob([JSON.stringify(reviewDTO)], { type: 'application/json' }));
    if (reviewImage) {
        formData.append('image', reviewImage);
    }

    return async (dispatch) => {
        const result = await fetch(requestURL, {
            method: 'PUT',
            headers: {
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken')
            },
            body: formData
        }).then((response) => response.json());

        console.log('[ReviewAPICalls] callReviewUpdateAPI RESULT: ', result);
        dispatch({ type: PUT_REVIEW, payload: result });
    };
};

export const callReviewDeleteAPI = ({ productId, reviewId }) => {
    const requestURL = `${API_BASE_URL}/${productId}/${reviewId}`;
    console.log('[ReviewAPICalls] callReviewDeleteAPI REQUEST URL: ', requestURL);

    return async (dispatch) => {
        const result = await fetch(requestURL, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken')
            }
        }).then((response) => response.json());

        console.log('[ReviewAPICalls] callReviewDeleteAPI RESULT: ', result);
        dispatch({ type: DELETE_REVIEW, payload: result });
    };
};