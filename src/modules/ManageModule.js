import { createActions, handleActions } from "redux-actions";

export const GET_USER_LIST = "manage/GET_USER_LIST";
export const GET_USER_DETAIL = "manage/GET_USER_DETAIL";
export const GET_PRODUCER_LIST = "manage/GET_PRODUCER_LIST";
export const GET_PRODUCER_DETAIL = "manage/GET_PRODUCER_DETAIL";

const initialState = [];
const actions = createActions({
	[GET_USER_LIST]: () => {},
    [GET_PRODUCER_DETAIL]: () => { },
	[GET_USER_DETAIL]: () => {},
	[GET_PRODUCER_DETAIL]: () => {},
});

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
		[GET_PRODUCER_LIST]: (state, { payload }) => { const curpage = payload.message.split("/")[0]
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
		[GET_PRODUCER_DETAIL]: (state, { payload }) => {
			return payload;
		},
		[GET_USER_DETAIL]: (state, { payload }) => {
			return payload;
		},
	},
	initialState
);

export { manageTableReducer, manageDetailReducer}