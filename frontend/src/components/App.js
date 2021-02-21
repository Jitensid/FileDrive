import React, { useState } from "react";

import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { darkTheme, lightTheme } from "./Theme";
import { Switch as Router_Switch, Route } from "react-router-dom";

import Home from "./Home/Home";
import Login from "./Login/Login";
import Register from "./Register/Register";
import ProgressSpinner from "./ProgressSpinner/ProgressSpinner";

function App() {
  const previousdarkState = localStorage.getItem("darkState");

  const [darkState, setDarkState] = useState(
    previousdarkState ? JSON.parse(previousdarkState) : false
  );

  const handleThemeChange = () => {
    localStorage.setItem("darkState", !darkState);
    setDarkState(!darkState);
  };

  return (
    <ThemeProvider theme={darkState ? darkTheme : lightTheme}>
      <CssBaseline>
        <ProgressSpinner></ProgressSpinner>
        <Router_Switch>
          <Route
            path="/"
            render={() =>
              localStorage.getItem("refresh_token") ? (
                <Home handleThemeChange={handleThemeChange} />
              ) : (
                <Login />
              )
            }
            exact
          />
          {/* <Route path="/" component={!(localStorage.getItem("refresh_token")) ? Login : Home} exact /> */}
          <Route path="/register/" component={Register} />
          <Route path="/spinner/" component={ProgressSpinner} />
        </Router_Switch>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
