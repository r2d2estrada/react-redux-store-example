import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadCourses, saveCourse } from './../../redux/actions/courseActions';
import { loadAuthors } from './../../redux/actions/authorActions';
import PropTypes from 'prop-types';
import CourseForm from './CourseForm';
import { newCourse } from './../../../tools/mockData';

class ManageCoursePage extends Component {

    state = {
        course: { ...this.props.course },
        errors: {}
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        let obj = { ...this.state.course };
        obj[name] = name === 'authorId' ? parseInt(value, 10) : value;
        this.setState({ course: obj });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.saveCourse(this.state.course).then(() => {
            this.props.history.push('/courses');
        });
    }

    componentDidMount() {
        const { courses, authors, loadAuthors, loadCourses } = this.props;

        if (courses.length === 0) {
            loadCourses()
                .catch(err => console.log(err));
        }

        if (authors.length === 0) {
            loadAuthors()
                .catch(err => console.log(err));
        }
    }

    componentWillReceiveProps(nextProps) {
        const { course } = nextProps;
        this.setState({ course })
    }

    render() {
        return (
            <div className='container mt-3'>
                <CourseForm
                    course={this.state.course}
                    errors={this.state.errors}
                    authors={this.props.authors}
                    onChange={this.handleChange}
                    onSave={this.handleSubmit}
                />
            </div>
        );
    }
}

ManageCoursePage.propTypes = {
    course: PropTypes.object.isRequired,
    courses: PropTypes.array.isRequired,
    authors: PropTypes.array.isRequired,
    loadCourses: PropTypes.func.isRequired,
    loadAuthors: PropTypes.func.isRequired,
    saveCourse: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
};

function getCourseBySlug(courses, slug) {
    return courses.find(course => course.slug === slug) || null;
}

function mapStateToProps(state, ownProps) {
    const slug = ownProps.match.params.slug;
    const course =
        slug && state.courses.length > 0
            ? getCourseBySlug(state.courses, slug)
            : newCourse;
    return {
        course,
        courses: state.courses,
        authors: state.authors
    }
}

const mapDispatchToProps = {
    loadCourses,
    loadAuthors,
    saveCourse
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);