import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as courseActions from './../../redux/actions/courseActions';
import * as authorActions from './../../redux/actions/authorActions';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import CourseList from './CourseList';

class CoursesPage extends Component {
    componentDidMount() {
        const { loadAuthors, loadCourses } = this.props.actions;
        const { courses, authors } = this.props;

        if(courses === 0) {
            loadCourses()
                .catch(err => alert('Loading Courses Failed' + err));
        }

        if(authors) {
            loadAuthors()
                .catch(err => alert('Loading Authors Failed' + err));
        }
    }
    
    render() {
        return (
            <div className='container mt-3'>
                <h2>Courses</h2><hr />
                <CourseList courses={this.props.courses} />
            </div>
        );
    }
}

CoursesPage.propTypes = {
    courses: PropTypes.array.isRequired,
    authors: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        courses:
            state.authors.length === 0
                ? []
                : state.courses.map(course => {
                    return {
                        ...course,
                        authorName: state.authors.find(a => a.id === course.authorId).name
                    }
        })
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
            loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);