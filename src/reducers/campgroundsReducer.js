export default (state = [], action) => {
  switch (action.type) {
    case 'FETCH_CAMPGROUNDS':
      return action.campgrounds;
    case 'ADD_CAMPGROUND':
      return [...state, action.campground];
    case 'REMOVE_CAMPGROUND':
      return state.filter((campground) => campground.id !== action.id);
    case 'EDIT_CAMPGROUND':
      return state.map((campground) => {
        if (campground.id === action.campground.id) {
          return { ...campground, ...action.campground };
        }
        return campground;
      });
    case 'FETCH_COMMENTS':
      return state.map((campground) => {
        if (campground.id === action.id) {
          return { ...campground, comments: action.comments };
        }
        return campground;
      });
    case 'ADD_COMMENT':
      return state.map((campground) => {
        if (campground.id === action.id) {
          campground.comments.push(action.comment);
          return { ...campground };
        }
        return campground;
      });
    case 'REMOVE_COMMENT':
      return state.map((campground) => {
        if (campground.id === action.id) {
          const comments = campground.comments.filter((comment) => comment.id !== action.commentId);
          return { ...campground, comments };
        }
        return campground;
      });
    case 'EDIT_COMMENT':
      return state.map((campground) => {
        if (campground.id === action.id) {
          const comments = campground.comments.map((comment) => {
            if (comment.id === action.commentId) {
              return { ...comment, ...action.comment };
            }
            return comment;
          });
          return { ...campground, comments };
        }
        return campground;
      });
    default:
      return state;
  }
};