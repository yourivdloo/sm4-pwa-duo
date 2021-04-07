import React, { Component } from "react";
import constants from "./constants";
import firebase from "firebase/app";
import "firebase/firestore";
import "./DetailView.css";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";
import "firebase/storage";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import PlaceIcon from "@material-ui/icons/Place";

class DetailView extends Component {
  constructor(props) {
    super();

    this.state = {
      pin: {},
      address: "Unknown location",
      latitude: 0,
      longitude: 0,
    };

    this.deletePin = this.deletePin.bind(this);
  }

  async componentDidMount() {
    if (firebase.apps.length === 0) {
      firebase.initializeApp(constants.firebaseConfig);
    }

    let db = firebase.firestore();

    let data = await db
      .collection("pins")
      .where(
        firebase.firestore.FieldPath.documentId(),
        "==",
        this.props.match.params.id
      )
      .get();

    let item = data.docs.map((doc) => {
      this.setState({
        latitude: doc.data().location._lat,
        longitude: doc.data().location._long,
      });
      return {
        title: doc.data().title,
        description: doc.data().description,
        imgurl: doc.data().imgurl,
        location: doc.data().location,
        startDate: doc.data().startdate.replace("T", ", "),
        endDate: doc.data().enddate.replace("T", ", "),
        id: doc.id,
      };
    });

    fetch(
      "https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=" +
        this.state.latitude +
        "&lon=" +
        this.state.longitude
    )
      .catch((e) => {
        console.log(e);
        this.setState({ address: "An error occured." });
      })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          this.setState({ address: "Unknown location" });
        } else {
          this.setState({ address: data.display_name, saveable: true });
        }
      });

    this.setState({
      pin: item[0] ?? {
        title: "Not found",
        description: "There were no pins found with the specified ID",
      },
    });
  }

  deletePin() {
    const db = firebase.firestore();
    console.log(this.state.pin);

    db.collection("pins").doc(this.state.pin.id).delete();

    if (this.state.pin.imgurl !== constants.defaultImg) {
      const storage = firebase.storage();
      let pictureRef = storage.refFromURL(this.state.pin.imgurl);
      pictureRef.delete();
    }

    setTimeout(() => {
      this.props.history.push("/");
    }, 400);
  }

  render() {
    return (
      <div className="content">
        <Link to="/" className="back">
          <IconButton>
            <ArrowBackIosIcon className="back-icon" />
          </IconButton>
        </Link>

        <img src={this.state.pin.imgurl} className="img" alt="Not found" />

        <div className="floater">
          <div className="title">
            <h1>{this.state.pin.title}</h1>
          </div>
          <div className="timestamp">
            <h5 className="text">
              <AccessTimeIcon />
              {this.state.pin.startDate} - {this.state.pin.endDate}
            </h5>
            <h5 className="text">
              <PlaceIcon />
              {this.state.address}
            </h5>
          </div>
        </div>

        <div className="actions">
          <Divider />
          <h3>{this.state.pin.description}</h3>

          <Button onClick={this.editPin} color="primary" variant="contained">
            Edit
          </Button>
          <Button
            onClick={this.deletePin}
            variant="outlined"
            color="secondary"
            className="delete-btn"
          >
            Delete
          </Button>
        </div>
      </div>
    );
  }
}

export default DetailView;
