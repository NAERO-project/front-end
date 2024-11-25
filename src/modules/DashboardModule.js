import { createActions, handleActions } from "redux-actions";

// Initial state for the dashboard module
const initialState = {
  // todayStatistics: { data: null },
  todaySales: { data: null },
  todayQuantity: { data: null },
  todayItems: { data: null },
  todayMembers: { data: null },
  salesStatistics: { inputs: {}, data: null },
  topSales: { data: null }, // Uses data from salesStatistics
  likedStatistics: { inputs: {}, data: null },
  topLiked: { data: null }, // Uses data from likedStatistics
};

// Action types for the dashboard module
// export const GET_TODAY_STATISTICS = "dashboard/GET_TODAY_STATISTICS";
export const GET_TODAY_SALES = "dashboard/GET_TODAY_SALES";
export const GET_TODAY_QUANTITY = "dashboard/GET_TODAY_QUANTITY";
export const GET_TODAY_ITEMS = "dashboard/GET_TODAY_ITEMS";
export const GET_TODAY_MEMBERS = "dashboard/GET_TODAY_MEMBERS";
export const GET_SALES_STATISTICS = "dashboard/GET_SALES_STATISTICS";
export const GET_LIKED_STATISTICS = "dashboard/GET_LIKED_STATISTICS";
export const UPDATE_INPUTS = "dashboard/UPDATE_INPUTS";

// Action creators for the dashboard module
const actions = createActions({
  // GET_TODAY_STATISTICS: () => {},
  GET_TODAY_SALES: () => {},
  GET_TODAY_QUANTITY: () => {},
  GET_TODAY_ITEMS: () => {},
  GET_TODAY_MEMBERS: () => {},
  GET_SALES_STATISTICS: () => {},
  GET_LIKED_STATISTICS: () => {},
  UPDATE_INPUTS: () => {},
});

// Reducer for the dashboard module
const dashboardReducer = handleActions(
  {
    // [GET_TODAY_STATISTICS]: (state, action) => {
    //   return { ...state, todayStatistics: { data: action.payload } };
    // },
    [GET_TODAY_SALES]: (state, action) => {
      return { ...state, todaySales: { data: action.payload } };
    },
    [GET_TODAY_QUANTITY]: (state, action) => {
      return { ...state, todayQuantity: { data: action.payload } };
    },
    [GET_TODAY_ITEMS]: (state, action) => {
      return { ...state, todayItems: { data: action.payload } };
    },
    [GET_TODAY_MEMBERS]: (state, action) => {
      return { ...state, todayMembers: { data: action.payload } };
    },
    [GET_SALES_STATISTICS]: (state, action) => {
      return { ...state, salesStatistics: { data: action.payload } };
    },
    [GET_LIKED_STATISTICS]: (state, action) => {
      return { ...state, likedStatistics: { data: action.payload } };
    },
    [UPDATE_INPUTS]: (state, action) => {
      const { componentId, inputs } = action.payload;
      console.log("state", state[componentId]);
      console.log("action.payload", action.payload);
      return {
        /* Ourder State: Represents the entire state of the dashboard module 
            Inner State: Represents the specific part of the state(e.g., salesStatistics, likedStatistics) that needs to be updated.
        */
        ...state,
        [componentId]: { ...state[componentId], inputs },
      };
    },
  },
  initialState
);

export default dashboardReducer;