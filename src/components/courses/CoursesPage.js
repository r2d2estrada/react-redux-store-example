import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as courseActions from './../../redux/actions/courseActions';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

class CoursesPage extends Component {
    state = {
        course: {
            title: '',
        }
    }

    handleChange = (event) => {
        const course = { ...this.state.course, title: event.target.value };
        this.setState({ course });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.actions.createCourse(this.state.course);
        const course = { ...this.state.course, title: '' };
        this.setState({ course })
    }

    render() {
        return (
            <div className='container'>
                <form onSubmit={this.handleSubmit}>
                    <h2>Courses</h2>
                    <h3>Add Courses</h3>
                    <input type='text' onChange={this.handleChange} value={this.state.course.title} />
                    <input type='submit' value='Save' />
                    {
                        this.props.courses.map(course => (
                            <div key={course.title}>{course.title}</div>
                        ))
                    }
                </form>
            </div>
        );
    }
}

CoursesPage.propTypes = {
    courses: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        courses: state.courses    
    }
}

// const mapDispatchToProps = {
//     createCourse: courseActions.createCourse
// }

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(courseActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);