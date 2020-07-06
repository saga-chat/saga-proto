import { AppData } from "../appdata";
import dummyRoom from "./dummyRoom";
import dummyMeId from "./dummyMe";
import { LocalUser } from "../user";
import dummyUsers from "./dummyUsers";
import React from "react";

const dummyMe: LocalUser = {
  rooms: [dummyRoom.id],
  id: dummyMeId,
  created: Date.now(),
  avatar:
    "https://pbs.twimg.com/profile_images/1198871789545381888/F2SmhoVi_400x400.jpg",
  username: "max",
  display_name: "Max Krieger",
};

const dummyAppData: AppData = {
  me: dummyMe.id,
  myRooms: [dummyRoom.id],
  knownUsers: { ...dummyUsers, [dummyMe.id]: dummyMe },
  knownRooms: { [dummyRoom.id]: dummyRoom },
};

export default dummyAppData;

export const DummyAppDataContext = React.createContext(dummyAppData);
