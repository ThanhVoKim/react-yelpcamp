import React from "react";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zoom: 13,
      maptype: "roadmap",
      place_formatted: "",
      place_id: "",
      place_location: ""
    };
  }
  componentDidMount() {
    // initialize the autocomplete functionality using the #pac-input input box
    let inputNode = document.getElementById("pac-input");
    let autoComplete = new window.google.maps.places.Autocomplete(inputNode);
    autoComplete.addListener("place_changed", () => {
      let place = autoComplete.getPlace();
      if (!place.geometry) {
        console.log('nooooooooooooooooo');
      }
      let location = place.geometry.location;
      this.setState({
        location: {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
          info_icon: place.icon,
          info_name: place.name,
          info_address: place.formatted_address
        }
      });
    });
  }
  render() {
    return (
      <div id="index">
        <div>
          <input id="input" type="text" placeholder="Enter a location" />
        </div>
        <h1>State</h1>
        <p>
          Zoom level: {this.state.zoom}
          Map type: {this.state.maptype}
          <br />
          <p>Place: {this.state.place_formatted}</p>
          <p>Place ID: {this.state.place_id}</p>
          <p>Location: {this.state.place_location}</p>
        </p>
        <div id="map" />
        <div id="infowindow-content">
          <img src="" width="16" height="16" id="place-icon" />
          <span id="place-name" className="title" /><br />
          <span id="place-address" />
        </div>
      </div>
    );
  }
}