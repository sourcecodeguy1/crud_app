import React, {Component} from "react";

import {Alert, Container, Jumbotron, Form, Button} from "react-bootstrap";

import axios from 'axios';

class EditPost extends Component{

    constructor(props) {
        super(props);

        let id = this.props.match.params.id;


        this.state = {
            id: id,
            post_title: "",
            post_message: "",
            alert_message: "",
            isActive: true,
            posts: []
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDeleteBtn = this.handleDeleteBtn.bind(this);

    }

   async componentDidMount() {

        const url = `/edit/${this.state.id}`;

        let response = await axios.get(url);

        let data = response.data;

        this.setState({posts: data});

       this.state.posts.map(post =>

           this.setState({post_title: post.post_title, post_message: post.post_message}))

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

                const postData = {post_title: postTitle, post_message: postMsg};

                axios.put(`/edit/${this.state.id}`, postData).then(res => {

                    //console.log("EditPost " , res.data.result);

                    if(res.data.changedRows === 1){

                        this.props.history.push('/show');

                    } else{
                        this.setState({alert_message: "error", isActive: true});
                    }


                });

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

    handleDeleteBtn(e){
        e.preventDefault();

        /** Create route to server to delete current post **/

        axios.delete(`/edit/${this.state.id}`).then(res => {

           if(res.data.affectedRows === 1){
               this.props.history.push('/show');
           } else {
               this.setState({alert_message: "error", isActive: true});
           }

        });

    }


    hideAlert() {

        this.setState({
            isActive: false,
        });

    }

    render() {

            return (
                <Container>
                    <Jumbotron>
                        {(this.state.isActive && this.state.alert_message === "error") ?
                            <Alert id={"alert_component_msg"} variant={"danger"} onClose={() => this.hideAlert()} dismissible>No changes
                                made</Alert> : null}

                        <Alert id={"alert"} variant={"danger"} style={{visibility: "hidden"}}>

                        </Alert>
                        <h2>Welcome to the edit page for post with id {this.state.id}</h2>

                        <Form>
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
                            <Button variant="success" type="submit" onClick={this.handleSubmit}>
                                Update
                            </Button>
                            <br/><br/>
                            <Button variant="danger" type={"submit"} onClick={this.handleDeleteBtn}>
                                Delete
                            </Button>
                        </Form>

                    </Jumbotron>
                </Container>
            );
        }

}

export default EditPost;