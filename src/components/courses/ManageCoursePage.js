import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadCourses } from './../../redux/actions/courseActions';
import { loadAuthors } from './../../redux/actions/authorActions';
import PropTypes from 'prop-types';

class ManageCoursePage extends Component {
    
    componentDidMount() {
        const { courses, authors, loadAuthors, loadCourses } = this.props;

        if(courses.length === 0) {
            loadCourses()
                .catch(err => console.log(err));
        }

        if(authors.length === 0) {
            loadAuthors()
                .catch(err => console.log(err));
        }
    }
    
    render() {
        return (
            <div id='ManageCoursePage' className='manage-course-page container mt-3'>
                <h2>Manage Course</h2>
            </div>        
        );
    }
}

ManageCoursePage.propTypes = {
    courses: PropTypes.array.isRequired,
    authors: PropTypes.array.isRequired,
    loadCourses: PropTypes.func.isRequired,
    loadAuthors: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        courses: state.courses,
        authors: state.authors
    }
}

const mapDispatchToProps = {       
    loadCourses,
    loadAuthors
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);