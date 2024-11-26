import { GET_PRODUCER_LIST, GET_USER_DETAIL, GET_USER_LIST } from "../modules/ManageModule";

const prefix = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/manager`;

export const callUserSearch = ({ form, currentPage }) =>{
    console.log("callUserSearch")
    const requestURL= `${prefix}/search/user/${currentPage-1}`;

    console.log("formData",JSON.stringify(form))

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*'
            }, body: JSON.stringify(form)
        }).then((response) => response.json());
        console.log('[ManageApucall] callUserSearch RESULT : ', result);
        if(result.status === 200){
            dispatch({ type: GET_USER_LIST, payload: result });
        }
    };
};

export const callProducerSearch = ({ form, currentPage }) =>{
    console.log("callProdcerSearch")
    const requestURL= `${prefix}/search/producer/${currentPage-1}`;

    console.log("formData",JSON.stringify(form))

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*'
            }, body: JSON.stringify(form)
        }).then((response) => response.json());
        console.log('[ManageApucall] callUserSearch RESULT : ', result);
        if(result.status === 200){
            dispatch({ type: GET_PRODUCER_LIST, payload: result });
        }
    };
};
export const callUserDetailManageAPI = ({username }) =>{
    console.log("callProdcerSearch")
    const requestURL= `${prefix}/detail/${username}`;

    console.log("formData",JSON.stringify(username))

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*'
            }
        }).then((response) => response.json());
        console.log('[ManageApIcall] callUserDetailManage RESULT : ', result);
        if(result.status === 200){
            dispatch({ type: GET_USER_DETAIL, payload: result });
        }
    };
};