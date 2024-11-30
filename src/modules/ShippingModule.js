import { createActions, handleActions } from "redux-actions";

const initialState = {
  shipComList: [],
  shippingStatus: {},
  updateResponse: {},
  deliveryInfo: {},
};

export const GET_SHIPPING_COM_LIST = "shipping/GET_SHIPPING_COM_LIST";
export const GET_SHIPPING_STATUS_LIST = "shipping/GET_SHIPPING_STATUS_LIST";
export const GET_SHIPPING_UPDATE_RESPONSE =
  "shipping/GET_SHIPPING_UPDATE_RESPONSE";
export const GET_DELIVERY_INFO = "shipping/GET_DELIVERY_INFO";

const actions = createActions({
  [GET_SHIPPING_COM_LIST]: () => {},
  [GET_SHIPPING_STATUS_LIST]: () => {},
  [GET_SHIPPING_UPDATE_RESPONSE]: () => {},
  [GET_DELIVERY_INFO]: () => {},
});

const shippingReducer = handleActions(
  {
    [GET_SHIPPING_COM_LIST]: (state, { payload }) => {
      return { ...state, shipComList: payload };
    },
    [GET_SHIPPING_STATUS_LIST]: (state, { payload }) => {
      return { ...state, shippingStatus: payload };
    },
    [GET_SHIPPING_UPDATE_RESPONSE]: (state, { payload }) => {
      return { ...state, updateResponse: payload };
    },
    [GET_DELIVERY_INFO]: (state, { payload }) => {
      return { ...state, deliveryInfo: payload };
    },
  },
  initialState
);

export default shippingReducer;
