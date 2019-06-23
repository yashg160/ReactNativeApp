import * as ActionTypes from './ActionTypes';

export const promotions = (state = {
    isLoading: true,
    errMess: null,
    promotions:[]
    },
    action) => {
    switch (action.type) {
        case (ActionTypes.ADD_PROMOS):
            return { ...state, isLoading: false, errMess: null, promos: payload }
        case (ActionTypes.PROMOS_LOADING):
            return { ...state, isLoading: true, errMess: null, promos: [] }
        case (ActionTypes.PROMOS_FAILED):
            return { ...state, isLoading: false, errMess: action.payload, promos: [] }
        default:
            return state;
    }
}