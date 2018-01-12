import React from 'react';
import { connect } from 'react-redux';
import CampgroundForm from '../components/CampgroundForm';
import { addCampground } from '../actions/indexAction';

const NewCampground = (props) => {
  return (
    <div className="row">
      <h1 style={{ textAlign: 'center' }}>Add New Campground</h1>
      <div style={{ width: '50%', margin: '25px auto' }}>
        <CampgroundForm
          user={props.user}
          onSubmit={(campground) => {
            props.dispatch(addCampground(campground));
            props.history.push('/campgrounds');
          }}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps)(NewCampground);
