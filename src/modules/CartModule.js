import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const POST_CART = "user/POST_CART";
export const GET_CART = "user/GET_CART";
export const DEL_CART = "user/DEL_CART";

const actions = createActions({
	[POST_CART]: () => {},
	[GET_CART]: () => {},
	[DEL_CART]: () => {},
});

const cartReducer = handleActions(
	{
		[POST_CART]: (state, { payload }) => {
			return payload;
		},
		[GET_CART]: (state, { payload }) => {
			return payload;
		},
		[DEL_CART]: (state, { payload }) => {
			return payload;
		},
	},
	initialState
);

export default cartReducer;
