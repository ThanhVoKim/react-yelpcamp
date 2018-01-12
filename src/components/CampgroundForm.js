import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

class CampgroundForm extends React.Component {
  constructor(props) {
    super(props);
    this.onNameChange = this.onNameChange.bind(this);
    this.onPriceChange = this.onPriceChange.bind(this);
    this.onLocationChange = this.onLocationChange.bind(this);
    this.onImageChange = this.onImageChange.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: props.campground ? props.campground.name : '',
      price: props.campground ? props.campground.price : '',
      image: props.campground ? props.campground.image : '',
      description: props.campground ? props.campground.description : '',
      location: props.campground ? props.campground.location : '',
      error: ''
    };
  }

  componentDidMount() {
    // Google map location
    // initialize the autocomplete functionality using the #pac-input input box
    const inputNode = document.getElementById("pac-input");
    const autoComplete = new window.google.maps.places.Autocomplete(inputNode);
    autoComplete.addListener("place_changed", () => {
      const place = autoComplete.getPlace();
      if (!place.geometry) {
        return this.setState({ location: null });
      }
      const location = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
        info_icon: place.icon,
        info_name: place.name,
        info_address: place.formatted_address
      };
      return this.onLocationChange(location);
    });
  }
  onLocationChange(location) {
    this.setState({ location });
  }
  onNameChange(e) {
    const name = e.target.value;
    this.setState(() => ({ name }));
  }
  onPriceChange(e) {
    const price = e.target.value;
    if (!price || price.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({ price }));
    }
  }
  onImageChange(e) {
    const image = e.target.value;
    this.setState(() => ({ image }));
  }
  onDescriptionChange(e) {
    const description = e.target.value;
    this.setState(() => ({ description }));
  }
  onSubmit(e) {
    e.preventDefault();
    if (!this.state.name || !this.state.image) {
      this.setState(() => ({ error: 'Please provide description and image' }));
    } else if (!this.state.location) {
      this.setState({ error: 'Not found location' });
    } else {
      this.setState(() => ({ error: '' }));
      this.props.onSubmit({
        name: this.state.name,
        price: this.state.price,
        location: this.state.location,
        image: this.state.image,
        description: this.state.description,
        createdAt: moment().valueOf(),
        uid: this.props.user.uid,
        createdBy: this.props.user.displayName
      });
    }
  }

  render() {
    return (
      <div className="well" style={{ border: '1px solid #1c88bf' }}>
        <form onSubmit={this.onSubmit} className="form-row">
          <div className="form-group">
            <input
              className="form-control"
              placeholder="Name Campground"
              type="text"
              value={this.state.name}
              onChange={this.onNameChange}
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              placeholder="Price"
              type="text"
              value={this.state.price}
              onChange={this.onPriceChange}
            />
          </div>
          <div className="form-group">
            <input
              id="pac-input"
              className="form-control"
              placeholder="Location"
              type="text"
              value={this.state.location.info_address}
              onChange={this.onLocationChange}
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              placeholder="Image URL"
              type="text"
              value={this.state.image}
              onChange={this.onImageChange}
            />
          </div>
          <div className="form-group">
            <textarea
              className="form-control"
              placeholder="Description"
              type="text"
              value={this.state.description}
              onChange={this.onDescriptionChange}
              rows="5"
              cols="70"
            />
          </div>
          {this.state.error && <p className="alert alert-danger">{this.state.error}</p>}
          <div className="form-group">
            <button className="btn btn-primary btn-block">{this.props.campground ? 'Edit' : 'Add'}</button>
          </div>
        </form>
        {this.props.campground ? (
          <Link to={`/campgrounds/${this.props.campground.id}`}>Back</Link>
        ) : (
          <Link to="/campgrounds">Back</Link>
        )}
      </div>
    );
  }
}

export default CampgroundForm;