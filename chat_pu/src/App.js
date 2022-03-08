import React from "react";
import "./App.css";
import AppLayout from "./components/AppLayout";
import Login from "./components/Login";
import { useSelector } from "react-redux";

function App() {
  // const callApi = async () => {
  //   axios
  //     .post("/api1", null, {
  //       params: {
  //         'empno': "test",
  //         'passwd': "tre",
  //       },
  //     })
  //     .then((res) => console.log(res.data));
  // };

  const { me } = useSelector((state) => state.user);
  
  return <div>{me ? <AppLayout /> : <Login />}</div>;
}

export default App;
