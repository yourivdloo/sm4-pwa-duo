import  React, { Component } from "react";
import constants from "./constants"
import firebase from 'firebase/app';
import "firebase/firestore";

class DetailView extends Component{
    constructor(props){
        super()

        this.state = { 
            pin: {}
        }
    }

    async componentDidMount(){
        if (firebase.apps.length === 0) {
            firebase.initializeApp(constants.firebaseConfig);
          }
      
          let db = firebase.firestore();
      
        let data = await db.collection("pins").where(firebase.firestore.FieldPath.documentId(), '==', this.props.match.params.id).get();

        let item = data.docs.map(doc => {
            return {
              title: doc.data().title,
              description: doc.data().description,
              location: doc.data().location,
              startDate: doc.data().startdate,
              endDate: doc.data().enddate,
              id: doc.id
            };
          })

        this.setState({pin: item[0] ?? {title:"Not found", description:"There were no pins found with the specified ID"}})
        console.log(this.state.pin)
    }

    render(){
        return(
    <div>
        <h1>{this.state.pin.title}</h1><br/>
        <h3>{this.state.pin.description}</h3>
    </div>
        )
    }
}

export default DetailView;