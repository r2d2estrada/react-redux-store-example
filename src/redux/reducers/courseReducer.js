import * as actionType from './../actions/actionTypes';
export default function courseReducer(state = [], action) {
    switch(action.type) {
        // Create Course State
        case actionType.CREATE_COURSE_SUCCESS:
            return [ ...state, { ...action.course } ];
        // Update Course State
        case actionType.UPDATE_COURSE_SUCCESS:
            return state.map(course => 
                course.id === action.course.id ? action.course : course
            )
        // Load Course State
        case actionType.LOAD_COURSES_SUCCESS:
            return action.courses;
        // Delete Course 
        case actionType.DELETE_COURSE_OPTIMISTIC:
            return state.filter(course => course.id !== action.course.id);
        // Initial State
        default: return state;
    }
}