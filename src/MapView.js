import React, { Component } from "react";
import L from "leaflet";
import "./MapView.css";
import fence from "./assets/fence.png";
import pin from "./assets/pin.png";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";
import firebaseService from "./FirebaseService";

class MapView extends Component {
  constructor() {
    super();
    this.state = {
      markers: [],
      center: { lat: 51.505, lng: -0.09 },
      map: null,
    };

    this.goToLocation = this.goToLocation.bind(this);
  }

  async componentDidMount() {
    let items = await firebaseService.findAll();

    this.setState({ markers: items });
  }

  fence = L.icon({
    iconUrl: fence,
    iconSize: [46.3125, 51.5625], // size of the icon
    iconAnchor: [22, 25], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -25],
  });

  goToLocation() {
    const self = this;
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (location) {
        let latitude = location.coords.latitude;
        let longitude = location.coords.longitude;
        
        self.state.map.target.panTo(new L.LatLng(latitude, longitude));

        var marker = L.marker([latitude, longitude], {
          icon: L.icon({
            iconUrl: pin,
            iconSize: [24, 38],
            iconAnchor: [12.5, 40],
            popupAnchor: [0, -50],
          }),
        }).addTo(self.state.map.target);
        marker.bindPopup("Your current location");
        marker.openPopup();
      });
    }
  }

  render() {
    const self = this;
    return (
      <div className="map-container">
        <Link
          to={{
            pathname: "/new",
            state: {
              latitude: self.state.center.lat,
              longitude: self.state.center.lng,
            },
          }}
        >
          <button className="btn">+</button>
        </Link>
        {/* <button onClick={this.goToLocation} className="btn2">Get location</button> */}
        <div className="center"></div>
        <MapContainer
          className="map"
          minZoom={8}
          zoom={20}
          center={this.state.center}
          whenReady={(map) => {
            this.setState({ map: map });
            map.target.on("drag", function (e) {
              self.setState({ center: map.target.getCenter() });
            });

            map.target.on("zoom", function (e) {
              self.setState({ center: map.target.getCenter() });
            });

            setTimeout(() => {
              this.goToLocation();
            }, 400);
          }}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          ></TileLayer>
          {this.state.markers.map((position, idx) => (
            <Marker
              key={`marker-${idx}`}
              icon={this.fence}
              position={[position.location._lat, position.location._long]}
            >
              <Popup>
                <Link to={"/details/" + position.id}>
                  {position.title}
                  <br />
                </Link>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    );
  }
}

export default MapView;
