import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchSentFriendRequests, fetchReceivedFriendRequests } from '../actions/postActions';
import {Navbar,NavDropdown,Nav,Form,FormControl,Button} from 'react-bootstrap';
import {Link,withRouter} from 'react-router-dom';

class NewsFeed extends Component {
   constructor(props) {
       super(props);
       this.props.fetchSentFriendRequests();
       this.props.fetchReceivedFriendRequests();
    }

  render() {
    return (
        <div className="container"style={{backgroundColor:'white',
        alignItems:'center',maxWidth:'600px'
        }}>
            <div className="row">
                <div className="small-img col-1">
                    <img src="https://previews.123rf.com/images/triken/triken1608/triken160800029/61320775-male-avatar-profile-picture-default-user-avatar-guest-avatar-simply-human-head-vector-illustration-i.jpg"
                        className="rounded-circle" width="60px"height="60px"></img>
                </div>
                <div className="col-11 d-flex align-items-center pl-4">
                    <h4>Alex</h4>
                </div>
            </div>
            <div className="row">
                <div className="col-12 p-0">
                    <img src="https://dummyimage.com/hd1080"width="100%"height="100%"></img>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-12">
                    <div className="d-flex">
                        <button className="btn btn-outline-danger">Like</button>
                        <p className="ml-auto">Fri 17 July</p>
                    </div>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-12">
                    <div>
                        <p>Some Cool Caption here</p>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="small-img col-1">
                    <img src="https://previews.123rf.com/images/triken/triken1608/triken160800029/61320775-male-avatar-profile-picture-default-user-avatar-guest-avatar-simply-human-head-vector-illustration-i.jpg"
                        className="rounded-circle" width="60px"height="60px"></img>
                </div>
                <div className="col-11 d-flex align-items-center pl-4">
                    <h4>Alex</h4>
                </div>
            </div>
            <div className="row">
                <div className="col-12 p-0">
                    <img src="https://dummyimage.com/hd1080"width="100%"height="100%"></img>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-12">
                    <div className="d-flex">
                        <button className="btn btn-outline-danger">Like</button>
                        <p className="ml-auto">Fri 17 July</p>
                    </div>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-12">
                    <div>
                        <p>Some Cool Caption here</p>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="small-img col-1">
                    <img src="https://previews.123rf.com/images/triken/triken1608/triken160800029/61320775-male-avatar-profile-picture-default-user-avatar-guest-avatar-simply-human-head-vector-illustration-i.jpg"
                        className="rounded-circle" width="60px"height="60px"></img>
                </div>
                <div className="col-11 d-flex align-items-center pl-4">
                    <h4>Alex</h4>
                </div>
            </div>
            <div className="row">
                <div className="col-12 p-0">
                    <img src="https://dummyimage.com/hd1080"width="100%"height="100%"></img>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-12">
                    <div className="d-flex">
                        <button className="btn btn-outline-danger">Like</button>
                        <p className="ml-auto">Fri 17 July</p>
                    </div>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-12">
                    <div>
                        <p>Some Cool Caption here</p>
                    </div>
                </div>
            </div>
            
        </div>

        
    );
  }
}
/* 
    Get Friend Requests for the logged in user
    1.Sent by user
    2.Received by user
 */
NewsFeed.propTypes = {
    fetchSentFriendRequests: PropTypes.func.isRequired,
    fetchReceivedFriendRequests: PropTypes.func.isRequired
  };
  
  const mapStateToProps = state => ({
  });
// export default withRouter(NewsFeed)
export default connect(mapStateToProps, { fetchSentFriendRequests, fetchReceivedFriendRequests })(NewsFeed);
