import React, { useState, lazy, Suspense } from "react";

import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { darkTheme, lightTheme } from "./Theme";
import { Switch as Router_Switch, Route } from "react-router-dom";

import ProgressSpinner from "./ProgressSpinner/ProgressSpinner";

const Login = lazy(() => import("./Login/Login"));
const Register = lazy(() => import("./Register/Register"));
const Dashboard = lazy(() => import("./Dashboard/Dashboard"));

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
          <Suspense fallback={ProgressSpinner}>
            <Route
              path="/"
              render={() =>
                localStorage.getItem("refresh_token") ? (
                  <Dashboard handleThemeChange={handleThemeChange} />
                ) : (
                  <Login />
                )
              }
              exact
            />
            {/* <Route path="/" component={!(localStorage.getItem("refresh_token")) ? Login : Home} exact /> */}
            <Route path="/register/" component={Register} />
          </Suspense>
        </Router_Switch>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
