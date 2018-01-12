import { database } from '../firebase/firebase';

// ===
// === CAMPGROUND ACTION ===
// ===

export const fetchCampgrounds = () => async dispatch => {
  const data = [];
  await database.ref('campgrounds').once('value')
    .then(snapshot => {
      snapshot.forEach(snapshotChild => {
        data.push({
          id: snapshotChild.key,
          ...snapshotChild.val(),
          comments: []
        });
      });
    })
    .then(() => {
      dispatch({
        type: 'FETCH_CAMPGROUNDS',
        campgrounds: data
      });
    });
};

export const addCampground = (campground) => dispatch => {
  database.ref('campgrounds').push(campground).then((snapshot) => {
    dispatch({
      type: 'ADD_CAMPGROUND',
      campground: {
        id: snapshot.key,
        comments: [],
        ...campground
      }
    });
  });
};

export const removeCampground = (id) => dispatch => {
  database.ref(`campgrounds/${id}`).remove().then(() => {
    database.ref(`commentsCampground/${id}`).remove();
    dispatch({
      type: 'REMOVE_CAMPGROUND',
      id
    });
  });
};

export const editCampground = (campground, id) => async dispatch => {
  database.ref(`campgrounds/${id}`).update({ ...campground }).then(() => {
    dispatch({
      type: 'EDIT_CAMPGROUND',
      campground: {
        id,
        ...campground
      }
    });
  });
};

// ===
// === COMMENT ACTION ===
// ===

export const fetchComments = (id) => async dispatch => {
  const comments = [];
  await database.ref(`commentsCampground/${id}`).once('value')
    .then((snapshot) => {
      snapshot.forEach((snapshotChild) => {
        comments.push({
          id: snapshotChild.key,
          ...snapshotChild.val()
        });
      });
    }).then(() => {
      dispatch({
        type: 'FETCH_COMMENTS',
        id,
        comments
      });
    });
};

export const addComment = (id, comment) => dispatch => {
  database.ref(`commentsCampground/${id}`).push(comment).then((snapshot) => {
    dispatch({
      type: 'ADD_COMMENT',
      id,
      comment: {
        id: snapshot.key,
        ...comment
      }
    });
  });
};

export const removeComment = (id, commentId) => dispatch => {
  database.ref(`commentsCampground/${id}/${commentId}`).remove().then(() => {
    dispatch({
      type: 'REMOVE_COMMENT',
      id,
      commentId
    });
  });
};

export const editComment = (id, commentId, comment) => dispatch => {
  database.ref(`commentsCampground/${id}/${commentId}`).update({ ...comment }).then(() => {
    dispatch({
      type: 'EDIT_COMMENT',
      id,
      commentId,
      comment
    });
  });
};
