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

  //API call to search and return a list of users
  const searchUser = async name => {
    setLoading(true);

    const res = await fetch(
      `https://api.github.com/search/users?q=${name}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    const data = await res.json();
    const gitnames = data.items;

    setUsers(gitnames);
    setUser({});
    setRepos([]);
    setSearch(true);

    setLoading(false);
  };

  //API call to get details about a single user
  const getUser = async login => {
    setLoading(true);

    const res = await axios(
      `https://api.github.com/users/${login}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    const user = await res.data;

    setUser(user);
    setLoading(false);
  };

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

  //Clear all input field
  const clearUser = () => {
    setUsers([]);
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
                  <Search
                    searchUser={searchUser}
                    clearUser={clearUser}
                    search={search}
                    setAlert={setAlert}
                  />
                  <User users={users} loading={loading} search={search} />
                </Fragment>
              )}
            />
            <Route exact path='/about' component={About} />
            <Route
              exact
              path='/users/:login'
              render={props => (
                <UserInfo
                  {...props}
                  getUser={getUser}
                  getRepos={getRepos}
                  user={user}
                  repos={repos}
                  loading={loading}
                />
              )}
            />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
