import React, {Component} from "react";

import {Container, Jumbotron} from "react-bootstrap";

class Home extends Component{

    render() {
        return (
            <Container>
                <Jumbotron>
                    <h2>Welcome to CRUD React App</h2>
                    <p>
                        This is a simple little web program to add your posts using the
                        MERN STACK (MySQL, Express, React, Node).
                    </p>
                </Jumbotron>
            </Container>
        );
    }
}

export default Home;