import{createActions, handleActions} from "redux-actions";


const initialState =[];

export const GET_BANNERS = 'banner/GET_BANNERS';                        //배너 전체 조회
export const GET_PRODUCER_BANNERS = 'banner/GET_PRODUCER_BANNERS';      //판매자 배너 전체 조회
export const GET_ADMIN_BANNERS = 'banner/GET_ADMIN_BANNERS';         //관리자 배너 전체 조회
export const POST_PRODUCER_BANNER = 'banner/POST_PRODUCER_BANNER';      //판매자 배너 등록
export const PUT_ADMIN_BANNERS = 'banner/PUT_ADMIN_BANNERS';         //관리자, 판매자 배너 수정
export const DELETE_ADMIN_BANNERS = 'banner/DELETE_ADMIN_BANNERS';      //관리자 배너 삭제

const actions = createActions({
    [GET_BANNERS]: () =>{},
    [GET_PRODUCER_BANNERS]: () =>{},
    [GET_ADMIN_BANNERS]: () =>{},
    [POST_PRODUCER_BANNER]: () =>{},
    [PUT_ADMIN_BANNERS]: () =>{},
    [DELETE_ADMIN_BANNERS]: () =>{}
})

const bannerReducer = handleActions({
    [GET_BANNERS]: (state, {payload}) =>{
        return payload
    },
    [GET_PRODUCER_BANNERS]: (state, {payload}) =>{
        return payload
    },
    [GET_ADMIN_BANNERS]: (state, {payload}) =>{
        return payload
    },
    [POST_PRODUCER_BANNER]: (state, {payload}) =>{
        return payload
    },
    [PUT_ADMIN_BANNERS]: (state, {payload}) =>{
        return payload
    },
    [DELETE_ADMIN_BANNERS]: (state, {payload}) =>{
        return payload
    },
}, initialState);

export default bannerReducer;
