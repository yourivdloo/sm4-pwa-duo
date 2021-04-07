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

const defaultImg = "https://firebasestorage.googleapis.com/v0/b/work-in-progress-b5e09.appspot.com/o/images%2Funder-928246_1280.jpg?alt=media&token=e9bed41d-7c53-4067-a2f6-2cd35471d456o"

const toExport = {
  icon,
  firebaseConfig,
  defaultImg
};

export default toExport;
