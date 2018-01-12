import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../actions/authAction';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      onCollapse: false
    }
  }
  showCollapse = () => {
    this.setState((preState) => ({ onCollapse: !preState.onCollapse }));
  }
  unAuth = () => {
    this.props.dispatch((logout()));
  }
  render() {
    return (
      <div>
        <nav className="navbar navbar-inverse">
          <div className="container">
            <div className="navbar-header">
              <button type="button" onClick={this.showCollapse} className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar" />
                <span className="icon-bar" />
                <span className="icon-bar" />
              </button>
              <Link className="navbar-brand" to="/">YelpCamp</Link>
            </div>
            <div id="navbar" className={`collapse navbar-collapse${this.state.onCollapse ? ' in' : ''}`}>
              <ul className="nav navbar-nav">
                <li><Link to="/campgrounds">Home</Link></li>
              </ul>
              <ul className="nav navbar-nav navbar-right">
                {
                  this.props.user
                  ?
                  (
                    <ul className="nav navbar-nav navbar-right">
                        <li><a href="#">Hello {this.props.user.displayName}</a></li>
                      <li><a href="#" onClick={this.unAuth}>Logout</a></li>
                    </ul>
                  )
                  :
                  (
                    <ul className="nav navbar-nav navbar-right" >
                      <li><Link to="/login" >Login</Link></li>
                    </ul>
                  )
                }
              </ul>
            </div>
          </div>
        </nav>
        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  user: state.user
});

export default connect(mapStateToProps)(Header);

