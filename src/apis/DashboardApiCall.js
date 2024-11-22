import axios from "axios";
import { 
    GET_TODAY_STATISTICS, 
    GET_SALES_STATISTICS, 
    GET_LIKED_STATISTICS, 
    UPDATE_INPUTS 
} from "../modules/DashboardModule";

const prefix = `http://${process.env.REACT_APP_RESTAPI_IP}:8080`;

// Fetch data from today statistics
export const fetchTodayStatistics = () => async (dispatch) => {
    console.log('[DashboardApiCall] fetchTodayStatistics Called');

    const requestUrl = `${prefix}/api/monitoring/today-sales`;

    try {
        const response = await axios.get(requestUrl);
        dispatch({ type: GET_TODAY_STATISTICS, payload: response.data });
    } catch (error) {
        console.error('[DashboardApiCall] fetchTodayStatistics Error : ', error.message);
    }
};

// Fetch data from sales statistics
export const fetchSalesStatistics = (inputs) => async (dispatch) => {
    console.log('[DashboardApiCall] fetchSalesStatistics Called');

    const requestUrl = `${prefix}/api/dashboard/sales-statistics`;

    try {
        const response = await axios.post(requestUrl, inputs);
        dispatch({ type: GET_SALES_STATISTICS, payload: response.data });
    } catch (error) {
        console.error('[DashboardApiCall] fetchSalesStatistics Error : ', error.message);
    }
};

// Fetch data from liked statistics
export const fetchLikedStatistics = (inputs) => async (dispatch) => {
    console.log('[DashboardApiCall] fetchLikedStatistics Called');

    const requestUrl = `${prefix}/api/dashboard/liked-statistics`;

    try {
        const response = await axios.post(requestUrl, inputs);
        dispatch({ type: GET_LIKED_STATISTICS, payload: response.data });
    } catch (error) {
        console.error('[DashboardApiCall] fetchLikedStatistics Error : ', error.message);
    }
};

// Update inputs for sales statistics
export const updateInputs = (componentId, inputs) => ({
    type: UPDATE_INPUTS,
    payload: { componentId, inputs },
});
