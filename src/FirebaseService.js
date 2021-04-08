import firebase from "firebase/app";
import "firebase/firestore";
import constants from "./constants";

class FirebaseService {
    async findAll(){
        if (firebase.apps.length === 0) {
            firebase.initializeApp(constants.firebaseConfig);
          }
      
          let db = firebase.firestore();
      
          let data = await db.collection("pins").get();
      
          let items = data.docs.map((doc) => {
            return {
              title: doc.data().title,
              description: doc.data().description,
              location: doc.data().location,
              imgUrl: doc.data().imgurl,
              startDate: doc.data().startdate,
              endDate: doc.data().enddate,
              id: doc.id,
            };
          });

          return items;
    }

    async findById(id){
        if (firebase.apps.length === 0) {
            firebase.initializeApp(constants.firebaseConfig);
          }
      
          let db = firebase.firestore();
      
          let data = await db
            .collection("pins")
            .where(
              firebase.firestore.FieldPath.documentId(),
              "==",
              id
            )
            .get();
      
          let item = data.docs.map((doc) => {
            return {
              title: doc.data().title,
              description: doc.data().description,
              imgurl: doc.data().imgurl,
              location: doc.data().location,
              startDate: doc.data().startdate,
              endDate: doc.data().enddate,
              id: doc.id,
            };
          });

          return item;
    }

    async getLocation(lat, long){
        return await fetch('https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=' + lat.toString() + '&lon=' + long.toString())
        .catch((e) => {
          console.log(e);
          return null;
        })
        .then(response => response.json())
          .then(data => {
             if(data.error){
              return null
             } else {
                return data
             }
            });
    }
}
export default new FirebaseService();