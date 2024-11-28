import { createActions, handleActions } from "redux-actions";

export const GET_USER_LIST = "manage/GET_USER_LIST";
export const GET_USER_DETAIL = "manage/GET_USER_DETAIL";
export const GET_PRODUCER_LIST = "manage/GET_PRODUCER_LIST";
export const UPDATE_PRODUCER_DETAIL = "manage/UPDATE_PRODUCER_DETAIL";
export const UPDATE_USER_DETAIL = "manage/UPDATE_USER_DETAIL";

const initialState = [];
const actions = createActions({
	[GET_USER_LIST]: () => {},
    [GET_PRODUCER_LIST]: () => { },
	[GET_USER_DETAIL]: () => {},
	[UPDATE_USER_DETAIL]: () => {},
	[UPDATE_PRODUCER_DETAIL]: () => {},
});

/*
//[{ largecategory: 1, name: 기타, midddle: [{Id:0,name:기타}]
//},{ largecategory: 2, name: 기타, midddle:[]
//},{ largecategory: 3, name: 기타, midddle:[]
    }]
    [GET_middle_state]: (state, { payload }) => {
        //payload = {
        //    largecategory: 1,
        //    middlecategory: [{Id:0,name:기타}]
        //}
        fixstate = state
        fixstate.map(f => { 
            if (f.largecategory == payload.largecategory) { 
                f.midddle =payload.middlecategory
            }
        }
            
        )
        return {
            fixstate
        };
    },
*/;
const manageTableReducer = handleActions(
    {
        [GET_USER_LIST]: (state, { payload }) => {
            const curpage = payload.message.split("/")[0]
            const totalpage = payload.message.split("/")[1] 
            return {
                data: payload.data,
                curpage: curpage,
                totalpage: totalpage
            };
		},
        [GET_PRODUCER_LIST]: (state, { payload }) => {
            const curpage = payload.message.split("/")[0]
            const totalpage = payload.message.split("/")[1] 
            return {
                data: payload.data,
                curpage: curpage,
                totalpage: totalpage
            };
		},
	},
	initialState
);


const manageDetailReducer = handleActions(
	{
		[GET_USER_DETAIL]: (state, { payload }) => {
			return payload;
        },
        [UPDATE_USER_DETAIL]: (state, { payload }) => {
			return payload;
		},
        [UPDATE_PRODUCER_DETAIL]: (state, { payload }) => {
			return payload;
		},
	},
	initialState
);

export { manageTableReducer, manageDetailReducer}