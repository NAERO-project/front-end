import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const POST_CART = "user/POST_CART";

const actions = createActions({
	[POST_CART]: () => {},
});

const cartReducer = handleActions(
	{
		[POST_CART]: (state, { payload }) => {
			return payload;
		},
	},
	initialState
);

export default cartReducer;
