// import logo from './logo.svg';
import './App.css';
import Splash from "./pages/Splash";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Edit from "./pages/Edit";
import React from "react";
import {Route, BrowserRouter} from 'react-router-dom';

function App() {

  return (
    <div className="App">
      <header className="App-header">
      <br/>
        <BrowserRouter>
          {/*Path to splash page*/}
          <Route exact path="/" component={Splash}></Route>
          {/*Path to form for existing users to log in*/}
          <Route exact path="/login" component={Login}></Route>
          {/*Path to form for new users to sign up*/}
          <Route exact path="/signup" component={Signup}></Route>
          {/*Path to users home page*/}
          <Route exact path="/home/:username" component={Home}></Route>
          {/* Path to the task editing page */}
          <Route exact path="/home/edit/:taskId" component={Edit}></Route>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;