import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Navbar,Nav,Form,Button,FormControl,NavDropdown} from 'react-bootstrap';
import {Link,withRouter} from 'react-router-dom';
import {logOut,fetchUsers} from '../actions/postActions'

class NavbarComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query:''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const apiParams = {
      query: this.state.query,
      history:this.props.history
    };

    this.props.fetchUsers(apiParams);
  }

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
      const Settings = (
        <NavDropdown title="Settings" id="basic-nav-dropdown">
                <NavDropdown.Item ><Link to={{pathname:"/profile",user:this.props.user}}>Profile</Link></NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item ><Link to={{pathname:"/requests"}}>Requests</Link></NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Edit</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={this.props.logOut}>LogOut</NavDropdown.Item>
        </NavDropdown>
      )
      const SearchBar = (
        <Fragment>
          <Form inline onSubmit={this.onSubmit}>
            <FormControl type="text" placeholder="Search" className="ml-2 mr-1"style={{width:'400px'}}
              name="query"
              onChange={this.onChange}
              value={this.state.query} />
              {/* <Link to="/users"> */}
                <Button variant="outline-danger"type="submit">Search</Button>
              {/* </Link> */}
          </Form>
        </Fragment>
      )

    return (
      <div>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">Social Net App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="">
              <Nav.Link><Link to="/">Home</Link></Nav.Link>
              { this.props.auth === true && <Nav.Link><Link to="/friends">Friends</Link></Nav.Link>}
              { this.props.auth === true && SearchBar }
            </Nav>
            <Form inline className="ml-auto mr-5">
              { this.props.auth === false && LoginSignupButtons }
              { this.props.auth === true && Settings }
            </Form>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

NavbarComponent.propTypes = {
  logOut: PropTypes.func.isRequired,
  fetchUsers: PropTypes.func.isRequired,
  user: PropTypes.object,
  auth: PropTypes.bool
};

const mapStateToProps = state => ({
  user: state.posts.user,
  auth: state.posts.auth
});

export default withRouter(connect(mapStateToProps, {logOut,fetchUsers})(NavbarComponent));
