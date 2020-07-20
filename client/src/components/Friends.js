import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Link,withRouter} from 'react-router-dom';

class Friends extends Component {
  constructor(props) {
        super(props);
  }

  render() {
      const friends = this.props.user.friends.map(friend =>(
        <div className="col-6 row" key={friend.id}>
                <div className="small-img col-3">
                <img src={friend.picture}
                    className="rounded-circle" width="100px"height="100px"></img>
            </div>
            <div className="col-5 pt-4">
                <Link to={{pathname:"/profile",user:friend}}><h5 className="mb-0">{friend.name}</h5></Link>
                <p>{friend.location||'New Delhi, India'}</p>
            </div>
            <div className="col-4 d-flex align-items-center">
                <button className="btn btn-sm btn-outline-success ml-auto">Friends</button>
            </div>
            <div className="col-12"><hr></hr></div>
        </div> 
      ));
    return (
        <div className="container" style={{backgroundColor:'white'}}>
            <div className="row p-4"style={{backgroundColor:'whitesmoke'}}><h2>Friends</h2></div>
            <div className="row">
                {friends}
            </div>

        </div>
    );
  }
}

const mapStateToProps = state =>  ({
    user: state.posts.user
});


Friends.propTypes = {
    user: PropTypes.object.isRequired
};

export default connect(mapStateToProps, {  })(Friends);
