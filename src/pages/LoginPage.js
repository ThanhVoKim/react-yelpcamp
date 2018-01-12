import React from 'react';
import { connect } from 'react-redux';
import { facebookLogin, twitterLogin, googleLogin } from '../actions/authAction';

class LoginPage extends React.Component {
  constructor() {
    super();
    this.state = {
      error: null
    };
  }
  componentDidMount() {
    if (this.props.location.state) {
      this.setState(this.props.location.state);
    }
  }
  componentWillUnmount() {
    this.setState({ error: null });
  }

  facebookAuth = () => {
    const promise = async () => {
      await this.props.dispatch((facebookLogin()));
    };
    promise().then(() => {
      this.props.history.goBack();
    });
  }

  twitterAuth = () => {
    const promise = async () => {
      await this.props.dispatch((twitterLogin()));
    };
    promise().then(() => {
      this.props.history.goBack();
    });
  }

  googleAuth = () => {
    const promise = async () => {
      await this.props.dispatch((googleLogin()));
    };
    promise().then(() => {
      this.props.history.goBack();
    });
  }
  render() {
    return (
      <div className="login">
        {this.state.error && (
          <div className="container">
            <div className="alert alert-danger"><h5 style={{ textAlign: 'center' }}>{this.state.error}</h5></div>
          </div>
        )}
        <div className="container">
          <div className="login-social social-icons">
            <h1 className="login_authTitle">YelmCamp </h1>
            <div className="row">
              <a onClick={this.facebookAuth} className="btn btn-default facebook"> <i className="fa fa-facebook pull-left" />Sign In with Facebook </a>
              <a onClick={this.twitterAuth} className="btn btn-default twitter"> <i className="fa fa-twitter pull-left" />Sign In with Twitter </a>
              <a onClick={this.googleAuth} className="btn btn-default google"> <i className="fa fa-google-plus pull-left" />Sign In with Google </a>
            </div>
            <h3 className="login_authTitle">Login with Social Account</h3>
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(LoginPage);