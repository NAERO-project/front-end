import {
  GET_SHIPPING_COM_LIST,
  GET_SHIPPING_STATUS_LIST,
  GET_SHIPPING_UPDATE_RESPONSE,
  GET_DELIVERY_INFO,
} from "../modules/ShippingModule";

const prefix = `http://${process.env.REACT_APP_RESTAPI_IP}:8080`;

export const callShippingComListApi = () => {
  const requestURL = `${prefix}/api/shipping/company`;

  return async (dispatch) => {
    try {
      const result = await fetch(requestURL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
      }).then((response) => response.json());

      if (result.status === 200) {
        dispatch({ type: GET_SHIPPING_COM_LIST, payload: result.data });
        return result.data; // Return data for the caller
      } else {
        console.error("Failed to fetch shipping companies:", result);
        return null;
      }
    } catch (error) {
      console.error("Error in callShippingComListApi:", error);
      return null;
    }
  };
};

export const callShippingStatusListApi = (shippingId) => {
  const requestURL = `${prefix}/api/shipping/${shippingId}`;

  return async (dispatch) => {
    try {
      const result = await fetch(requestURL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
      }).then((response) => response.json());

      if (result.status === 200) {
        dispatch({
          type: GET_SHIPPING_STATUS_LIST,
          payload: result.data,
        });
        return result.data; // Return data for the caller
      } else {
        console.error("Failed to fetch shipping status:", result);
        return null;
      }
    } catch (error) {
      console.error("Error in callShippingStatusListApi:", error);
      return null;
    }
  };
};

export const callShippingUpdateApi = (form) => {
  const requestURL = `${prefix}/api/shipping`;

  return async (dispatch) => {
    try {
      const result = await fetch(requestURL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
        body: JSON.stringify(form),
      }).then((response) => response.json());

      if (result.status === 200) {
        dispatch({
          type: GET_SHIPPING_UPDATE_RESPONSE,
          payload: result.status,
        });
        return result.status; // Return data for the caller
      } else {
        console.error("Failed to update shipping status:", result);
        return null;
      }
    } catch (error) {
      console.error("Error in callShippingUpdateApi:", error);
      return null;
    }
  };
};

export const callDeliveryInfoApi = (trackingNumber, shipComCode) => {
  const requestURL = `${prefix}/api/shipping/track-shipment?trackingNumber=${trackingNumber}&shipComCode=${shipComCode}`;

  return async (dispatch) => {
    try {
      const result = await fetch(requestURL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
      }).then((response) => response.json());

      if (result.status === 200) {
        dispatch({ type: GET_DELIVERY_INFO, payload: result.data });
        return result.data;
      } else {
        console.error("Failed to fetch delivery information:", result);
        return null;
      }
    } catch (error) {
      console.error("Error in callDeliveryInfoApi:", error);
      return null;
    }
  };
};
