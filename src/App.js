import React, { Component } from "react";
import Navbar from "./components/layout/Navbar";
import User from "./components/users/User";
import "./App.css";

//Context API = Global store
// App-level state = used for data needed throughout the app

class App extends Component {
  render() {
    return (
      <div className='App'>
        {/* Pass a prop from app.js to navbar through a component */}
        <Navbar />
        <div className='container'>
          <User />
        </div>
      </div>
    );
  }
}

export default App;
