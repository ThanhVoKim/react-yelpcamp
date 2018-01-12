import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import NotFoundPage from '../../pages/NotFoundPage';

export default (WrapComponent) => {
  class Authenticated extends React.Component {
    render() {
      const user = this.props.user;
      const campground = this.props.campground;
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
      } else if (user.uid !== campground.uid) {
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

  const mapStateToProps = (state, props) => ({
    campground: state.campgrounds.find(camp => camp.id === props.match.params.id),
    user: state.user
  });

  return connect(mapStateToProps)(Authenticated);
};

/*  if (user && campground && (user.uid === campground.uid)) {
        return <WrapComponent {...this.props} />;
      }
      return <Redirect to={`/campgrounds/${campground.id}`} />;
       */