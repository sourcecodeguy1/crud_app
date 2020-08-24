import React, {Component} from 'react';
import {Alert, Container, Jumbotron, Form, Button} from "react-bootstrap";
import '../App.css';

import axios from 'axios';

class AddPost extends Component{

    constructor(props) {
        super(props);
        this.state = {post_title: "", post_message: "", alert_message: ""};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    handleSubmit(e){

        /** Prevent the page from reloading **/
        e.preventDefault();

        let postTitle = this.state.post_title;
        let postMsg   = this.state.post_message;

        if(postTitle !== ""){
            if(postMsg !== ""){

                //alert(`Title: ${this.state.post_title}, Message: ${this.state.post_message}`);

                /** Post the data using axios to save it in the database **/

                 const postData = {post_title: postTitle, post_msg: postMsg};

                 axios.post('/add', postData).then(res => {

                     console.log(res);
                     if(res.status === 200){

                         this.props.history.push('/show');

                     } else{
                         this.setState({alert_message: "error"});
                     }


                 });

                /** Empty the inputs **/
                this.setState({post_title: "", post_message: ""});

                document.getElementById('alert').style.visibility = "hidden";
                document.getElementById('alert').innerHTML = "";

                document.getElementById('post_title').style.backgroundColor = "white";
                document.getElementById('post_message').style.backgroundColor = "white";



            }else{
                //alert("Add post message");
                document.getElementById('post_message').style.backgroundColor = "#facfcf";
                document.getElementById('alert').style.visibility = "visible";
                document.getElementById('alert').innerHTML = "Please enter post message"
            }
        } else{
            //alert("Add post title");
            document.getElementById('post_title').style.backgroundColor = "#facfcf";
            document.getElementById('alert').style.visibility = "visible";
            document.getElementById('alert').innerHTML = "Please enter post title"
        }

    }

    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value});
    }

    render(){
        return (
            <div className="App">
                <Container>
                    <Jumbotron>
                        {this.state.alert_message === "success" ? <Alert variant={"success"}>Data saved!</Alert>:null}
                        <Alert id={"alert"} variant={"danger"} style={{visibility:"hidden"}}>

                        </Alert>
                        <h1>Add Post</h1>

                            <Form onSubmit={this.handleSubmit}>
                                <Form.Group controlId="post_title">
                                    <Form.Control
                                        name={"post_title"}
                                        type={"text"}
                                        placeholder={"Add post title"}
                                        value={this.state.post_title}
                                        onChange={this.handleChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId={"post_message"}>
                                    <Form.Control
                                        name={"post_message"}
                                        as={"textarea"}
                                        rows={"3"}
                                        placeholder={"Add post message"}
                                        value={this.state.post_message}
                                        onChange={this.handleChange}
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>

                    </Jumbotron>
                </Container>
            </div>
        );
    }
}

export default AddPost;
