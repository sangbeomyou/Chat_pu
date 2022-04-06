import React from "react";
import "./App.css";
import AppLayout from "./components/AppLayout";
import Login from "./components/Login";
import { useSelector } from "react-redux";

function App() {

  const { me } = useSelector((state) => state.user);

  return (
    <div>
      <title>{me ? me[0].korname  :  "CHAT"} </title>
      {me ? <AppLayout /> : <Login />}
    </div>
  );
}

export default App;
