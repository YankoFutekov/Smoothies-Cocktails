import firebase from "firebase";
import firestore from "firebase/firestore";

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAeoTpCN9q_UQyTUCRfOOWCt1Iw4szv694",
  authDomain: "cool-smoothies.firebaseapp.com",
  databaseURL: "https://cool-smoothies.firebaseio.com",
  projectId: "cool-smoothies",
  storageBucket: "cool-smoothies.appspot.com",
  messagingSenderId: "471037736413"
};

const firebaseApp = firebase.initializeApp(config);
firebaseApp.firestore().settings({ timestampsInSnapshots: true });

// Export firestore DB
export default firebaseApp.firestore();
