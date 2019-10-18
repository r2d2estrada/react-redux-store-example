import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadCourses, saveCourse } from './../../redux/actions/courseActions';
import { loadAuthors } from './../../redux/actions/authorActions';
import PropTypes from 'prop-types';
import CourseForm from './CourseForm';
import { newCourse } from './../../../tools/mockData';
import Spinner from './../common/Spinner';
import { toast } from 'react-toastify';

class ManageCoursePage extends Component {

    state = {
        course: { ...this.props.course },
        errors: {},
        saving: false
    }

    formIsValid = () => {
        const { title, authorId, category } = this.state.course;
        const errors = {};

        if (!title) errors.title = "Title is required";
        if (!authorId) errors.authorId = 'Auhtor is required';
        if (!category) errors.category = 'Category is required';

        this.setState({ errors });

        return Object.keys(errors).length === 0;
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        let obj = { ...this.state.course };
        obj[name] = name === 'authorId' ? parseInt(value, 10) : value;
        this.setState({ course: obj });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (!this.formIsValid()) return;
        this.setState({ saving: true });
        this.props.saveCourse(this.state.course)
            .then(() => {
                toast.success('Course saved');
                this.props.history.push('/courses');
            })
            .catch(error => {
                this.setState({
                    saving: false,
                    errors: {
                        onSave: error.message
                    }
                });
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
        const { courses, authors } = this.props;
        const { course, errors, saving } = this.state;

        return (
            <div className='container mt-3'>
                {
                    courses.length === 0 || authors.length === 0
                        ? (
                            <Spinner />
                        ) : (
                            <CourseForm
                                course={course}
                                errors={errors}
                                authors={authors}
                                onChange={this.handleChange}
                                onSave={this.handleSubmit}
                                saving={saving}
                            />
                        )
                }
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