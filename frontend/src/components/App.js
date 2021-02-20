import React, { useState, lazy, Suspense } from "react";

import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { darkTheme, lightTheme } from "./Theme";

import { Switch as Router_Switch, Route } from "react-router-dom";

const Login = lazy(() => import("./Login/Login"));
const Home = lazy(() => import("./Home/Home"));
const Register = lazy(() => import("./Register/Register"));

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
        <Suspense fallback={<span>Loading...</span>}>
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
          </Router_Switch>
        </Suspense>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
