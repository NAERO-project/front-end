import { createActions, handleActions } from "redux-actions";

export const GET_DUPLI_ID = "auth/GET_DUPLI_ID";
export const GET_PASS_CHECK = "auth/GET_PASS_CHECK";

const initialState = false;
const actions = createActions({
	[GET_DUPLI_ID]: () => {},
	[GET_PASS_CHECK]: () => {},
});

const authReducer = handleActions(
	{
		[GET_DUPLI_ID]: (state, { payLoad }) => {
			return payLoad;
		},
		[GET_PASS_CHECK]: (state, { payLoad }) => {
			return payLoad;
		},
	},
	initialState
);

export default authReducer;
