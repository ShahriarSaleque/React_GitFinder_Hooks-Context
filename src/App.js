import React, { Component } from "react";
import Navbar from "./components/layout/Navbar";
import User from "./components/users/User";
import "./App.css";

// Context API = Global store
// App-level state = used for data needed throughout the app

class App extends Component {
  //init an app-level state
  state = {
    loading: false,
    users: {}
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const res = await fetch("https://api.github.com/users");
    const data = await res.json();
    //After the data has been fetched
    this.setState({
      users: data,
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
          <User users={this.state.users} loading={this.state.loading} />
        </div>
      </div>
    );
  }
}

export default App;
