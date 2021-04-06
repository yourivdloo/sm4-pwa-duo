import React, {Component} from 'react';
import L from 'leaflet';
import './MapView.css';
import fence from './assets/fence.png';
import pin from './assets/pin.png';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom'

class MapView extends Component {
  constructor() {
    super();
    this.state = {
      markers: [],
      center: [51.505, -0.09],
      map: null
    };
    this.addMarker = this.addMarker.bind(this)
    this.goToLocation = this.goToLocation.bind(this)
  }

//   componentDidMount(){
//     const self =this;
//     var latitude = this.state.center[0];
//     var longitude = this.state.center[1];

//     if ('geolocation' in navigator) {
//       navigator.geolocation.getCurrentPosition(function (location) {
//       latitude = location.coords.latitude;
//       longitude = location.coords.longitude;
//     })
//   }

//   const map = new L.map('map', {
//     center: [latitude, longitude],
//     zoom: 20,
//     minZoom: 8
//   })

//   var marker = L.marker([latitude, longitude], {icon: L.icon({
//     iconUrl: pin,
//     iconSize:     [24, 38], 
//     iconAnchor:   [12.5, 40], 
//     popupAnchor:  [0, -50]
//   })} ).addTo(map.target);
//   marker.bindPopup("Your current location")
//   marker.openPopup()

//   map.on("drag", function (e) {
//     self.setState({center: map.getCenter()})
//   });

//   map.on("zoom", function (e) {
//     self.setState({center: map.getCenter()})
//   })

//   L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', { 
// attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
// maxZoom: 18, 
// id: 'mapbox/streets-v11', 
// accessToken: 'your.mapbox.access.token' }).addTo(map);
// }

  fence = L.icon({
    iconUrl: fence,
    iconSize:     [46.3125, 51.5625], // size of the icon
    iconAnchor:   [22, 25], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, -25]
  });
  
  addMarker = (e) => {
    const {markers} = this.state
    markers.push(this.state.center)
    this.setState({markers})
  }

  goToLocation(){
    const self = this;
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(function (location) {
        let latitude= location.coords.latitude;
        let longitude= location.coords.longitude;

        // map.target.panTo(new L.LatLng(latitude, longitude))
        self.state.map.target.panTo(new L.LatLng(latitude, longitude))

        var marker = L.marker([latitude, longitude], {icon: L.icon({
          iconUrl: pin,
          iconSize:     [24, 38], 
          iconAnchor:   [12.5, 40], 
          popupAnchor:  [0, -50]
        })} ).addTo(self.state.map.target);
        marker.bindPopup("Your current location")
        marker.openPopup()
      });
    }
  }

  render() {
    const self = this;
    return (
      <div className="map-container">
        <Link to="/new"><button onClick={this.addMarker} className="btn">+</button></Link>
        {/* <button onClick={this.goToLocation} className="btn2">Get location</button> */}
        <div className="center"></div>
      <MapContainer 
        className="map"
        minZoom= {8}
        zoom={20} 
        center = {this.state.center}
        whenReady={(map) => {
          this.setState({map: map})
            map.target.on("drag", function (e) {
              self.setState({center: map.target.getCenter()})
            });
  
            map.target.on("zoom", function (e) {
              self.setState({center: map.target.getCenter()})
            })

            setTimeout(() => { this.goToLocation() }, 400);
          }}
        >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        ></TileLayer>
        {this.state.markers.map((position, idx) => 
          <Marker key={`marker-${idx}`} icon={this.fence} position={position}>
          <Popup>
            <span>Title<br/></span>
          </Popup>
        </Marker>
        )}
      </MapContainer>
      
      </div>
    );
  }
}

export default MapView;
