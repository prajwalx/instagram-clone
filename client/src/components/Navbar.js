import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Navbar,Nav,Form,Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {logOut} from '../actions/postActions'

class NavbarComponent extends Component {

  render() {
      const LoginSignupButtons = (
        <Fragment>
        <Link to="/login">
        <Button variant="primary"className="mr-sm-2">Login</Button>{' '}
        </Link>
        <Link to="/signup">
        <Button variant="success">Signup</Button>{' '}
        </Link>
        </Fragment>
      );
      const LogOutButton = (
        <Fragment>
          <Button variant="info"className="mr-sm-2"onClick={this.props.logOut}>Logout</Button>
        </Fragment>
      )

    return (
      <div>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">Social Net App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link><Link to="/">Home</Link></Nav.Link>
              <Nav.Link><Link to="/posts">Posts</Link></Nav.Link>
            </Nav>
            <Form inline>
              { this.props.auth === false && LoginSignupButtons }
              { this.props.auth === true && LogOutButton }
              
            </Form>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

NavbarComponent.propTypes = {
  logOut: PropTypes.func.isRequired,
  user: PropTypes.object,
  auth: PropTypes.bool
};

const mapStateToProps = state => ({
  user: state.posts.user,
  auth: state.posts.auth
});

export default connect(mapStateToProps, {logOut})(NavbarComponent);
