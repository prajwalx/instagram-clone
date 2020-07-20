import React, { Component } from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Link,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {isLoggedIn} from './actions/postActions'
import 'bootstrap/dist/css/bootstrap.min.css';

import NavbarComponent from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import Users from './components/Users';
import history from './components/history';
import Profile from './components/Profile';
import NewsFeed from './components/NewsFeed';
import Friends from './components/Friends';
import Requests from './components/Requests';


class App extends Component {
  componentDidMount(){
    this.props.isLoggedIn();
  }
  render() {

    const PrivateRoute = ({  ...props }) =>
      this.props.auth
        ? <Route { ...props } />
        : <Redirect to="/login" />
    
    const PublicOnlyRoute = ({  ...props }) =>
        this.props.auth
          ? <Redirect to="/" />
          : <Route { ...props } />

    return (
        <Router history={history}>
          <div className="App">
            <NavbarComponent/>
            <br/>
            <br/>

            <Switch>
              <PublicOnlyRoute exact={true} path="/login"   component={(Login)} />
              <PublicOnlyRoute exact={true} path="/signup"  component={(Signup)} />
              <PrivateRoute exact={true} path="/users"   component={(Users)}/>
              <PrivateRoute exact={true} path="/profile"   component={(Profile)}/>
              <PrivateRoute exact={true} path="/friends"   component={(Friends)}/>
              <PrivateRoute exact={true} path="/requests"   component={(Requests)}/>
              <PrivateRoute exact={true} path="/"   component={(NewsFeed)}/>
            </Switch>
              
          </div>
        </Router>
    );
  }
}


const mapStateToProps = state =>  ({
  auth: state.posts.auth
});

Signup.propTypes = {
  isLoggedIn : PropTypes.func.isRequired,
  auth: PropTypes.bool
};

export default connect(mapStateToProps, { isLoggedIn })(App);
