import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {sendFriendRequest, respondToFriendRequest, fetchProfilePosts} from '../actions/postActions';
import {Navbar,NavDropdown,Nav,Form,FormControl,Button} from 'react-bootstrap';
import {Link, withRouter} from 'react-router-dom';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.hasUser = this.hasUser.bind(this);
        this.isFriend = this.isFriend.bind(this);
        this.sendFriendRequestClick = this.sendFriendRequestClick.bind(this);
        this.respondToFriendRequestClick = this.respondToFriendRequestClick.bind(this);
        this.props.fetchProfilePosts(this.props.location.user);
      }
    
      sendFriendRequestClick(toUser){
        // console.log(toUser)
        const friendrequestData ={
            toUser: toUser.id
        };
        this.props.sendFriendRequest(friendrequestData)
      }
      respondToFriendRequestClick(fromUser,status){
          //get friend request id from friend id
          let requestId = null;
          for(let friendRequest of this.props.receivedFriendRequests){
            if(friendRequest.fromUser.id===fromUser.id){
                requestId = friendRequest.id;
                break;
            }
          }
          if(requestId==null||status==null||fromUser==null||(status!=="ACCEPTED"&&status!=="REJECTED")) return;
          const response = {
            requestId,
            status, 
            fromUser
          }
          this.props.respondToFriendRequest(response);
      }
      /* 
        Helper to check if user has status ACCEPTED/REJECTED/PENDING
        @array[]: Array to search in
        @user{}: User to search for
        @field"": toUser/fromUser depending upon array(see jsx below)
        friendRequest[] have status ACCEPTED/REJECTED/PENDING
      */
      hasUser(array, user, field){
          for(let request of array){
              if(request[field].id === user.id &&request.status==="PENDING")
                return true
          }
          return false
      }
      isFriend(user){
        for(let friend of this.props.user.friends){
            if(friend.id===(user.id))
                    return true;
        }
        return false;
      }

  render() {
      const user = this.props.location.user;
      const button = (
          <Fragment>
          { 
            (this.isFriend(user))? (
                <button className="btn btn-outline-success ml-auto">Friends</button>)
            : (this.hasUser(this.props.sentFriendRequests,user,"toUser"))? (
                <button className="btn btn-outline-secondary ml-auto">Pending Request</button>)
            : (this.hasUser(this.props.receivedFriendRequests,user,"fromUser"))?(
                <Fragment>
                <button className="btn btn-outline-warning ml-auto"
                onClick={() => this.respondToFriendRequestClick(user,"ACCEPTED")}>Accept Request</button>
                <button className="btn btn-outline-danger ml-auto"
                onClick={() => this.respondToFriendRequestClick(user,"REJECTED")}>Reject Request</button>
                </Fragment>
            ):(this.props.user.id=== user.id)?(
                <div></div>
            ):(
                <button className="btn btn-primary ml-auto"
                onClick={() => this.sendFriendRequestClick(user)}>Add Friend</button>
            )}
        </Fragment>)
      const posts = this.props.profilePosts.map((post)=>(
        <div className="col-3">
        <div className="profile-posts pb-4">
            <img src={"http://0.0.0.0:9000/"+post.picture}width="100%"height="100%"></img>
        </div>
    </div>
      ))
    return (
        
      <div>
        <div className="Profile container"style={{backgroundColor:'white'}}>
            <div className="row">
                <div className="col-2">
                    <img width="200px"height="200px" src={this.props.location.user.picture}
                    className="rounded-circle"></img>
                </div>
                <div className="col-10">
                    <div style={{paddingLeft:'40px'}}>
                        <h2>{this.props.location.user.name}</h2>
                        {/* <p>{this.props.location.user.email}</p> */}
                        <p>{this.props.location.user.bio || "Hard Worker , Serial Entrepreneur, Hacker"}</p>
                        <p>{this.props.location.user.location || "New Delhi, India"}</p>
                        {/* <button type="button" className="btn btn-outline-primary">Add Friend</button> */}
                        {button}
                    </div>
                </div>
            </div>
            <br/>
            <hr></hr>
            <div className="text-center"><h4>Posts</h4></div>
            <hr></hr>
            {/* <br/> */}
            <div className="row">
                {posts}
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


// export default Profile
const mapStateToProps = state =>  ({
    user: state.posts.user,
    sentFriendRequests: state.posts.sentFriendRequests,
    receivedFriendRequests: state.posts.receivedFriendRequests,
    profilePosts: state.posts.profilePosts
});


Profile.propTypes = {
    user: PropTypes.object.isRequired,
    sentFriendRequests: PropTypes.array.isRequired,
    receivedFriendRequests: PropTypes.array.isRequired,
    sendFriendRequest: PropTypes.func.isRequired,
    respondToFriendRequest: PropTypes.func.isRequired,
    fetchProfilePosts: PropTypes.func.isRequired
  };
  
export default withRouter(connect(mapStateToProps, {sendFriendRequest,respondToFriendRequest, fetchProfilePosts})(Profile));

