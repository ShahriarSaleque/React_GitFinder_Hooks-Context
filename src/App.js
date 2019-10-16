import React, { Fragment, useState, useEffect } from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import About from "./components/pages/About";
import User from "./components/users/User";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import UserInfo from "./components/pages/UserInfo";
import "./App.css";
import axios from "axios";

import GithubState from "./context/github/GithubState";

const App = () => {
  const [users, setUsers] = useState({});
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState(false);
  const [alert, setAlertNotifiy] = useState(null);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);

  //Bring in random users in homepage
  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      const res = await fetch(
        `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );
      const data = await res.json();

      setUsers(data);
      setSearch(false);
      setLoading(false);
      //eslint-disable-next-line
    }
    fetchData();
  }, []);

  //API call to fetch all the user repos
  const getRepos = async login => {
    setLoading(true);

    const res = await axios(
      `https://api.github.com/users/${login}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    const repos = await res.data;

    setRepos(repos);
    setLoading(false);
  };

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
              <Route
                exact
                path='/users/:login'
                render={props => (
                  <UserInfo {...props} getRepos={getRepos} repos={repos} />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    </GithubState>
  );
};

export default App;
