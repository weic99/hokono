export default (state = { got: false }, action) => {
  switch (action.type) {
    case 'UPDATE_PROFILE' :
      return { ...state, ...action.payload };
    case 'FOLLOW_A_PET' :
      if (action.payload === 'success') {
        return { ...state, following: {...state.following, ...action.data.following} };
        //if success following, i don't need to read from db, just update store and trust that db and store will be the same
      } else {
        return { ...state };
      }
    case 'UNFOLLOW_A_PET' :
      if (action.payload === 'success') {
        let copy = {...state, following: {...state.following, ...action.data.following}};
        delete copy.following[action.petId];
        return copy;
        //if success unfollowing, i don't need to read from db, just update store and trust that db and store will be the same
      } else {
        return { ...state };
      }
    case 'STARED_A_PET' :
      if (action.payload === 'success') {
        //this myLikes property is so user can see what pets hes liked.
        return {...state, myLikes: {...state.myLikes, ...action.data.myLikes} };
      }
      return state;
    case 'UNSTARED_A_PET' :
      if (action.payload === 'success') {
        //this myLikes property is so user can see what pets hes liked.
        return {...state, myLikes: {...state.myLikes, ...action.data.myLikes} };
      }
      return state;
    case 'UPDATE_POSTS' :
      state.pets[action.petId].posts = { ...state.pets[action.petId].posts, ...action.payload };
      return state;
    case 'LIKE_POST' :
      if (!state.pets || !state.pets[action.petId]) return state;
      const stateCopy = {...state};
      stateCopy.pets[action.petId].posts[action.postId].likes = action.payload.likes;
      stateCopy.pets[action.petId].posts[action.postId].likedBy = action.payload.likedBy;
      return stateCopy;
    case 'NEW_ADOPT_REQUEST' :
      return {...state, ...action.payload};
    default :
      return state;
  }
}
