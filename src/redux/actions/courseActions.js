import * as actions from './actionTypes';
import * as courseApi from './../../api/courseApi';

export function createCourse(course) {
    return {
        type: actions.CREATE_COURSE,
        course
    };
}

export function loadCourseSuccess(courses) {
    return {
        type: actions.LOAD_COURSES_SUCCESS,
        courses
    }
}

export function loadCourses() {
    return function (dispatch) {
        return courseApi.getCourses().then(courses => {
            dispatch(loadCourseSuccess(courses));
        }).catch(error => {
            throw error;
        });
    }
}