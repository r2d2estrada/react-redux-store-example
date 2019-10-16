import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <Navbar bg="dark" expand="lg" variant='dark'>
            <Container>
                <Navbar.Brand as={Link} to='/'>Plural Sight Redux</Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='mr-auto'>
                        <Nav.Link as={Link} to='/' activeClassName='active'>Home</Nav.Link>
                        <Nav.Link as={Link} to='/about' activeClassName='active'>About</Nav.Link>
                        <Nav.Link as={Link} to='/courses' activeClassName='active'>Courses</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;