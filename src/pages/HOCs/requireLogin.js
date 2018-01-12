import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

export default (WrapComponent) => {
  class Authenticated extends React.Component {
    render() {
      if (this.props.user) {
        return <WrapComponent {...this.props} />;
      }
      return (
        <Redirect to={{
          pathname: '/login',
          state: { error: 'You must be login to do that !' }
          }}
        />
      );
    }
  }

  const mapStateToProps = (state) => ({
    user: state.user
  });

  return connect(mapStateToProps)(Authenticated);
};