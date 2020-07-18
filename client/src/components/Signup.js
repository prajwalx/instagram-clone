import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createUser } from '../actions/postActions'

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
          name:'',
          email:'',
          password:''
        };
    
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
      }
    
      onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
      }
    
      onSubmit(e) {
        e.preventDefault();

        const user = {
          name: this.state.name,
          email: this.state.email,
          password: this.state.password
        };
        
        this.props.createUser(user)
      }
  

  render() {

    return (
        <div className="auth-wrapper">
        <div className="auth-inner">
        <form onSubmit={this.onSubmit}>
                <h3>Sign Up</h3>

                <div className="form-group">
                    <label>Name</label>
                    <input type="text" className="form-control" placeholder="First name"
                        name="name"
                        onChange={this.onChange}
                        value={this.state.name} />
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" 
                        name="email"
                        onChange={this.onChange}
                        value={this.state.email}/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" 
                        name="password"
                        onChange={this.onChange}
                        value={this.state.password}/>
                </div>

                {this.props.error != null && <div className="text-danger mb-3">{this.props.error}</div>}
                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered <a href="/login">sign in?</a>
                </p>
            </form>
            </div>
          </div>
    );
  }
}

const mapStateToProps = state =>  ({
    error: state.posts.error
});


Signup.propTypes = {
    createUser : PropTypes.func.isRequired,
    error: PropTypes.string
  };
  
  export default connect(mapStateToProps, { createUser })(Signup);
