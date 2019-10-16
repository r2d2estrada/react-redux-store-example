import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const CourseList = ({ courses }) => {
    return (
        <table className='table'>
            <thead>
                <tr>
                    <th />
                    <th>Title</th>
                    <th>Author</th>
                    <th>Category</th>
                </tr>
            </thead>
            <tbody>
                {
                    courses.map(course => {
                        return (
                            <tr key={course.id}>
                                <td>
                                    <a className='btn btm-light'
                                        href={`http://pluralsight.com/courses/${course.slug}`}
                                    >Watch</a>
                                </td>
                                <td>
                                    <Link to={`/courses/${course.slug}`}>{course.title}</Link>
                                </td>
                                <td>{course.authorName}</td>
                                <td>{course.category}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    );
}

CourseList.propTypes = {
    courses: PropTypes.array.isRequired
}

export default CourseList;