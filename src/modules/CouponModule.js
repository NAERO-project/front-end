import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const GET_USER_COUPON = "coupon/GET_USER_COUPON";

const actions = createActions({
  [GET_USER_COUPON]: () => {},
});

const couponReducer = handleActions(
  {
    [GET_USER_COUPON]: (state, { payload }) => {
      return payload;
    },
  },
  initialState
);

export default couponReducer;
