import React, { FC } from "react";
import { UserOutlined } from "@ant-design/icons";
import "./App.css";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase";
import firebaseConfig from "./firebase";
import Frame from "./components/framing/Frame";

firebase.initializeApp(firebaseConfig);

const App: FC = () => {
  const uiConfig = {
    signInFlow: "popup",
    signInOptions: [firebase.auth.TwitterAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccessWithAuthResult: (x: any) => {
        console.log(x);
        return false;
      },
    },
  };
  const propic = (firebase.auth().currentUser
    ? firebase.auth().currentUser!.photoURL
    : "https://picsum.photos/48/48") as string;

  return (
    <div style={{ overflow: "hidden" }}>
      <Frame />
    </div>
  );
};

export default App;
