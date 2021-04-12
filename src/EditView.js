import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "./AddView.css";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import firebaseService from "./FirebaseService";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import constants from "./constants";

class EditView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pin: {},
      title: "",
      description: "",
      startDate: moment(new Date()).format("YYYY-MM-DDTkk:mm"),
      endDate: moment(new Date()).format("YYYY-MM-DDTkk:mm"),
      address: "Unknown location",
      latitude: 0,
      longitude: 0,
      saveable: false,
      image: null,
      imageAsFile: null,
      imageUrl: null,
      sameImage: true
    };

    this.save = this.save.bind(this)
  }

  async componentDidMount() {
    let address = null;
    let item = await firebaseService.findById(this.props.match.params.id);

    if (item[0]) {
      address = await firebaseService.getLocation(
        item[0].location._lat,
        item[0].location._long
      );
      
      this.setState({latitude: item[0].location._lat, longitude: item[0].location._long})
      }

    this.setState({
      pin: item[0] ?? {
        title: "Not found",
        description: "There were no pins found with the specified ID",
      },
      image: item[0] ? item[0].imgurl : null,
      title: item[0] ? item[0].title : "Not found",
      description: item[0] ? item[0].description : "No pin was found with the specified ID.",
      startDate: item[0] ? item[0].startDate : moment(new Date()).format("YYYY-MM-DDTkk:mm"),
      endDate: item[0] ? item[0].endDate : moment(new Date()).format("YYYY-MM-DDTkk:mm")
    });

    if (address) {
      this.setState({ address: address.display_name, saveable: true });
    } else {
      this.setState({ address: "Unable to identify location." });
    }
  }

   save() {
    const self = this;

    const storage = firebase.storage();

      if(!this.state.sameImage && this.state.imageAsFile !== null && this.state.pin.imgurl !== this.state.image){
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
             self.setState({imageUrl: fireBaseUrl}) 
           })
        })
      } else if(!this.state.sameImage && !this.state.imageAsFile){
        this.setState({imageUrl: constants.defaultImg})
      }

      if (!this.state.sameImage && this.state.pin.imgurl !== constants.defaultImg) {
        let pictureRef = storage.refFromURL(this.state.pin.imgurl);
        pictureRef.delete();
      }
      
      let db = firebase.firestore();

      setTimeout(() => { 
        let newItem = {
          id: self.state.pin.id,
          title: self.state.title,
          description: self.state.description,
          imgurl: self.state.imageUrl ?? self.state.pin.imgurl,
          location: new firebase.firestore.GeoPoint(
            self.state.latitude,
            self.state.longitude
          ),
          startdate: self.state.startDate,
          enddate: self.state.endDate,
        };
  
        db.collection('pins').doc(self.state.pin.id).update(newItem)
        self.props.history.push("/");
       } , 2000);
  }

  handleChange = (e) => {
    var type = e.target.id;
    var value = e.target.value;

    this.setState({ [type]: value });
  };

  showImage = (e) => {
    if (e.target.files.length !== 0) {
      this.setState({
        image: URL.createObjectURL(e.target.files[0]),
        imageAsFile: e.target.files[0],
        sameImage: false
      });
    }
  };

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
            {this.state.image == null ? (
              <AddAPhotoIcon className="icon" />
            ) : (
              <div>
                <img src={this.state.image} alt="test" className="picture" />
              </div>
            )}
          </IconButton>
        </label>
        {this.state.image != null ? (
          <DeleteIcon
            onClick={() => this.setState({ image: null, imageAsFile: null, sameImage: false })}
            className="delete"
          />
        ) : (
          <div></div>
        )}

        <Typography>{this.state.address}</Typography>
        <br />
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
          Save changes
        </Button>
        <br />
        <Button onClick={() => this.props.history.goBack()} color="secondary">
          Cancel
        </Button>
      </div>
    );
  }
}

export default EditView;
