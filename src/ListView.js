import React, { Component } from "react";
import { Card, CardContent } from "@material-ui/core"
import Typography from "@material-ui/core/Typography"
import { Link } from "react-router-dom"
import firebaseService from "./FirebaseService";
import "./ListView.css";

class ListView extends Component{
    constructor(props){
        super(props)

        this.state = {
            pins: []
        }
    }

    async componentDidMount() {
        let items = await firebaseService.findAll();
        this.setState({pins:items})
    }


    render(){
        return(
            <div className="content">   
                {this.state.pins.map((pin) => 
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
                        <img className="actualImage" src={pin.imgUrl} alt="Not found"></img>
                        </div>
                        </CardContent>
                    </Card>
                    </Link>
                )}
            </div>
        );
    }
}

export default ListView;