import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchSentFriendRequests, fetchReceivedFriendRequests, fetchNewsFeed, createPost, likePost,dislikePost } from '../actions/postActions';
import {Navbar,NavDropdown,Nav,Form,FormControl,Button} from 'react-bootstrap';
import {Link,withRouter} from 'react-router-dom';

class NewsFeed extends Component {
   constructor(props) {
       super(props);
       this.props.fetchNewsFeed();
       this.props.fetchSentFriendRequests();
       this.props.fetchReceivedFriendRequests();
       /* image preview */
       this._onChange = this._onChange.bind(this);
       this.state = {
        file:null,
        imgSrc:'',
        caption:''
      }; 
      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
      }
    
      onSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("myImage",this.state.file);
        formData.append("caption",this.state.caption);
        if(this.state.file==null)
            return;
        this.props.createPost(formData);
        this.setState({imgSrc:''})
      }
      /*For image preview only */
      _onChange(e) {
        // Assuming only image
        var file = this.refs.file.files[0];
        var reader = new FileReader();
        var url = reader.readAsDataURL(file);
      
         reader.onloadend = function (e) {
            this.setState({
                imgSrc: [reader.result],
                file
            })
          }.bind(this);
        // console.log(url) // Would see a path?
      }

  render() {
      const feed = this.props.newsfeed.map((post)=>(
          <Fragment>
          <div className="row">
                <div className="small-img col-1">
                    <img src={post.user.picture}
                        className="rounded-circle" width="60px"height="60px"></img>
                </div>
                <div className="col-11 d-flex align-items-center pl-4">
                <Link to={{pathname:"/profile",user:post.user}}><h4 className="mb-0">{post.user.name}</h4></Link>
                </div>
            </div>
            <div className="row">
                <div className="col-12 p-0">
                    <img src={"http://0.0.0.0:9000/"+post.picture}width="100%"height="100%"></img>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-12">
                    <div className="d-flex">
                        {post.likes.indexOf(this.props.user.id)===-1
                            &&
                        <button className="btn btn-outline-danger" onClick={()=>this.props.likePost(post.id)}>{post.likes.length} Likes</button>}
                        {post.likes.indexOf(this.props.user.id)!==-1
                            &&
                        <button className="btn btn-danger" onClick={()=>this.props.dislikePost(post.id)}>{post.likes.length} Likes</button>}
                        <p className="ml-auto">{post.createdAt}</p>
                    </div>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-12">
                    <div>
                        <p>{post.caption}</p>
                    </div>
                </div>
            </div>
            </Fragment>
      ))
    return (
        <div className="container"style={{backgroundColor:'white',
        alignItems:'center',maxWidth:'600px'
        }}>
            <div>
                <form onSubmit={this.onSubmit}>
                    <div class="form-group">
                        <label for="exampleFormControlFile1"><h4>Create Post</h4></label>
                        <br/>
                        <input type="file" class="form-control-file" id="exampleFormControlFile1"
                        ref="file" 
                        type="file" 
                        name="user[image]" 
                        onChange={this._onChange}/>
                        {/* Only show first image, for now. */}
                        <div className="row">
                            <div className="col-12 ">
                                {this.state.imgSrc&&<img src={this.state.imgSrc}width="100%"height="100%"></img>}
                                {this.state.imgSrc&&<input type="text" className="form-control" placeholder="Caption"
                                name="caption"
                                onChange={this.onChange}
                                value={this.state.caption} />}
                                {this.state.imgSrc&&<button type="submit" className="btn btn-primary btn-block">Post</button>}
                            </div>
                        </div>
                    </div>
                </form>
                    <hr/>
                    <br/>
                    <br/>
                    <br/>
            </div>

            {feed}

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
    fetchReceivedFriendRequests: PropTypes.func.isRequired,
    fetchNewsFeed: PropTypes.func.isRequired,
    newsfeed: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    createPost: PropTypes.func.isRequired,
    likePost: PropTypes.func.isRequired,
    dislikePost: PropTypes.func.isRequired
  };
  
  const mapStateToProps = state => ({
      newsfeed: state.posts.newsfeed,
      user: state.posts.user
  });
// export default withRouter(NewsFeed)
export default connect(mapStateToProps, { fetchSentFriendRequests, fetchReceivedFriendRequests, fetchNewsFeed, createPost, likePost, dislikePost })(NewsFeed);
