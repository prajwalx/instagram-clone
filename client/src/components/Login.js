import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logIn } from '../actions/postActions'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      email: this.state.email,
      password: this.state.password,
      access_token: 'achDGvJeb4H5c95h8YxU7UEpEScxG8m9'
    };

    this.props.logIn(user);
  }
  

  render() {
  
    return (
        <div className="auth-wrapper">
            <div className="auth-inner">
              <form onSubmit={this.onSubmit}>
                <h3>Sign In</h3>

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
                <button type="submit" className="btn btn-primary btn-block">Submit</button>

            </form>
            </div>
          </div>
    );
  }
}

const mapStateToProps = state =>  ({
  error: state.posts.error
});


Login.propTypes = {
  logIn : PropTypes.func.isRequired,
  error: PropTypes.string
};

export default connect(mapStateToProps, { logIn })(Login);
