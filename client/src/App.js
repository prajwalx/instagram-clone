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
import history from './components/history';


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
              <PublicOnlyRoute  path="/login"   component={Login} />
              <PublicOnlyRoute  path="/signup"  component={Signup} />
              <PrivateRoute     path="/" >Hello login user</PrivateRoute>
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
