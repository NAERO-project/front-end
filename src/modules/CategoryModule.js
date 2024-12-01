import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const GET_PRODUCTS_CATEGORY01 = 'product/GET_PRODUCTS_CATEGORY01';
export const GET_PRODUCTS_CATEGORY02 = 'product/GET_PRODUCTS_CATEGORY02';
// export const SET_MEDIUM_CATEGORIES = 'product/SET_MEDIUM_CATEGORIES';

const actions = createActions({
    [GET_PRODUCTS_CATEGORY01]: () =>{},
    [GET_PRODUCTS_CATEGORY02]: () =>{}
    // [SET_MEDIUM_CATEGORIES]: () =>{}
});

export const largeCategoryReducer = handleActions({
    [GET_PRODUCTS_CATEGORY01]: (state, {payload}) =>{
        return payload
    }
}, initialState);


export const mediumCategoryReducer = handleActions({
    [GET_PRODUCTS_CATEGORY02]: (state, {payload}) =>{
        return payload
    }
}, initialState); 

// export const mediumCategoryReducer = (state = initialState, action) =>{

//     switch (action.type){
//         case 'SET_MEDIUM_CATEGORIES':
//             return action.payload;
//         default:
//             return state;
//     }
// }


