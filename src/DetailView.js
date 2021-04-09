import React, { Component } from "react";
import constants from "./constants";
import firebase from "firebase/app";
import "firebase/firestore";
import "./DetailView.css";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import IconButton from "@material-ui/core/IconButton";
import "firebase/storage";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import PlaceIcon from "@material-ui/icons/Place";
import firebaseService from "./FirebaseService";

class DetailView extends Component {
  constructor(props) {
    super();

    this.state = {
      pin: {},
      address: "Unknown location",
      latitude: 0,
      longitude: 0,
      editable: false
    };

    this.deletePin = this.deletePin.bind(this);
  }

  async componentDidMount() {
    let item = await firebaseService.findById(this.props.match.params.id);

    var address = "Unknown location"
    
    if(item[0]){
      address = await firebaseService.getLocation(item[0].location._lat, item[0].location._long)

      item[0].startDate = item[0].startDate.replace("T", ", ")
      item[0].endDate = item[0].endDate.replace("T", ", ")

      this.setState({editable: true})
    }
    
    this.setState({
      pin: item[0] ?? {
        title: "Not found",
        description: "There were no pins found with the specified ID",
      },
      address: address.display_name ?? "Unable to identify location."
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
      this.props.history.goBack();
    }, 400);
  }

  render() {
    return (
      <div className="content">
        {/* <Link to="/" className="back"> */}
          <IconButton className="back" onClick={() => this.props.history.goBack()}>
            <ArrowBackIosIcon className="back-icon" />
          </IconButton>
        {/* </Link> */}

        <img src={this.state.pin.imgurl} className="img" alt="Not found" />

        <div className="floater">
          <div className="title">
            <h1>{this.state.pin.title}</h1>
          </div>
          <div className="timestamp">
            <h5 className="text">
              <AccessTimeIcon />
              Start date: {this.state.pin.startDate} - End date: {this.state.pin.endDate}
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
          <Button onClick={() => this.props.history.push("/edit/" + this.state.pin.id)} color="primary" variant="contained" disabled={!this.state.editable}>
            Edit
          </Button>
          <Button
            onClick={this.deletePin}
            disabled={!this.state.editable}
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
