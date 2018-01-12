import React from 'react';
import { connect } from 'react-redux';
import CampgroundForm from '../components/CampgroundForm';
import { editCampground } from '../actions/indexAction';

class EditCampground extends React.Component {
  render() {
    return (
      <div className="row">
        <h1 className="text-center">Edit Campground</h1>
        <div style={{ width: '50%', margin: '30px auto' }}>
          {
            this.props.campground ? (
              <CampgroundForm
                {...this.props}
                onSubmit={(campground) => {
                  const id = this.props.match.params.id;
                  this.props.dispatch(editCampground(campground, id));
                  this.props.history.push(`/campgrounds/${id}`);
                }}
              />
            ) : (
              <div>Loading...</div>
            )
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  campground: state.campgrounds.find(camp => camp.id === props.match.params.id)
});

export default connect(mapStateToProps)(EditCampground);