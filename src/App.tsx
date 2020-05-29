import React, { FC } from "react";
import { Layout, Menu, Avatar, Modal } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "./App.css";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase";
import firebaseConfig from "./firebase";

firebase.initializeApp(firebaseConfig);

const { Header, Sider, Content } = Layout;

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
    <Layout hasSider>
      <Modal title="sign in" visible={true} footer={null}>
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      </Modal>
      <Sider>
        <div>
          <Avatar size={48} src={propic} />
        </div>
        <Menu mode="inline" style={{ height: "100%" }}>
          <Menu.Item>chat 1</Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header />
        <Content>hi</Content>
      </Layout>
    </Layout>
  );
};

export default App;
