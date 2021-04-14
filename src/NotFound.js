import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import "./NotFound.css"

class NotFound extends Component {
    render() {
        return (
          <div className="main">
              <div className="not-found">
                  <div className="not-found-content">
              <h1>Oops, looks like you are lost!</h1>
                  <Button variant="contained" color="primary" onClick={() => this.props.history.push("/")}>
                Back to map view
                </Button>
                </div>
              </div>
          </div>
        );
      }
    }
    
    export default NotFound;
    