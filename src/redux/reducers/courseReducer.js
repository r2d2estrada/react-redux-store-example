import * as actions from './../actions/actionTypes';
export default function courseReducer(state = [], action) {
    switch(action.type) {
        case actions.CREATE_COURSE:
            return [ ...state, { ...action.course } ]
        case actions.LOAD_COURSES_SUCCESS:
            return action.courses;
        default: return state;
    }
}