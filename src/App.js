import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MapView from "./MapView";
import AddView from "./AddView";
import DetailView from "./DetailView";
import Navbar from "./Navbar";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact from="/" component={MapView} />
          <Route exact path="/new" component={AddView} />
          <Route exact path="/:id" component={DetailView} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

// import React, {Component} from 'react';
// import L from 'leaflet';
// import './MapView.css';
// import fence from './assets/fence.png';
// import pin from './assets/pin.png';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

// class App extends Component {
//   constructor() {
//     super();
//     this.state = {
//       markers: [],
//       center: [51.505, -0.09]
//     };
// b    this.addMarker = this.addMarker.bind(this)
//   }

//   fence = L.icon({
//     iconUrl: fence,
//     iconSize:     [46.3125, 51.5625], // size of the icon
//     iconAnchor:   [22, 25], // point of the icon which will correspond to marker's location
//     popupAnchor:  [0, -25]
//   });

//   addMarker = (e) => {
//     const {markers} = this.state
//     markers.push(this.state.center)
//     this.setState({markers})
//   }

//   render() {
//     const self = this;
//     return (
//       <div className="map-container">
//         <button onClick={this.addMarker} className="btn">+</button>
//         <div className="center"></div>
//       <MapContainer
//         className="map"
//         minZoom= {8}
//         zoom={20}
//         center = {this.state.center}
//         whenReady={(map) => {
//           if ('geolocation' in navigator) {
//             navigator.geolocation.getCurrentPosition(function (location) {
//               console.log(location);
//               map.target.panTo(new L.LatLng(location.coords.latitude, location.coords.longitude))

//               var marker = L.marker([location.coords.latitude, location.coords.longitude], {icon: L.icon({
//                 iconUrl: pin,
//                 iconSize:     [24, 38], // size of the icon
//                 iconAnchor:   [12.5, 40], // point of the icon which will correspond to marker's location
//                 popupAnchor:  [0, -50]
//               })} ).addTo(map.target);
//               marker.bindPopup("Your current location")
//               marker.openPopup()
//             });
//           }

//           map.target.on("drag", function (e) {
//             self.setState({center: map.target.getCenter()})
//           });

//           map.target.on("zoom", function (e) {
//             self.setState({center: map.target.getCenter()})
//           })
//         }}
//         >
//         <TileLayer
//           attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//           url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
//         ></TileLayer>
//         {this.state.markers.map((position, idx) =>
//           <Marker key={`marker-${idx}`} icon={this.fence} position={position}>
//           <Popup>
//             <span>Title<br/></span>
//           </Popup>
//         </Marker>
//         )}
//       </MapContainer>
//       </div>
//     );
//   }
// }

// export default App;

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Don't learn React
//         </a>
//       </header>
//     </div>
//   );
// }
