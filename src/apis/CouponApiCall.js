import { GET_USER_COUPON } from "../modules/CouponModule.js";

const prefix = `http://${process.env.REACT_APP_RESTAPI_IP}:8080`;

export const callUserCouponApi = ({username}) =>{

    let requestURL = `${prefix}/api/coupon/${username}`;

    console.log('[CouponAPICalls] requestURL : ', requestURL);

    return async (dispatch, getState) =>{
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*'
            }
        }).then((response) => response.json());
        if(result.status === 200){
            console.log('[CouponAPICalls] callUserCouponApi RESULT : ', result);
            dispatch({ type: GET_USER_COUPON, payload: result.data });
        }
    };
};
