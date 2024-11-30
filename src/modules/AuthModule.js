import { createActions, handleActions } from "redux-actions";

export const GET_DUPLI_ID = "auth/GET_DUPLI_ID";
export const GET_PASS_CHECK = "auth/GET_PASS_CHECK";
export const GET_SEND_EMAIL = "auth/GET_SEND_EMAIL";
export const GET_SEND_KEY = "auth/GET_SEND_KEY";

const initialState = [];
const actions = createActions({
	[GET_DUPLI_ID]: () => {},
	[GET_PASS_CHECK]: () => {},
	[GET_SEND_EMAIL]: () => {},
});

const authReducer = handleActions(
	{
		[GET_DUPLI_ID]: (state, { payload }) => {
			return payload;
		},
		[GET_PASS_CHECK]: (state, { payload }) => {
			return payload;
		},
		[GET_SEND_EMAIL]: (state, { payload }) => {
			return payload;
		},
		[GET_SEND_KEY]: (state, { payload }) => {
			return payload;
		},
	},
	initialState
);

export default authReducer;
