import { GET_PRODUCTS_CATEGORY01 } from "../modules/CategoryModule";
import { GET_PRODUCTS_CATEGORY02 } from "../modules/CategoryModule";

const prefix = `http://${process.env.REACT_APP_RESTAPI_IP}:8080`;

/* 카테고리 리스트 조회 (카테고리 분리 대분류) */
export const callProductCategoryApi01 = () =>{
    
    let requestURL = `${prefix}/api/products/more/category`;
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
            console.log('[ProduceAPICalls] callProductCategoryApi01 RESULT : ', result);
            dispatch({ type: GET_PRODUCTS_CATEGORY01, payload: result.data });
        }
    };
};

/* 카테고리 리스트 조회 (카테고리 분리 중분류) */
export const callProductCategoryApi02 = ({largeId}) =>{
    
    let requestURL = `${prefix}/api/products/more/${largeId}/category`;
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
            console.log('[ProduceAPICalls] callProductCategoryApi02 RESULT : ', result);
            dispatch({ type: GET_PRODUCTS_CATEGORY02, payload: result.data });
        }
    };
};


/* 카테고리 리스트 조회 (카테고리 분리 대분류) */
// export const callProductBrandCategoryApi01 = () =>{
    
//     let requestURL = `${prefix}/api/products/brand/home`;
//     console.log('[productAPICalls] requestURL : ', requestURL);

//     return async (dispatch, getState) =>{
//         const result = await fetch(requestURL, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 Accept: '*/*'
//             }
//         }).then((response) => response.json());
//         if(result.status === 200){
//             console.log('[ProduceAPICalls] callProductBrandCategoryApi01 RESULT : ', result);
//             dispatch({ type: GET_PRODUCTS_CATEGORY01, payload: result.data });
//         }
//     };
// };