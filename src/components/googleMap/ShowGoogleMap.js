import React from 'react';

export default class App extends React.Component {
  componentDidMount() {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: this.props.location.lat, lng: this.props.location.lng },
      zoom: 9
    });
    const marker = new window.google.maps.Marker({
      map,
      position: { lat: this.props.location.lat, lng: this.props.location.lng }
    });
    // declare info maker
    const infowindow = new window.google.maps.InfoWindow();
    const infowindowContent = document.getElementById('infowindow-content');
    infowindow.setContent(infowindowContent);
    infowindowContent.children['place-icon'].src = this.props.location.info_icon;
    infowindowContent.children['place-name'].textContent = this.props.location.info_name;
    infowindowContent.children['place-address'].textContent = this.props.location.info_address;
    infowindow.open(map, marker);
    marker.addListener('click', () => {
      infowindow.open(map, marker);
    });
  }
  render() {
    return (
      <div>
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