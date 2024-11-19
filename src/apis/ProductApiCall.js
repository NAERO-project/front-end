import {
    GET_PRODUCT,
    GET_PRODUCTS,
    GET_PRODUCTS_PREVIEW,
    GET_PRODUCTS_PREVIEW_FOOD,
    GET_PRODUCTS_PREVIEW_FASHION,
    GET_PRODUCTS_PREVIEW_BEAUTY,
    GET_PRODUCTS_PRODUCER_PREVIEW,
    GET_PRODUCTS_PRODUCER,
    POST_PRODUCTS,
    PUT_PRODUCTS,                     
    DELETE_PRODUCTS
} from '../modules/ProductModule.js';

const prefix = `http://${process.env.REACT_APP_RESTAPI_IP}:8080`;


/* 메인페이지 상품 전체 조회 */
export const callProductListApi = ({ currentPage }) =>{
    
    let requestURL;

    if(currentPage !== undefined || currentPage !== null){
        requestURL = `${prefix}/api/products/more?offset=${currentPage}`;
    }else{
        requestURL = `${prefix}/api/products/more`;
    }

    console.log('[ProductAPICalls] requestURL : ', requestURL);

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*'
            }
        }).then((response) => response.json());
        if(result.status === 200){
            console.log('[ProduceAPICalls] callProductListApi RESULT : ', result);
            dispatch({ type: GET_PRODUCTS, payload: result.data });
        }
    };
};


/* 카테고리별 리스트 전체 조회 */
export const callProductCategoryListApi = ({ currentPage, mediumId }) =>{
    
    let requestURL;

    if(currentPage !== undefined || currentPage !== null){
        requestURL = `${prefix}/api/products/more/${mediumId}?offset=${currentPage}`;
    }else{
        requestURL = `${prefix}/api/products/more/${mediumId}`;
    }

    console.log('[productAPICalls] requestURL : ', requestURL);

    return async (dispatch, getState) =>{
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*'
            }
        }).then((response) => response.json());
        if(result.status === 200){
            console.log('[ProduceAPICalls] callProductCategoryListApi RESULT : ', result);
            dispatch({ type: GET_PRODUCTS, payload: result.data });
        }
    };
};


/* 상품 리스트 미리보기 조회 */
export const callProductListPreviewApi = () =>{

    let requestURL = `${prefix}/api/products/preview`;

    console.log('[productAPICalls] requestURL : ', requestURL);

    return async (dispatch, getState) =>{
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*'
            }
        }).then((response) => response.json());

        if(result.status === 200){
            console.log('[ProduceAPICalls] callProductListPreviewApi RESULT : ', result);
            dispatch({ type: GET_PRODUCTS_PREVIEW, payload: result.data });
        }
    };
};


/* 식품 상품 리스트 미리보기 조회 */
export const callProductPreviewFoodApi = () =>{

    let requestURL = `${prefix}/api/products/preview/food`;

    console.log('[productAPICalls] requestURL : ', requestURL);

    return async (dispatch, getState) =>{
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*'
            }
        }).then((response) => response.json());
        if(result.status === 200){
            console.log('[ProduceAPICalls] callProductListPreviewApi RESULT : ', result);
            dispatch({ type: GET_PRODUCTS_PREVIEW_FOOD, payload: result.data });
        }
    };
};


/* 건강&뷰티 상품 리스트 미리보기 조회 */
export const callProductPreviewBeautyApi = () =>{

    let requestURL = `${prefix}/api/products/preview/beauty`;

    console.log('[productAPICalls] requestURL : ', requestURL);

    return async (dispatch, getState) =>{
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*'
            }
        }).then((response) => response.json());
        if(result.status === 200){
            console.log('[ProduceAPICalls] callProductPreviewBeautyApi RESULT : ', result);
            dispatch({ type: GET_PRODUCTS_PREVIEW_BEAUTY, payload: result.data });
        }
    };
};


/* 의류 상품 리스트 미리보기 조회 */
export const callProductPreviewFashionApi = () =>{

    let requestURL = `${prefix}/api/products/preview/fashion`;

    console.log('[productAPICalls] requestURL : ', requestURL);

    return async (dispatch, getState) =>{
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*'
            }
        }).then((response) => response.json());
        if(result.status === 200){
            console.log('[ProduceAPICalls] callProductPreviewFashionApi RESULT : ', result);
            dispatch({ type: GET_PRODUCTS_PREVIEW_FASHION, payload: result.data });
        }
    };
};


