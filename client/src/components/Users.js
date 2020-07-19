import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Link,withRouter} from 'react-router-dom';

class Users extends Component {
    constructor(props) {
        super(props);
      }
    
  render() {
    const users = this.props.users.map((user)=>(
        <div className="row pt-1 "style={{backgroundColor:'white',
            
            }}  key={user.id}>
                <div className="small-img col-3">
                    <img src={user.picture}
                        className="img-rounded" width="100px"height="100px"></img>
                </div>
                <div className="col-5 p-2">
                    <Link to={{pathname:"/profile",user}}><h5 className="mb-0">{user.name}</h5></Link>
                    <p className="mb-0">{user.email}</p>
                    <p>{user.location||'New Delhi, India'}</p>
                </div>
                <div className="col-4 d-flex align-items-center">
                    <button className="btn btn-sm btn-primary ml-auto">Add Friend</button>
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

const mapStateToProps = state =>  ({
    users: state.posts.users
});


Users.propTypes = {
    users: PropTypes.array.isRequired
  };
  
export default withRouter(connect(mapStateToProps, {})(Users));
