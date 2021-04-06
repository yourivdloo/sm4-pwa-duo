import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "./AddView.css";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import { Link } from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';
import moment from "moment";

class AddView extends Component {
    constructor(){
        super()

        this.state = {
            latitude: 0,
            longitude: 0,
            title: "Placeholder",
            description: "Placeholder",
            startDate: moment(new Date()).format("YYYY-MM-DDTkk:mm"),
            endDate: moment(new Date()).format("YYYY-MM-DDTkk:mm"),
            markers: []
        }

        this.save = this.save.bind(this)
    }

    handleChange = (e) => {
        var type = e.target.id;
        var value= e.target.value;

        this.setState({[type]: value })
    }
    
    save(){
        // this.state.markers.add(Pin(this.state.latitude, this.state.longitude, this.state.title, this.state.description, 
        // this.state.startDate, this.state.endDate))
    }
    
  render() {
    return (
      <div className="content">
          <input accept="image/*" className="input" id="icon-button-file" type="file" />
      <label htmlFor="icon-button-file">
        <IconButton className="image" aria-label="upload picture" component="span">
        <AddAPhotoIcon className="icon" />
        </IconButton>
      </label>
          <br/>

        <TextField id="title" className="textField" label="Title" variant="outlined" value={this.state.title} onChange={this.handleChange} InputLabelProps={{ shrink: true }}/>
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
          id= "startDate"
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
        <br/>

        <Button variant="contained" className="saveBtn" onClick={this.save} color="primary">Save</Button>
        <br />
        <Link to="/" className="cancel">
          Cancel
        </Link>
      </div>
    );
  }
}

export default AddView;
