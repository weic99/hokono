import React from 'react';
import { userFollowedPet, userLikedPet, userUnlikedPet } from '../actions/UserFollowsPet';
import { connect } from 'react-redux';
import { IfRender } from './index';

const FeedEntry = (props) => (
  <div
    style={{
      height: '400px',
      width: '350px',
      border: '0px solid black',
      margin: '20px',
      'boxShadow': '2px 2px 2px lightgrey',
      'backgroundColor': 'whitesmoke',
      display: 'flex',
      'flexDirection': 'column',
      'alignItems': 'center',
    }}
  >
    <h4>{props.data.name}</h4>
    <div
      style={{
        'backgroundImage': `url(${props.data.filePath})`,
        width: '300px',
        height: '200px',
        'backgroundSize': 'contain',
        'backgroundRepeat': 'no-repeat',
        'backgroundPosition': 'center',
      }}
    />
    <div>
      <button
        style={{
            width: '60px',
            height: '20px',
        }}
        onClick={(e) => {
          e.preventDefault();
          if (props.auth.loggedIn) {
            userFollowedPet(props.data)
          } else {
            alert('Please loggin to follow');
          }
        }}
        disabled={!!props.profile.following && !!props.profile.following[props.data.id]}
      >
      {!!props.profile.following && !!props.profile.following[props.data.id] ? 'Followed': 'Follow'}
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          if (props.auth.loggedIn) {
            if (typeof props.data.likedBy === 'undefined') {
              console.log("a");
              userLikedPet(props.data);
            }
            else if (props.data.likedBy[props.auth.uid]) {
              console.log("b");
              userUnlikedPet(props.data);
            } else {
              console.log("c");
              userLikedPet(props.data);
            }
          } else {
            alert('Please login to like');
          }
        }}
      >
        <img
          style={{
            width: '20px',
            height: '20px',
          }}
          src="/images/heart.png"
        />
      </button>

    </div>
    <p>{props.data.likes} Likes</p>
  </div>
);

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
    auth: state.auth,
  }
}
//{props.profile.following[props.data.id] ? 'Followed' : 'Follow'}
export default connect(mapStateToProps)(FeedEntry);
