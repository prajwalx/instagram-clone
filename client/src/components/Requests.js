import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Link,withRouter} from 'react-router-dom';
import {sendFriendRequest, respondToFriendRequest} from '../actions/postActions';

class Requests extends Component {
  constructor(props) {
    super(props);
    this.hasUser = this.hasUser.bind(this);
    this.isFriend = this.isFriend.bind(this);
    this.sendFriendRequestClick = this.sendFriendRequestClick.bind(this);
    this.respondToFriendRequestClick = this.respondToFriendRequestClick.bind(this);
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
    const users = this.props.receivedFriendRequests.filter((fr)=>fr.status==="PENDING")
    .map(({fromUser})=>(
        <div className="row pt-1 "style={{backgroundColor:'white',
            
            }}  key={fromUser.id}>
                <div className="small-img col-3">
                    <img src={fromUser.picture}
                        className="img-rounded" width="100px"height="100px"></img>
                </div>
                <div className="col-5 p-2">
                    <Link to={{pathname:"/profile",fromUser}}><h5 className="mb-0">{fromUser.name}</h5></Link>
                    <p className="mb-0">{fromUser.email}</p>
                    <p>{fromUser.location||'New Delhi, India'}</p>
                </div>
                <div className="col-4 d-flex align-items-center">
                { 
                (this.isFriend(fromUser))? (
                    <button className="btn btn-sm btn-outline-success ml-auto">Friends</button>)
                : (this.hasUser(this.props.sentFriendRequests,fromUser,"toUser"))? (
                    <button className="btn btn-sm btn-outline-secondary ml-auto">Pending Request</button>)
                : (this.hasUser(this.props.receivedFriendRequests,fromUser,"fromUser"))?(
                    <Fragment>
                    <button className="btn btn-sm btn-outline-warning ml-auto"
                    onClick={() => this.respondToFriendRequestClick(fromUser,"ACCEPTED")}>Accept Request</button>
                    <button className="btn btn-sm btn-outline-danger ml-auto"
                    onClick={() => this.respondToFriendRequestClick(fromUser,"REJECTED")}>Reject Request</button>
                    </Fragment>
                ):(this.props.user.id=== fromUser.id)?(
                    <div></div>
                ):(
                    <button className="btn btn-sm btn-primary ml-auto"
                    onClick={() => this.sendFriendRequestClick(fromUser)}>Add Friend</button>
                )}
                </div>
                <div className="col-12"><hr></hr></div>
            </div>
    ))
    return (
        <div className="container"style={{
        alignItems:'center',maxWidth:'600px'
        }}>
        {this.props.users && users}
        </div>
    );
  }
}
//users[] search users
//user logged in user
const mapStateToProps = state =>  ({
    users: state.posts.users,
    user: state.posts.user,
    sentFriendRequests: state.posts.sentFriendRequests,
    receivedFriendRequests: state.posts.receivedFriendRequests
});


Requests.propTypes = {
    users: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    sentFriendRequests: PropTypes.array.isRequired,
    receivedFriendRequests: PropTypes.array.isRequired,
    sendFriendRequest: PropTypes.func.isRequired,
    respondToFriendRequest: PropTypes.func.isRequired
  };
  
export default withRouter(connect(mapStateToProps, {sendFriendRequest,respondToFriendRequest})(Requests));