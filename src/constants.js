import L from "leaflet";

const icon = L.icon({
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconUrl: "https://unpkg.com/leaflet@1.7/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7/dist/images/marker-shadow.png",
});

const firebaseConfig = {
  apiKey: "AIzaSyBa2POhtrvbTck8iGyV02ACUrisBZJTeeM",
  authDomain: "work-in-progress-b5e09.firebaseapp.com",
  projectId: "work-in-progress-b5e09",
  storageBucket: "work-in-progress-b5e09.appspot.com",
  messagingSenderId: "987279321188",
  appId: "1:987279321188:web:5cff3b3adb3f1f60df1771",
  measurementId: "G-XM1TD5XYWP",
};

const toExport = {
  icon,
  firebaseConfig,
};

export default toExport;
