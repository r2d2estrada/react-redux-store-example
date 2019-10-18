import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './home/HomePage';
import AboutPage from './about/AboutPage';
import Header from './common/Header';
import Courses from './courses/CoursesPage';
import ManageCoursePage from './courses/ManageCoursePage';
import NotFound from './NotFound';
import { ToastContainer } from 'react-toastify';

function App() {
    return (
        <div className='App'>
            <Header />
            <Switch>
                <Route exact path='/' component={HomePage} />
                <Route path='/about' component={AboutPage} />
                <Route path='/course/:slug' component={ManageCoursePage} />
                <Route path='/course/' component={ManageCoursePage} />
                <Route path='/courses' component={Courses} />
                <Route component={NotFound} />
            </Switch>
            <ToastContainer autoClose={3000} hideProgressBar />
        </div>
    )
}

export default App;