import { GET_BANNERS, GET_PRODUCER_BANNERS } from "../modules/BannerModule";

const prefix = `http://${process.env.REACT_APP_RESTAPI_IP}:8080`;

// 배너 전체 조회
export const callBannerApi = ()=>{

    let requestURL = `${prefix}/banner/home`;

    console.log('[BannerApiCall] requestURL : ', requestURL);

    return async (dispatch, getState) =>{
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*'
            }
        }).then((response) => response.json());
        if(result.status === 200){
            console.log('[BannerApiCall] callBannerApi RESULT : ', result);
            dispatch({ type: GET_BANNERS, payload: result.data });
        }
    };
}

// 판매자 배너 전체 조회
export const callProducerBannerApi =({currentPage, producerUsername}) =>{

    let requestURL;

    if(currentPage !== undefined || currentPage !== null){
        requestURL = `${prefix}/producer/banner-manage/${producerUsername}?offset=${currentPage}`;
    }else{
        requestURL = `${prefix}producer/banner-manage/${producerUsername}`;
    }

    console.log('[BannerApiCall] requestURL : ', requestURL);

    return async (dispatch, getState) =>{
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*'
            }
        }).then((response) => response.json());
        if(result.status === 200){
            console.log('[BannerApiCall] callProducerBannerApi RESULT : ', result);
            dispatch({ type: GET_PRODUCER_BANNERS, payload: result.data });
        }
    };
}