/* 전체 브랜드 페이지 상품 조회 (미리보기) */
export const callProducerProductListApi = () =>{

    let requestURL = `${prefix}/api/products/producer/preview`;

    console.log('[productAPICalls] requestURL : ', requestURL);

    return async (dispatch, getState) =>{
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*'
            }
        }).then((response) => response.json());
        if(result.status === 200){
            console.log('[ProduceAPICalls] callProducerProductListApi RESULT : ', result);
            dispatch({ type: GET_PRODUCTS_PRODUCER_PREVIEW, payload: result.data });
        }
    };
};


/* 브랜드별 페이지 전체 상품 조회 (페이징) */
export const callProducerProductListPageApi = ({ currentPage, producerId }) =>{

    let requestURL;

    if(currentPage !== undefined || currentPage !== null){
        requestURL = `${prefix}/api/products/producer/${producerId}?offset=${currentPage}`;
    }else{
        requestURL = `${prefix}/api/products/producer/${producerId}`;
    }

    console.log('[productAPICalls] requestURL: ', requestURL);

    return async (dispatch, getState) =>{
        const result = await fetch(requestURL, {
            method: 200,
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*'
            }
        }).then((response) => response.json());
        if(result.status === 200){
            console.log('[ProduceAPICalls] callProducerProductListPageApi RESULT : ', result);
            dispatch({ type: GET_PRODUCTS_PRODUCER, payload: result.data });
        }
    };
};


/* 브랜드별 페이지 카테고리별 전체 상품 조회 (페이징) */
export const callProducerProductCategoryListApi = ({ currentPage, producerId, mediumId }) =>{

    let requestURL;

    if(currentPage !== undefined || currentPage !== null){
        requestURL = `${prefix}/api/products/producer/${producerId}/${mediumId}?offset=${currentPage}`;
    }else{
        requestURL = `${prefix}/api/products/producer/${producerId}/${mediumId}`;
    }

    console.log('[productAPICalls] requestURL: ', requestURL);

    return async (dispatch, getState) =>{
        const result = await fetch(requestURL, {
            method: 200,
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*'
            }
        }).then((response) => response.json());
        if(result.status === 200){
            console.log('[ProduceAPICalls] callProducerProductCategoryListApi RESULT : ', result);
            dispatch({ type: GET_PRODUCTS_PRODUCER, payload: result.data });
        }
    };
};


/* 상품별 상세 조회 */
export const callProductDetailApi = ({productId}) =>{

    let requestURL = `${prefix}/api/products/${productId}`;

    console.log('[productAPICalls] requestURL : ', requestURL);

    return async (dispatch, getState) =>{
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*'
            }
        }).then((response) => response.json());
        if(result.status === 200){
            console.log('[ProduceAPICalls] callProductDetailApi RESULT : ', result);
            dispatch({ type: GET_PRODUCT, payload: result.data });
        }
    };
};


/* 판매자 상품 등록 */
export const callInsertProductApi = ({ form }) =>{
    console.log('[ProductAPICalls] callInsertProductApi Call');

    const requestURL = `${prefix}/api/products`;

    return async (dispatch, getState) =>{
        const result = await fetch(requestURL, {
            method: 'POST',
            headers: {
                Accept: '*/*',
                Authorization:
                    'Bearer ' + window.localStorage.getItem('accessToken')
            },
            body: form
        }).then((response) => response.json());

        console.log('[ProductAPICalls] callInsertProductApi RESULT : ', result);

        dispatch({ type: POST_PRODUCTS, payload: result });
    };
};


/* 판매자 상품 수정 */
export const callUpdateProductApi = ({ form }) =>{
    console.log('[ProductAPICalls] callUpdateProductApi Call');

    const requestURL = `${prefix}/api/products`;

    return async (dispatch, getState) =>{
        const result = await fetch(requestURL, {
            method: 'PUT',
            headers: {
                Accept: '*/*',
                Authorization:
                    'Bearer ' + window.localStorage.getItem('accessToken')
            },
            body: form
        }).then((response) => response.json());

        console.log('[ProductAPICalls] callUpdateProductApi RESULT : ', result);

        dispatch({ type: PUT_PRODUCTS, payload: result });
    };
};


/* 판매자 상품 삭제 */
export const callDeleteProductApi = ({ form }) =>{
    console.log('[ProductAPICalls] callDeleteProductApi Call');

    const requestURL = `${prefix}/api/products`;

    return async (dispatch, getState) =>{
        const result = await fetch(requestURL, {
            method: 'DELETE',
            headers: {
                Accept: '*/*',
                Authorization:
                    'Bearer ' + window.localStorage.getItem('accessToken')
            },
            body: form
        }).then((response) => response.json());

        console.log('[ProductAPICalls] callDeleteProductApi RESULT : ', result);

        dispatch({ type: DELETE_PRODUCTS, payload: result });
    };
};

