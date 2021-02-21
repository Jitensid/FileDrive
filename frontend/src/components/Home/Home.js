import React, { useEffect } from "react";
import AxiosApiInstance from "../axios_instance";
import Dashboard from "../Dashboard/DashBoard";
import { trackPromise } from "react-promise-tracker";

function Home(props) {
  useEffect(() => {
    alert("Fetching Data from Django !!!");
    trackPromise(
      AxiosApiInstance.AxiosApiInstance.post("api/test/", {
        dummy: "dummy",
      })
    );
  }, []);

  return (
    <React.Fragment>
      <Dashboard handleThemeChange={props.handleThemeChange}></Dashboard>
    </React.Fragment>
  );
}

export default Home;