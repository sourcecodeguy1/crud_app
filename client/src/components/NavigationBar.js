import React, {Component} from 'react';

import {Container, Navbar, Nav} from "react-bootstrap";
import {Link} from 'react-router-dom';


class NavigationBar extends Component{
    render(){
        return (
            <div className="">
                <Navbar bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand as={Link} to="/">CRUD React App</Navbar.Brand>
                        <Nav className="mr-auto">
                            <Nav.Link as={Link} to="/add">Add Post</Nav.Link>
                            <Nav.Link as={Link} to="/show">Show Post</Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
            </div>
        );
    }
}

export default NavigationBar;
