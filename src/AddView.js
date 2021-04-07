import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "./AddView.css";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import moment from "moment";
import firebase from "firebase/app";
import "firebase/firestore";
import 'firebase/storage';
import constants from "./constants"
import Typography from "@material-ui/core/Typography";

class AddView extends Component {
  constructor(props) {
    super();

    this.state = {
      latitude: 0,
      longitude: 0,
      address: null,
      title: "Placeholder",
      description: "Placeholder",
      startDate: moment(new Date()).format("YYYY-MM-DDTkk:mm"),
      endDate: moment(new Date()).format("YYYY-MM-DDTkk:mm"),
      image: null,
      imageAsFile: null,
      imageUrl: constants.defaultImg,
      saveable: false
    };

    this.save = this.save.bind(this);
  }

  componentDidMount() {
    var lat = this.props.location.state ? this.props.location.state.latitude : 0;
    var long = this.props.location.state ? this.props.location.state.longitude : 0;

    this.setState({latitude: lat, longitude: long})

    fetch('https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=' + lat.toString() + '&lon=' + long.toString())
    .catch((e) => {
      console.log(e);
      this.setState({address: "An error occured."})
    })
    .then(response => response.json())
      .then(data => {
         if(data.error){
          this.setState({address: "Unable to identify location."})
         } else {
         this.setState({address: data.display_name, saveable: true})
         }
        });
  }

  handleChange = (e) => {
    var type = e.target.id;
    var value = e.target.value;

    this.setState({ [type]: value });
  };

  save() {
    const self = this;
    const storage = firebase.storage();

    if(this.state.imageAsFile !== null){
      const uploadTask = storage.ref(`/images/${this.state.imageAsFile.name}`).put(this.state.imageAsFile)

      uploadTask.on('state_changed', 
      (snapShot) => {
        //takes a snap shot of the process as it is happening
        console.log(snapShot)
      }, (err) => {
        //catches the errors
        console.log(err)
      }, () => {
        // gets the functions from storage refences the image storage in firebase by the children
        // gets the download url then sets the image from firebase as the value for the imgUrl key:
        storage.ref('images').child(this.state.imageAsFile.name).getDownloadURL()
         .then(fireBaseUrl => {
           console.log(fireBaseUrl)
           self.setState({imageUrl: fireBaseUrl}) 
         })
      })
    }
    
    let db = firebase.firestore();

    setTimeout(() => { 
      let newItem = {
        title: self.state.title,
        description: self.state.description,
        imgurl: self.state.imageUrl,
        location: new firebase.firestore.GeoPoint(
          self.state.latitude,
          self.state.longitude
        ),
        startdate: self.state.startDate,
        enddate: self.state.endDate,
      };
      console.log(newItem)

      db.collection("pins").add(newItem);
      self.props.history.push("/");
     } , 1000);
  }

  showImage = (e) =>{
    if(e.target.files.length !== 0){
      this.setState({image: URL.createObjectURL(e.target.files[0]), imageAsFile: e.target.files[0]})
    }
  }

  render() {
    return (
      <div className="content">
        <input
          accept="image/*"
          className="input"
          id="icon-button-file"
          type="file"
          onChange={this.showImage}
        />
        <label htmlFor="icon-button-file">
       
          <IconButton
            className="image"
            aria-label="upload picture"
            component="span"
          >
             { this.state.image == null ? <AddAPhotoIcon className="icon" /> : <div><img src={this.state.image} alt="test" className="picture"/></div> }
             </IconButton>
        </label>
        { this.state.image != null ? <DeleteIcon onClick={() => this.setState({image: null, imageAsFile: null})} className="delete"/> : <div></div>}

        <Typography variant="h7">
          {this.state.address}
        </Typography>
        <br/><br/>
        <TextField
          id="title"
          className="textField"
          label="Title"
          variant="outlined"
          value={this.state.title}
          onChange={this.handleChange}
          InputLabelProps={{ shrink: true }}
        />
        <br />
        <br />
        <TextField
          id="description"
          className="textField"
          label="Description"
          multiline
          variant="outlined"
          rows={5}
          value={this.state.description}
          onChange={this.handleChange}
          InputLabelProps={{ shrink: true }}
        />
        <br />
        <br />
        <TextField
          id="startDate"
          type="datetime-local"
          className="dateField"
          label="Start date"
          variant="outlined"
          value={this.state.startDate}
          onChange={this.handleChange}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          id="endDate"
          type="datetime-local"
          className="dateField"
          label="End date"
          variant="outlined"
          value={this.state.endDate}
          onChange={this.handleChange}
          InputLabelProps={{ shrink: true }}
        />

        <br />
        <br />

        <Button
          variant="contained"
          className="saveBtn"
          onClick={this.save}
          disabled={!this.state.saveable}
          color="primary"
        >
          Save
        </Button>
        <br />
        <Link to="/" className="cancel">
          Cancel
        </Link>
      </div>
    );
  }
}

export default AddView;
