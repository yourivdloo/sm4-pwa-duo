import React, { Component } from "react";
import { Card, CardContent } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import firebaseService from "./FirebaseService";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import "./ListView.css";

class ListView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pins: [],
    };
  }

  async componentDidMount() {
    const self = this;

    let items = await firebaseService.findAll();

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async function (location) {
          items = self.sortByLocation(location, items);
          self.setState({ pins: items });

          document.getElementById("content").onscroll = () =>
            self.readElementHeight();

          document.getElementById("noList").style.display = "none";
        },
        function () {
          self.setState({ pins: items });

          document.getElementById("content").onscroll = () =>
            self.readElementHeight();

            document.getElementById("noList").style.display = "none";
        }
      );
    } else {
      self.setState({ pins: items });

      document.getElementById("content").onscroll = () =>
        self.readElementHeight();

      document.getElementById("noList").style.display = "none";
    }
  }

  sortByLocation(location, items) {
    items.sort((a, b) => {
      var longDifference1 = a.location._long - location.coords.longitude;
      var longDifference2 = b.location._long - location.coords.longitude;
      var latDifference1 = a.location._lat - location.coords.latitude;
      var latDifference2 = b.location._lat - location.coords.latitude;

      var distance1 = Math.sqrt(
        Math.abs(longDifference1 * longDifference1) +
          Math.abs(latDifference1 * latDifference1)
      );
      var distance2 = Math.sqrt(
        Math.abs(longDifference2 * longDifference2) +
          Math.abs(latDifference2 * latDifference2)
      );
      return distance1 - distance2;
    });

    return items;
  }

  readElementHeight() {
    if (document.getElementById("content").scrollTop !== 0) {
      document.getElementById("scroll-btn").style.opacity = 1;
    } else {
      document.getElementById("scroll-btn").style.opacity = 0;
    }
  }

  scrollToTop() {
    document.getElementById("content").scrollTop = 0;
    document.getElementById("scroll-btn").style.opacity = 0;
  }

  render() {
    return (
      <div>
        <div className="content" id="content">
          <div className="noList" id="noList">
            You need to allow or disallow us to use your location before viewing this content. If you allow us to use your location,
            we will sort the content for you so you only see what you need to see.
          </div>

          {this.state.pins.map((pin) => (
            <Link key={pin.id} to={"/details/" + pin.id}>
              <Card className="card" key={pin.id} variant="outlined">
                <CardContent>
                  <div className="textLeft">
                    <Typography variant="h5" component="h2">
                      {pin.title}
                    </Typography>
                    <Typography color="textSecondary" gutterBottom>
                      {pin.description}
                    </Typography>
                  </div>
                  <div className="imageRight">
                    <img
                      className="actualImage"
                      src={pin.imgUrl}
                      alt="Not found"
                    ></img>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <button
          className="scrollBtn"
          id="scroll-btn"
          onClick={() => this.scrollToTop()}
        >
          {" "}
          <span className="scrollText">Scroll to top</span>{" "}
          <ArrowUpwardIcon className="scrollIcon" />
        </button>
      </div>
    );
  }
}

export default ListView;
