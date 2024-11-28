import { GET_ADMIN_BANNERS, GET_BANNERS, GET_PRODUCER_BANNERS, POST_PRODUCER_BANNER, PUT_ADMIN_BANNERS } from "../modules/BannerModule";

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
        requestURL = `${prefix}/producer/banner-manage/${producerUsername}`;
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

// 관리자 배너 전체 조회
export const callAdminBannerApi =({currentPage}) =>{

    let requestURL;

    if(currentPage !== undefined || currentPage !== null){
        requestURL = `${prefix}/admin/banner-manage?offset=${currentPage}`;
    }else{
        requestURL = `${prefix}/admin/banner-manage`;
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
            console.log('[BannerApiCall] callAdminBannerApi RESULT : ', result);
            dispatch({ type: GET_ADMIN_BANNERS, payload: result.data });
        }
    };
}

// 판매자 배너 신청
export const callInsertBannerApi = ({ form, producerUsername }) =>{
    console.log('[BannerApiCall] callInsertBannerApi Call');

    const requestURL = `${prefix}/producer/banner/insert?producerUsername=${producerUsername}`;

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

        console.log('[BannerApiCall] callInsertBannerApi RESULT : ', result);

        dispatch({ type: POST_PRODUCER_BANNER, payload: result });
    };
};

// 관리자 배너 등록
export const callBannerUpdateApi = ({ form }) => {
	console.log('[ProduceAPICalls] callBannerUpdateApi Call');

	const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/admin/banner-update`;

	return async (dispatch, getState) => {
		const result = await fetch(requestURL, {
			method: 'PUT',
			headers: {
				Accept: '*/*',
				Authorization:
					'Bearer ' + window.localStorage.getItem('accessToken')
			},
			body: form
		}).then((response) => response.json());

		console.log('[ProduceAPICalls] callBannerUpdateApi RESULT : ', result);

		dispatch({ type: PUT_ADMIN_BANNERS, payload: result });
	};
};