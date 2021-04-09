import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MapView from "./MapView";
import AddView from "./AddView";
import DetailView from "./DetailView";
import ListView from "./ListView";
import EditView from "./EditView";
import FutureView from "./FutureView";
import NotFound from "./NotFound";
import Navbar from "./Navbar";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact from="/" component={MapView} />
          <Route exact path="/new" component={AddView} />
          <Route exact path="/list" component={ListView} />
          <Route exact path="/future" component={FutureView}/>
          <Route exact path="/edit/:id" component={EditView} />
          <Route exact path="/details/:id" component={DetailView} />
          <Route component={NotFound}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;