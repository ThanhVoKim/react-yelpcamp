import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { fetchComments } from '../../actions/indexAction';
import NotFoundPage from '../NotFoundPage';

export default (WrapComponent) => {
  class Authenticated extends React.Component {
    componentDidMount() {
      if (this.props.campground) {
        this.props.fetchComments(this.props.campground.id);
      }
    }
    render() {
      const user = this.props.user;
      const campground = this.props.campground;
      const comment = this.props.comment;
      if (!user) {
        return (
          <Redirect to={{
            pathname: '/login',
            state: { error: 'You must be login to do that !' }
          }}
          />
        );
      } else if (!campground) {
        return <NotFoundPage />;
      } else if (!comment) {
        return <NotFoundPage />;
      } else if (user.uid !== comment.uid) {
        return (
          <Redirect to={{
            pathname: `/campgrounds/${campground.id}`,
            state: { error: 'You not have permission to do that !' }
          }}
          />
        );
      }
      return <WrapComponent {...this.props} />;
    }
  }

  const mapStateToProps = (state, props) => {
    const campground = state.campgrounds.find(camp => camp.id === props.match.params.id);
    let comment;
    if (campground) {
      comment = campground.comments.find(child => child.id === props.match.params.commentid);
    }
    return {
      user: state.user,
      campground,
      comment
    };
  };

  const mapDispatchToProps = (dispatch) => {
    return {
      fetchComments: (id) => dispatch(fetchComments(id)),
      dispatch
    };
  };

  return connect(mapStateToProps, mapDispatchToProps)(Authenticated);
};