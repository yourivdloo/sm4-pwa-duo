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

class AddView extends Component {
  constructor(props) {
    super();

    this.state = {
      latitude: 0,
      longitude: 0,
      title: "Placeholder",
      description: "Placeholder",
      startDate: moment(new Date()).format("YYYY-MM-DDTkk:mm"),
      endDate: moment(new Date()).format("YYYY-MM-DDTkk:mm"),
      image: null
    };

    this.save = this.save.bind(this);
  }

  componentDidMount() {
    this.setState({latitude: this.props.location.state.latitude, longitude: this.props.location.state.longitude})
  }

  handleChange = (e) => {
    var type = e.target.id;
    var value = e.target.value;

    this.setState({ [type]: value });
  };

  async save() {
    let newItem = {
      title: this.state.title,
      description: this.state.description,
      location: new firebase.firestore.GeoPoint(
        this.state.latitude,
        this.state.longitude
      ),
      startdate: this.state.startDate,
      enddate: this.state.endDate,
    };
    // add to database
    const db = firebase.firestore();
    await db.collection("pins").add(newItem);

    this.props.history.push("/");
  }

  showImage = (e) =>{
    this.setState({image: URL.createObjectURL(e.target.files[0])})
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
        { this.state.image != null ? <DeleteIcon onClick={() => this.setState({image: null})} className="delete"/> : <div></div>}

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
