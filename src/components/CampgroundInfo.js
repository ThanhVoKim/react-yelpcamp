import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { removeCampground } from '../actions/indexAction';

class CampgroundInfo extends React.Component {
  renderRequireAuth() {
    if (this.props.user.uid === this.props.campground.uid) {
      return (
        <span style={{ float: 'right' }}>
          <Link className="btn btn-warning" to={`/campgrounds/${this.props.campground.id}/edit`} >Edit</Link>
          <button
            className="btn btn-danger"
            onClick={(e) => {
              e.preventDefault();
              this.props.dispatch(removeCampground(this.props.campground.id));
              this.props.history.push('/campgrounds');
            }}
          >
            Delete
          </button>
        </span>
      )
    }
  }
  render() {  
    return (
      <div className="thumbnail">
        <img className="img-responsive" src={this.props.campground.image} alt="" />
        <div className="caption-full">
          <h4 className="pull-right">${this.props.campground.price}/night</h4>
          <h4>{this.props.campground.name}</h4>
          <p>{this.props.campground.description}</p>
          <p><em>Submitted by {this.props.campground.createdBy} {moment(this.props.campground.createdAt).fromNow()}</em></p>
          <Link className="btn btn-info btn-sm" to="/campgrounds">Back</Link>
          {this.props.user && this.renderRequireAuth()}
        </div>
      </div>
    );
  }
}
export default CampgroundInfo;

