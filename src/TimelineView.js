import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Typography } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import Divider from "@material-ui/core/Divider";
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import moment from "moment";
import "./TimelineView.css";

const places = [
  [52.649368, 5.47354],
  [52.377892, 4.89973],
  [52.41156, 4.80044],
  [52.3168, 4.96853],
  [52.35638, 4.80086],
  [52.3384, 4.872831],
  [52.401743, 4.892562],
];

class TimelineView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      minLat: 52.649368 - 0.075,
      minLong: 5.47354 - 0.075,
      maxLat: 52.649368 + 0.075,
      maxLong: 5.47354 + 0.075,
      results: [],
      open: false,
      coords: 0,
    };

    this.search = this.search.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  search() {
    let cases = [];
    if (this.state.coords !== 0) {
      fetch(
        "https://open.data.amsterdam.nl/Cora/Geplande%20wegwerkzaamheden.json"
      )
        .then((response) => response.json())
        .then((data) => {
          data.features.forEach((feature) => {
            if (feature.geometry.coordinates) {
              if (
                feature.geometry.coordinates[0][0] > this.state.minLong &&
                feature.geometry.coordinates[0][0] < this.state.maxLong
              ) {
                if (
                  feature.geometry.coordinates[0][1] > this.state.minLat &&
                  feature.geometry.coordinates[0][1] < this.state.maxLat
                ) {
                  cases.push(feature);
                  cases.sort((a, b) => {
                    var endDate1 = moment(b.properties.EINDDATUM, "DD/MM/YYYY");
                    var endDate2 = moment(a.properties.EINDDATUM, "DD/MM/YYYY");
                    return endDate1 - endDate2;
                  });
                }
              }
            }
          });

          this.setState({ results: cases });
        })
        .catch((e) =>{
            document.getElementById("list").style.display = 'none';
            document.getElementById("error").style.display = 'block';
        });
    } else {
      this.handleOpen();
    }
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  handleChange = (e) => {
    this.setState({
      coords: e.target.value,
      minLat: places[e.target.value][0] - 0.075,
      maxLat: places[e.target.value][0] + 0.075,
      minLong: places[e.target.value][1] - 0.075,
      maxLong: places[e.target.value][1] + 0.075,
      open: false,
    });
  };

  render() {
    return (
      <div className="fullpage">
        <div className="form">
          {/* <Button className="button" onClick={this.handleOpen}>
            Open the select
          </Button> */}
          <FormControl className="form-control" variant="outlined">
            <InputLabel id="demo-controlled-open-select-label">
              Location to search
            </InputLabel>
            <Select
              inputlabelprops={{ shrink: true }}
              label="Location to search"
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={this.state.open}
              onClose={this.handleClose}
              onOpen={this.handleOpen}
              value={this.state.coords}
              onChange={this.handleChange}
              className="select"
            >
              <MenuItem value={0}>
                <em>None</em>
              </MenuItem>
              <MenuItem value={1}>Amsterdam Centraal</MenuItem>
              <MenuItem value={2}>Westelijk Havengebied</MenuItem>
              <MenuItem value={3}>Bijlmermeer</MenuItem>
              <MenuItem value={4}>Osdorp</MenuItem>
              <MenuItem value={5}>Zuidas</MenuItem>
              <MenuItem value={6}>NDSM-Werf</MenuItem>
            </Select>
          </FormControl>

          <Button
            className="button"
            variant="contained"
            color="primary"
            onClick={this.search}
          >
            {this.state.coords ? "Search!" : "Select"}
          </Button>
        </div>

        <Divider />

        <div className="list" id="list">
        <Timeline align="left">
          {this.state.results.map((result) => (
            <TimelineItem>
            {/* <Card variant="outlined" className="caseCard">
              <CardContent>
                <Typography variant="h5">
                  {result.properties.STARTDATUM} to{" "}
                  {result.properties.EINDDATUM}
                </Typography>
                {result.properties.SOORTWERKZAAMHEDEN}
                <Typography color="textSecondary">
                  {result.properties.LOCATIEWERKZAAMHEDEN}
                </Typography>
              </CardContent>
            </Card> */}
            <TimelineOppositeContent className="timelineLeft">
            <Typography color="textSecondary">{result.properties.STARTDATUM.replace(/-/g, "/")} -{" "}
                  {result.properties.EINDDATUM.replace(/-/g, "/")}</Typography>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color={ moment(result.properties.EINDDATUM, "DD/MM/YYYY") < new Date() ? "secondary" : "primary"}/>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
          {result.properties.SOORTWERKZAAMHEDEN}
                <Typography color="textSecondary">
                  {result.properties.LOCATIEWERKZAAMHEDEN}
                </Typography>
          </TimelineContent>
            </TimelineItem>
          ))}
          </Timeline>
        </div>
        <div className="error" id="error">
            An error has occured while fetching data. Please try again later.
        </div>
      </div>
    );
  }
}

export default TimelineView;
