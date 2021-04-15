import React, { Component } from "react";
import L from "leaflet";
import fence from "./assets/fence.png";
import pin from "./assets/pin.png";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";
import firebaseService from "./FirebaseService";
import { Dialog, DialogContent, DialogContentText, DialogActions, DialogTitle, Button } from "@material-ui/core";
import "./MapView.css";

class MapView extends Component {
  constructor() {
    super();
    this.state = {
      markers: [],
      center: { lat: 51.505, lng: -0.09 },
      map: null,
      dialog: false
    };

    this.goToLocation = this.goToLocation.bind(this);
    this.handleClose = this.handleClose.bind(this);
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
        self.setState({hasAnswered: true})
        let latitude = location.coords.latitude;
        let longitude = location.coords.longitude;

        self.state.map.target.dragging.enable()
        self.state.map.target.touchZoom.enable()
        self.state.map.target.scrollWheelZoom.enable()
        self.state.map.target.doubleClickZoom.enable()
        self.state.map.target.boxZoom.enable()
        self.state.map.target.keyboard.enable()
        
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
      }, function(){
        self.setState({dialog:true})
        self.state.map.target.dragging.enable()
        self.state.map.target.touchZoom.enable()
        self.state.map.target.scrollWheelZoom.enable()
        self.state.map.target.doubleClickZoom.enable()
        self.state.map.target.boxZoom.enable()
        self.state.map.target.keyboard.enable()
      });
    }
  }

  handleClose(){
    this.setState({dialog: false})
  }

  render() {
    const self = this;
    return (
      <div className="map-container">
        <Dialog
        open={this.state.dialog}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"We cannot get your location"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            It looks like you have blocked us from using your location. Without your location, we cannot provide you with information about construction work near you.
             Please allow access to your location and reload the app.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button color="primary" onClick={this.handleClose}>I understand</Button>
        </DialogActions>
      </Dialog>
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
        <div className="center"></div>
        <MapContainer
          className="map"
          dragging={false}
          touchZoom={false}
          doubleClickZoom={false}
          scrollWheelZoom={false}
          boxZoom={false}
          keyboard={false}
          zoomControl={false}
          minZoom={8}
          zoom={20}
          center={this.state.center}
          whenReady={(map) => {
            this.setState({ map: map });
            console.log(map);
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
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors. Do not use this application while driving!'
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
