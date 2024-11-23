import { createActions, handleActions } from "redux-actions";

// Initial state for the dashboard module
const initialState = {
    todayStatistics: { data: null },
    salesStatistics: { inputs: {}, data: null },
    topSales: { data: null },   // Uses data from salesStatistics
    likedStatistics: { inputs: {}, data: null },
    topLiked: { data: null },    // Uses data from likedStatistics
};

// Action types for the dashboard module
export const GET_TODAY_STATISTICS = 'dashboard/GET_TODAY_STATISTICS';
export const GET_SALES_STATISTICS = 'dashboard/GET_SALES_STATISTICS';
export const GET_LIKED_STATISTICS = 'dashboard/GET_LIKED_STATISTICS';
export const UPDATE_INPUTS = 'dashboard/UPDATE_INPUTS';

// Action creators for the dashboard module
const actions = createActions({
    GET_TODAY_STATISTICS: () => {},
    GET_SALES_STATISTICS: () => {},
    GET_LIKED_STATISTICS: () => {},
    UPDATE_INPUTS: () => {},
});

// Reducer for the dashboard module
const dashboardReducer = handleActions({
    [GET_TODAY_STATISTICS]: (state, action) => {
        return { ...state, todayStatistics: action.payload };
    },
    [GET_SALES_STATISTICS]: (state, action) => {
        return { ...state, salesStatistics: action.payload };
    },
    [GET_LIKED_STATISTICS]: (state, action) => {
        return { ...state, likedStatistics: action.payload };
    },
    [UPDATE_INPUTS]: (state, action) => {
        return { ...state, salesStatistics: { ...state.salesStatistics, inputs: action.payload } };
    },
}, initialState);

export default dashboardReducer;
