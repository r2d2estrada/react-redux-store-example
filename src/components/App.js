import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './home/HomePage';
import AboutPage from './about/AboutPage';
import Header from './common/Header';
import Courses from './courses/CoursesPage';
import NotFound from './NotFound';

function App() {
    return (
        <div className='conatiner-fluid'>
            <Header />
            <Switch>
                <Route exact path='/' component={HomePage} />
                <Route path='/about' component={AboutPage} />
                <Route path='/courses' component={Courses} />
                <Route component={NotFound} />
            </Switch>
        </div>
    ) 
}

export default App;