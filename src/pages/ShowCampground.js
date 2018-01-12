import React from 'react';
import { connect } from 'react-redux';
import { fetchComments } from '../actions/indexAction';
import CampgroundInfo from '../components/CampgroundInfo';
import CommentsList from '../components/CommentList';
import ShowGoogleMap from '../components/googleMap/ShowGoogleMap';

class ShowCampground extends React.Component {
  constructor() {
    super();
    this.state = {
      error: null
    }
  }

  componentDidMount() {
    if (this.props.campground) {
      this.props.fetchComments(this.props.campground.id);
    }
    if (this.props.location.state) {
      this.setState(this.props.location.state);
    }
  }

  componentWillUnmount() {
    this.setState({ error: null });
  }

  render() {
    return (
      <div>
        {
          this.props.campground ? (
            <div className="row">
              {this.state.error && (
                <div className="container">
                  <div className="alert alert-danger"><h5 style={{ textAlign: 'center' }}>{this.state.error}</h5></div>
                </div>
              )}
              <div className="col-md-3">
                <h3 style={{ textAlign: 'center' }}>{this.props.campground.location.info_name}</h3>
                <p>{this.props.campground.location.info_address}</p>
                <ShowGoogleMap location={this.props.campground.location} />
              </div>
              <div className="col-md-9">
                <CampgroundInfo
                  campground={this.props.campground}
                  {...this.props}
                />
                <CommentsList comments={this.props.campground.comments} {...this.props} />
              </div>
            </div>
          ) : (
            <h1>Loading...</h1>
          )
        }
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  campground: state.campgrounds.find(camp => camp.id === props.match.params.id),
  user: state.user
});

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    fetchComments: (id) => dispatch(fetchComments(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowCampground);