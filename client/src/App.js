import React, { Component } from 'react';
import './App.css';

import {Route, Switch} from 'react-router-dom';

import NavigationBar from "./components/NavigationBar";
import Home from './components/Home';
import AddPost from './components/AddPost';
import ShowPosts from "./components/ShowPosts";
import EditPost from "./components/EditPost";

class App extends Component {
  render() {
    return (
      <div className="App">

          <NavigationBar />
        <br />
        <Switch>
            <Route exact path={"/"} component={Home} />
            <Route exact path={"/add"} component={AddPost} />
            <Route exact path={"/show"} component={ShowPosts} />
            <Route exact path={"/edit/:id"} component={EditPost} />
        </Switch>

      </div>
    );
  }
}

export default App;
