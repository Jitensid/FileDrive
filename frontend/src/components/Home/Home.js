import React, { useEffect } from "react";
import AxiosApiInstance from "../axios_instance";
import Dashboard from "../Dashboard/DashBoard";

function Home(props) {
  useEffect(() => {
    alert("Fetching Data from Django !!!");
    AxiosApiInstance.AxiosApiInstance.post("api/test/", {
      dummy: "dummy",
    });
  }, []);

  return (
    <React.Fragment>
      <Dashboard handleThemeChange={props.handleThemeChange}></Dashboard>
    </React.Fragment>
  );
}

export default Home;
