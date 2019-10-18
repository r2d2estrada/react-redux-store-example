import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as courseActions from './../../redux/actions/courseActions';
import * as authorActions from './../../redux/actions/authorActions';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import CourseList from './CourseList';
import { Redirect } from 'react-router-dom';

class CoursesPage extends Component {

    state = {
        redirectToAddCoursePage: false
    };

    componentDidMount() {
        const { loadAuthors, loadCourses } = this.props.actions;
        const { courses, authors } = this.props;

        if(courses.length === 0) {
            loadCourses()
                .catch(err => alert('Loading Courses Failed' + err));
        }

        if(authors.length === 0) {
            loadAuthors()
                .catch(err => alert('Loading Authors Failed' + err));
        }
    }
    
    render() {
        return (
            <>
                {this.state.redirectToAddCoursePage && <Redirect to='/course' /> }
                <div className='container mt-3'>
                    <h2>Courses</h2><hr />
                    <button className='btn btn-primary mb-3' 
                        onClick={ () => this.setState( { redirectToAddCoursePage: true } ) }>Add Course
                    </button>
                    <CourseList courses={this.props.courses} />
                </div>
            </>
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
        }),
        authors: state.authors
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