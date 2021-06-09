// import logo from './logo.svg';
import './App.css';
import Splash from "./pages/Splash";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import React, {useState} from "react";
import {Route, BrowserRouter} from 'react-router-dom';

function App() {
  const [user, setUser] = useState({});

  return (
    <div className="App">
      <header className="App-header">
      <br/>
        <BrowserRouter>
          {/*Path to splash page*/}
          <Route exact path="/" component={Splash}></Route>
          {/*Path to form for existing users to log in*/}
          <Route exact path="/login" component={Login} props={user, setUser}></Route>
          {/*Path to form for new users to sign up*/}
          <Route exact path="/signup" component={Signup}></Route>
          {/*Path to home page which*/}
          <Route exact path="/home/:username" component={Home} props={user, setUser}></Route>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;