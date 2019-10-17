import React from 'react';
import PropTypes from 'prop-types';

const CourseForm = ({
    course,
    authors,
    onSave,
    onChange,
    saving = false,
    errors = {}
}) => {
    return (
        <form id='CourseForm'></form>
    );
}

export default CourseForm;