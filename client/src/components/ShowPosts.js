import React, {Component} from 'react';

import {Container, Jumbotron, Table} from "react-bootstrap";
import {Link} from 'react-router-dom';
import axios from 'axios';
import '../App.css';

import Paginate from "./Paginate";

class ShowPosts extends Component{

    constructor(props) {
        super(props);
        this.state = {
            activePage: 1,
            postPerPage: 5,
            posts: []
        }
        this.getPostId = this.getPostId.bind(this);
        this.changePage = this.changePage.bind(this);
    }

   async getPostId(id){

        const url = `/edit/${id}`;
        let response = await axios.get(url);
        let data = response.data;
        console.log(data);

    }

   async componentDidMount() {

       const url = '/show';
       let response = await axios.get(url);
       let data = response.data;
       console.log(data);
       this.setState({posts: data})

    }

    changePage(activePage){
        this.setState({activePage: activePage});
    }

    render(){
        const {posts, activePage, postPerPage} = this.state;

        const indexOfLastTodo = activePage * postPerPage;
        const indexOfFirstTodo = indexOfLastTodo - postPerPage;
        const currentTodos = posts.slice(indexOfFirstTodo, indexOfLastTodo);


        const renderPosts = currentTodos.map((post, index) => {
            return <tr key={index}>
                <td>{post.id}</td>
                <td>{post.post_title}</td>
                <td>{post.post_message}</td>
                <td>
                    <Link className={"btn btn-primary"} to={`/edit/${post.id}`} onClick={this.getPostId.bind(this,post.id)}>Edit</Link>
                </td>
            </tr>
        });

        return (
            <div className="App">
                <Container>
                    <Jumbotron>
                        <h1>Posts</h1>
                        <Table bordered hover variant="dark">
                            <thead>
                            <tr>
                                <th>id</th>
                                <th>Post Title</th>
                                <th>Post Message</th>
                                <th>Edit</th>
                            </tr>
                            </thead>
                            <tbody>
                            {renderPosts}
                            </tbody>

                        </Table>
                        <Paginate
                            activePage={activePage}
                            posts={posts.length}
                            postsPerPage={postPerPage}
                            paginate={this.changePage}
                        />
                    </Jumbotron>
                </Container>
            </div>
        );
    }
}

export default ShowPosts;
