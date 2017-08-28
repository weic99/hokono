import React from 'react';
import { userFollowedPet } from '../actions/UserFollowsPet';
import { connect } from 'react-redux';

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
  {console.log("data into feed entry, ",props.data)}
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
        onClick={userFollowedPet(props.data)}
      >
      'Follow'
      </button>
    </div>
    <p>{props.data.likes} Likes</p>
  </div>
);

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
  }
}
//{props.profile.following[props.data.id] ? 'Followed' : 'Follow'}
export default connect(mapStateToProps)(FeedEntry);
