import React, { Component, Fragment } from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import About from "./components/pages/About";
import User from "./components/users/User";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import UserInfo from "./components/pages/UserInfo";
import "./App.css";
import axios from "axios";

// Context API = Global store
// App-level state = used for data needed throughout the app

class App extends Component {
  //init an App-level state
  state = {
    loading: false,
    search: false,
    searchName: "",
    users: {},
    alert: null
  };

  //Bring in random users in the homepage
  async componentDidMount() {
    this.setState({ loading: true });
    const res = await fetch(
      `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    const data = await res.json();

    this.setState({
      users: data,
      search: false,
      loading: false
    });
  }

  //API call to search and return a list of users
  searchUser = async name => {
    this.setState({ loading: true });

    const res = await fetch(
      `https://api.github.com/search/users?q=${name}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    const data = await res.json();
    const gitnames = data.items;

    //After the individual user data has been fetched
    this.setState({
      users: gitnames,
      user: {},
      repos: [],
      search: true,
      searchName: name,
      loading: false
    });
  };

  //API call to get details about a single user
  getUser = async login => {
    this.setState({ loading: true });

    const res = await fetch(
      `https://api.github.com/users/${login}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    const user = await res.json();

    this.setState({ user, loading: false });
  };

  //API call to fetch all the user repos
  getRepos = async login => {
    this.setState({ loading: true });

    const res = await axios(
      `https://api.github.com/users/${login}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    const repos = await res.data;

    this.setState({ repos });
  };

  //Utilities
  //Clear all input field
  clearUser = () => {
    this.setState({ users: [], loading: false });
  };

  //Alert notification
  setAlert = (msg, type) => {
    this.setState({ alert: { msg: msg, type: type } });

    setTimeout(() => {
      this.setState({ alert: null });
    }, 3000);
  };

  render() {
    const { search, users, loading, user, repos } = this.state;
    return (
      <Router>
        <div className='App'>
          <Navbar />
          <div className='container'>
            <Alert alert={this.state.alert} />
            <Switch>
              <Route
                exact
                path='/'
                render={props => (
                  <Fragment>
                    <Search
                      searchUser={this.searchUser}
                      clearUser={this.clearUser}
                      search={search}
                      setAlert={this.setAlert}
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
                    getUser={this.getUser}
                    getRepos={this.getRepos}
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
  }
}

export default App;
