import React from "react";
import "./App.css";
import AppLayout from "./components/AppLayout";
import Login from "./components/Login";
import { useSelector } from "react-redux";
import 'moment/locale/ko';
import moment from 'moment';
function App() {

  const { me } = useSelector((state) => state.user);

  moment.locale('ko')
  var da = moment().format("YYYY-MM-DD HH:mm")
  // console.log(moment(da).format("LTS"))
  return (
    <div>
      <title>{me ? me[0].korname  :  "CHAT"} </title>
      {me ? <AppLayout /> : <Login />}
    </div>
  );
}

export default App;
