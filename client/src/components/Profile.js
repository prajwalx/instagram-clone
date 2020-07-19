import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/postActions';
import {Navbar,NavDropdown,Nav,Form,FormControl,Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';

class Profile extends Component {

  render() {
    return (
        
      <div>
        <div className="Profile container"style={{backgroundColor:'white'}}>
            <div className="row">
                <div className="col-2">
                    <img width="200px"height="200px" src={this.props.location.user.picture}
                    className="img-rounded"></img>
                </div>
                <div className="col-10">
                    <div style={{paddingLeft:'40px'}}>
                        <h2>{this.props.location.user.name}</h2>
                        {/* <p>{this.props.location.user.email}</p> */}
                        <p>{this.props.location.user.bio || "Hard Worker , Serial Entrepreneur, Hacker"}</p>
                        <p>{this.props.location.user.location || "New Delhi, India"}</p>
                        <button type="button" className="btn btn-outline-primary">Add Friend</button>
                    </div>
                </div>
            </div>
            <br/>
            <hr></hr>
            <div className="text-center"><h4>Posts</h4></div>
            <hr></hr>
            {/* <br/> */}
            <div className="row">
                <div className="col-3">
                    <div className="profile-posts pb-4">
                        <img src="https://dummyimage.com/hd1080"width="100%"height="100%"></img>
                    </div>
                </div>
                <div className="col-3">
                    <div className="profile-posts pb-4">
                        <img src="https://dummyimage.com/hd1080"width="100%"height="100%"></img>
                    </div>
                </div>
                <div className="col-3">
                    <div className="profile-posts pb-4">
                        <img src="https://dummyimage.com/hd1080"width="100%"height="100%"></img>
                    </div>
                </div>
                <div className="col-3">
                    <div className="profile-posts pb-4">
                        <img src="https://dummyimage.com/hd1080"width="100%"height="100%"></img>
                    </div>
                </div>
                <div className="col-3">
                    <div className="profile-posts pb-4">
                        <img src="https://dummyimage.com/hd1080"width="100%"height="100%"></img>
                    </div>
                </div>
                <div className="col-3">
                    <div className="profile-posts pb-4">
                        <img src="https://dummyimage.com/hd1080"width="100%"height="100%"></img>
                    </div>
                </div>
            </div>
        </div>
      </div>
    );
  }
}


export default Profile

