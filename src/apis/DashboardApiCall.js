import axios from "axios";
import {
  GET_TODAY_SALES,
  GET_TODAY_QUANTITY,
  GET_TODAY_ITEMS,
  GET_TODAY_MEMBERS,
  GET_SALES_STATISTICS,
  GET_LIKED_STATISTICS,
  GET_PRODUCT_LIST,
  GET_BRAND_LIST,
  UPDATE_INPUTS,
} from "../modules/DashboardModule";

const prefix = `http://${process.env.REACT_APP_RESTAPI_IP}:8080`;

// Fetch data from today statistics
// export const fetchTodayStatistics = () => async (dispatch) => {
//   console.log("[DashboardApiCall] fetchTodayStatistics Called");

//   const requestUrl = `${prefix}/api/monitoring/today-sales`;

//   try {
//     const response = await axios.get(requestUrl);
//     dispatch({ type: GET_TODAY_STATISTICS, payload: response.data });
//   } catch (error) {
//     console.error(
//       "[DashboardApiCall] fetchTodayStatistics Error : ",
//       error.message
//     );
//   }
// };

// Fetch data from today sales
export const fetchTodaySales = () => async (dispatch) => {
  console.log("[DashboardApiCall] fetchTodaySales Called");

  const requestUrl = `${prefix}/api/monitoring/today-sales`;

  try {
    const response = await axios.get(requestUrl);
    dispatch({ type: GET_TODAY_SALES, payload: response.data });
  } catch (error) {
    console.error("[DashboardApiCall] fetchTodaySales Error : ", error.message);
  }
};

// Fetch data from today quantity
export const fetchTodayQuantity = () => async (dispatch) => {
  console.log("[DashboardApiCall] fetchTodayQuantity Called");

  const requestUrl = `${prefix}/api/monitoring/today-quantity`;

  try {
    const response = await axios.get(requestUrl);
    dispatch({ type: GET_TODAY_QUANTITY, payload: response.data });
  } catch (error) {
    console.error(
      "[DashboardApiCall] fetchTodayQuantity Error : ",
      error.message
    );
  }
};

// Fetch data from today items
export const fetchTodayItems = () => async (dispatch) => {
  console.log("[DashboardApiCall] fetchTodayItems Called");

  const requestUrl = `${prefix}/api/monitoring/today-items`;

  try {
    const response = await axios.get(requestUrl);
    dispatch({ type: GET_TODAY_ITEMS, payload: response.data });
  } catch (error) {
    console.error("[DashboardApiCall] fetchTodayItems Error : ", error.message);
  }
};

// Fetch data from today members
export const fetchTodayMembers = () => async (dispatch) => {
  console.log("[DashboardApiCall] fetchTodayMembers Called");

  const requestUrl = `${prefix}/api/monitoring/today-members`;

  try {
    const response = await axios.get(requestUrl);
    dispatch({ type: GET_TODAY_MEMBERS, payload: response.data });
  } catch (error) {
    console.error(
      "[DashboardApiCall] fetchTodayMembers Error : ",
      error.message
    );
  }
};

// Fetch data from sales statistics
export const fetchSalesStatistics = (inputs) => async (dispatch) => {
  console.log("[DashboardApiCall] fetchSalesStatistics Called");
  //   console.log(inputs);

  // Filter out empty or undedefined values
  const shouldIncludeParam = (value) => {
    return (
      value !== null &&
      value !== undefined &&
      value !== "" &&
      value.trim() !== ""
    );
  };
  /* In Object.entries(inputs).filter(([_, value]) => shouldIncludeParam(value))
   * [_, value] is used to ignore the key and only use the value.
   * _ is a placeholder for the first parameter (the key) that we don't need to use.
   * It's a common JavaScript convention for unused parameters.
   */
  const filteredInputs = Object.fromEntries(
    Object.entries(inputs).filter(([_, value]) => shouldIncludeParam(value))
  );

  const params = new URLSearchParams(filteredInputs);
  const requestUrl = `${prefix}/api/monitoring/sales-statistics?${params}`;
  console.log(requestUrl);

  try {
    const response = (await axios.get(requestUrl, inputs)).data;
    dispatch({ type: GET_SALES_STATISTICS, payload: response });
    // console.log(response);
  } catch (error) {
    console.error(
      "[DashboardApiCall] fetchSalesStatistics Error : ",
      error.message
    );
  }
};

// Fetch data from liked statistics
export const fetchLikedStatistics = (inputs) => async (dispatch) => {
  console.log("[DashboardApiCall] fetchLikedStatistics Called");
  console.log(inputs);

  // Filter out empty or undedefined values
  const shouldIncludeParam = (value) => {
    return (
      value !== null &&
      value !== undefined &&
      value !== "" &&
      value.trim() !== ""
    );
  };

  const filteredInputs = Object.fromEntries(
    Object.entries(inputs).filter(([_, value]) => shouldIncludeParam(value))
  );
  const params = new URLSearchParams(filteredInputs);
  const requestUrl = `${prefix}/api/monitoring/liked-statistics?${params}`;
  console.log(requestUrl);

  try {
    const response = (await axios.get(requestUrl, inputs)).data;
    dispatch({ type: GET_LIKED_STATISTICS, payload: response });
  } catch (error) {
    console.error(
      "[DashboardApiCall] fetchLikedStatistics Error : ",
      error.message
    );
  }
};

// Fetch product list
export const fetchProductList = () => async (dispatch) => {
  console.log("[DashboardApiCall] fetchProductList Called");

  const requestUrl = `${prefix}/api/monitoring/product-list`;
  console.log(requestUrl);

  try {
    const response = (await axios.get(requestUrl)).data;
    dispatch({ type: GET_PRODUCT_LIST, payload: response });
  } catch (error) {
    console.error(
      "[DashboardApiCall] fetchProductList Error : ",
      error.message
    );
  }
};

// Fetch brand list
export const fetchBrandList = () => async (dispatch) => {
  console.log("[DashboardApiCall] fetchBrandList Called");

  const requestUrl = `${prefix}/api/monitoring/producer-list`;
  console.log(requestUrl);

  try {
    const response = (await axios.get(requestUrl)).data;
    dispatch({ type: GET_BRAND_LIST, payload: response });
  } catch (error) {
    console.error("[DashboardApiCall] fetchBrandList Error : ", error.message);
  }
};

// Update inputs for sales statistics
export const updateInputs = (componentId, inputs) => ({
  type: UPDATE_INPUTS,
  payload: { componentId, inputs },
});
