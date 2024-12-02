import {
  GET_ORDER_PAGE,
  POST_ORDER,
  GET_MYPAGE_ORDERLIST,
  GET_MYPAGE_ORDER_PRODUCT_LIST,
  GET_PRODUCER_ORDER_LIST,
  GET_PRODUCER_ORDER_PRODUCT_LIST,
  GET_ORDER_DETAILS,
  PUT_CANCEL_ORDER,
} from "../modules/OrderModule.js";

const prefix = `http://${process.env.REACT_APP_RESTAPI_IP}:8080`;

// 주문페이지 정보 조회
export const callOrderPageApi = ({ cartItem, username }) => {
  let requestURL = `${prefix}/api/order/start?username=${username}`;

  console.log("[OrderApiCalls] requestURL : ", requestURL);

  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
      body: JSON.stringify([cartItem]), // 배열로 감싸기
    }).then((response) => response.json());

    if (result.status === 200) {
      console.log("[OrderApiCalls] callOrderPageApi RESULT : ", result);
      console.log("Result Data:", result.data); // 추가 로그
      dispatch({ type: GET_ORDER_PAGE, payload: result.data });
    } else {
      console.error("API 호출 실패:", result);
    }
  };
};

// 장바구니에서 주문페이지 정보 조회
export const callCartOrderAPI = ({ cartItems, username }) => {
  let requestURL = `${prefix}/api/order/start?username=${username}`;

  console.log("[CartApiCalls] requestURL : ", requestURL);

  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
      body: JSON.stringify(cartItems), // 배열로 감싸기
    }).then((response) => response.json());

    if (result.status === 200) {
      console.log("[CartApiCalls] callCartOrderAPI RESULT : ", result);
      console.log("Result Data:", result.data); // 추가 로그
      dispatch({ type: GET_ORDER_PAGE, payload: result.data });
    } else {
      console.error("API 호출 실패:", result);
    }
  };
};

export const callCancelOrderApi = ({ orderId }) => {
  let requestURL = `${prefix}/api/order/cancel/${orderId}`;

  console.log("[OrderApiCalls] requestURL : ", requestURL);

  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
    }).then((response) => response.json());

    if (result.status === 200) {
      console.log(
        "[OrderApiCalls] onClickCancelOrderHandler RESULT : ",
        result
      );
      console.log("Result Data:", result.data);
      dispatch({ type: PUT_CANCEL_ORDER, payload: result.data });
    } else {
      console.error("API 호출 실패:", result);
    }
  };
};

// 결제
export const callInsertOrderApi = ({ payRequest, username, navigate }) => {
  let requestURL = `${prefix}/api/order/process?username=${username}`;

  console.log("[OrderApiCalls] requestURL : ", requestURL);
  console.log("[OrderApiCalls] payRequest : ", payRequest); // payRequest 로그 추가
  console.log("payRequest 데이터:", JSON.stringify(payRequest));

  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
      body: JSON.stringify(payRequest),
    }).then((response) => response.json());

    if (result.status === 200) {
      console.log("[OrderApiCalls] callInsertOrderApi RESULT : ", result);
      dispatch({ type: POST_ORDER, payload: result.data });
      alert("결제가 성공적으로 완료되었습니다.");
      navigate(`/mypage/order-detail/${result.data.orderId}`);
    } else if (result.status === 500) {
      console.error("API 호출 실패:", result);
      alert(result.data);
    }
  };
};

export const callMyPageOrderListApi = ({ currentPage, username }) => {
  let requestURL;

  if (currentPage !== undefined || currentPage !== null) {
    requestURL = `${prefix}/api/order/${username}?offset=${currentPage}`;
  } else {
    requestURL = `${prefix}/api/order/${username}`;
  }

  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
    }).then((response) => response.json());

    if (result.status === 200) {
      console.log("[OrderApiCalls] callMyPageOrderListApi RESULT : ", result);
      dispatch({ type: GET_MYPAGE_ORDERLIST, payload: result.data });
    }
  };
};

export const callMyPageOrderProductListApi = ({ orderId }) => {
  const requestURL = `${prefix}/api/order/product/${orderId}`;

  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
    }).then((response) => response.json());

    console.log(
      "[OrderApiCalls] callMyPageOrderProductListApi RESULT : ",
      result
    );
    console.log(
      "[OrderApiCalls] callMyPageOrderProductListApi RESULT.data : ",
      result.data
    );

    dispatch({ type: GET_MYPAGE_ORDER_PRODUCT_LIST, payload: result.data });
  };
};

export const callProducerOrderListPageApi = ({
  currentPage,
  producerUsername,
}) => {
  let requestURL;

  if (currentPage !== undefined || currentPage !== null) {
    requestURL = `${prefix}/api/order/seller/${producerUsername}?offset=${currentPage}`;
  } else {
    requestURL = `${prefix}/api/order/seller/${producerUsername}`;
  }

  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
    }).then((response) => response.json());

    console.log(
      "[OrderApiCalls] callProducerOrderListPageApi RESULT : ",
      result
    );
    console.log(
      "[OrderApiCalls] callProducerOrderListPageApi RESULT.data : ",
      result.data
    );

    dispatch({ type: GET_PRODUCER_ORDER_LIST, payload: result.data });
  };
};

// export const callProducerOrderProductListApi = ({
//   orderId,
//   producerUsername,
// }) => {
//   const requestURL = `${prefix}/api/order/seller/product/${orderId}?producerUsername=${producerUsername}`;

//   return async (dispatch, getState) => {
//     const result = await fetch(requestURL, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "*/*",
//         Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
//       },
//     }).then((response) => response.json());

//     console.log(
//       "[OrderApiCalls] callProducerOrderProductListApi RESULT : ",
//       result
//     );
//     console.log(
//       "[OrderApiCalls] callProducerOrderProductListApi RESULT.data : ",
//       result.data
//     );

//     dispatch({ type: GET_PRODUCER_ORDER_PRODUCT_LIST, payload: result.data });
//   };
// };

export const callProducerOrderProductListApi = ({
  orderId,
  producerUsername,
}) => {
  const requestURL = `${prefix}/api/order/seller/product/${orderId}?producerUsername=${producerUsername}`;

  return async (dispatch, getState) => {
    try {
      const result = await fetch(requestURL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
          Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
        },
      }).then((response) => response.json());

      console.log(
        "[OrderApiCalls] callProducerOrderProductListApi RESULT:",
        result
      );

      console.log(
        "[OrderApiCalls] callProducerOrderProductListApi RESULT.data : ",
        result.data
      );
      if (result.status === 200) {
        dispatch({
          type: GET_PRODUCER_ORDER_PRODUCT_LIST,
          payload: result.data,
        });
        return result.data; // Return data for the caller
      } else {
        console.error("API 호출 실패:", result);
        throw new Error(result.message || "API 호출 실패");
      }
    } catch (error) {
      console.error("Error in callProducerOrderProductListApi:", error);
      throw error; // Rethrow error to handle it in the caller
    }
  };
};

export const callOrderDetailApi = ({ orderId }) => {
  const requestURL = `${prefix}/api/order/details/${orderId}`;

  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
    }).then((response) => response.json());

    console.log("[OrderApiCalls] callOrderDetailApi RESULT : ", result);
    console.log(
      "[OrderApiCalls] callOrderDetailApi RESULT.data : ",
      result.data
    );

    dispatch({ type: GET_ORDER_DETAILS, payload: result.data });

    // Mana가 추가한 코드: 호출한 곳에 데이터 반환
    return result.data; // Return data for the caller
  };
};
