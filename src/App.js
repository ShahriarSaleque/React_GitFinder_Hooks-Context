import React, { Fragment, useState } from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import About from "./components/pages/About";
import User from "./components/users/User";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import UserInfo from "./components/users/UserInfo";
import "./App.css";

import GithubState from "./context/github/GithubState";

const App = () => {
  const [alert, setAlertNotifiy] = useState(null);

  //Alert notification
  const setAlert = (msg, type) => {
    setAlertNotifiy({ msg: msg, type: type });

    setTimeout(() => {
      setAlertNotifiy(null);
    }, 3000);
  };

  return (
    <GithubState>
      <Router>
        <div className='App'>
          <Navbar />
          <div className='container'>
            <Alert alert={alert} />
            <Switch>
              <Route
                exact
                path='/'
                render={props => (
                  <Fragment>
                    <Search setAlert={setAlert} />
                    <User />
                  </Fragment>
                )}
              />
              <Route exact path='/about' component={About} />
              <Route exact path='/users/:login' component={UserInfo} />
            </Switch>
          </div>
        </div>
      </Router>
    </GithubState>
  );
};

export default App;
