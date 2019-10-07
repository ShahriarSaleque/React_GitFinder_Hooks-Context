import React, { Component } from "react";
import Navbar from "./components/layout/Navbar";
import User from "./components/users/User";
import Search from "./components/users/Search";
import "./App.css";

// Context API = Global store
// App-level state = used for data needed throughout the app

class App extends Component {
  //init an app-level state
  state = {
    loading: false,
    search: false,
    searchName: "",
    users: {}
  };

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
      search: true,
      searchName: name,
      loading: false
    });
  };

  clearUser = () => {
    this.setState({ users: [], loading: false });
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const res = await fetch(
      `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    const data = await res.json();

    //After the data has been fetched
    this.setState({
      users: data,
      search: false,
      loading: false
    });
    //console.log(this.state);
  }
  render() {
    return (
      <div className='App'>
        {/* Pass a prop from app.js to navbar through a component */}
        <Navbar />
        <div className='container'>
          <Search
            searchUser={this.searchUser}
            clearUser={this.clearUser}
            search={this.state.search}
          />
          <User
            users={this.state.users}
            loading={this.state.loading}
            search={this.state.search}
          />
        </div>
      </div>
    );
  }
}

export default App;
