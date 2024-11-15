import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const GET_USER = "user/GET_USER";
//굳이 리덕스에 넣을 이유가 없는듯.
// export const GET_DUPLI_ID = "user/GET_DUPLI_ID";
// export const GET_DUPLI_EMAIL = "user/GET_DUPLI_EMAIL";
export const POST_LOGIN = "user/POST_LOGIN";
export const POST_SINGUP = "user/POST_SIGNUP"; //회원가입 성공판별 state
export const UPDATE_USER = "user/POST_UPDATE"; //회원 정보 수정
export const WITHDRAWAL_USER = "user/POST_WITHDRAWAL"; //회원 탈퇴

const actions = createActions({
	[GET_USER]: () => {},
	[POST_LOGIN]: () => {},
	[POST_SINGUP]: () => {},
	[UPDATE_USER]: () => {},
	[WITHDRAWAL_USER]: () => {},
});

const userReducer = handleActions(
	{
		[GET_USER]: (state, { payload }) => {
			return payload;
		},
		[POST_LOGIN]: (state, { payload }) => {
			return payload;
		},
		[POST_SINGUP]: (state, { payload }) => {
			return payload;
		},
		[UPDATE_USER]: (state, { payload }) => {
			return payload;
		},
		[WITHDRAWAL_USER]: (state, { payload }) => {
			return payload;
		},
	},
	initialState
);

export default userReducer;
