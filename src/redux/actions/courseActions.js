import * as actions from './actionTypes';
import * as courseApi from './../../api/courseApi';
import { beginApiCall, apiCallError } from './apiStatusActions';

export function loadCourseSuccess(courses) {
    return {
        type: actions.LOAD_COURSES_SUCCESS,
        courses
    }
}

export function createCourseSuccess(course) {
    return {
        type: actions.CREATE_COURSE_SUCCESS,
        course
    }
}

export function updateCourseSuccess(course) {
    return {
        type: actions.UPDATE_COURSE_SUCCESS,
        course
    }
}

export function deleteCourseOptimistic(course) {
    return {
        type: actions.DELETE_COURSE_OPTIMISTIC,
        course
    }
}

export function loadCourses() {
    return function (dispatch) {
        dispatch(beginApiCall());
        return courseApi
            .getCourses()
            .then(courses => {
                dispatch(loadCourseSuccess(courses));
            })
            .catch(error => {
                dispatch(apiCallError(error));
                throw error;
            });
    }
}

export function saveCourse(course) {
    return function (dispatch) {
        dispatch(beginApiCall());
        return courseApi
            .saveCourse(course)
            .then(savedCourse => {
                course.id
                    ? dispatch(updateCourseSuccess(savedCourse))
                    : dispatch(createCourseSuccess(savedCourse))
            })
            .catch(error => {
                dispatch(apiCallError(error));
                throw error;
            })
    }
}

export function deleteCourse(course) {
    return function (dispatch) {
        dispatch(deleteCourseOptimistic(course));
        return courseApi.deleteCourse(course.id)
    }
}