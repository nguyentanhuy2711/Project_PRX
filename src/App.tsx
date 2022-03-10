
import './App.css';
import React from 'react';
import ScheduleFake from './components/Schedule/Schedule';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./components/Login/Login";
import SignUp from './components/SignUp/SignUp';
class App extends React.Component <{},{}>{

  private handleCOntroller(){

  }
  public render() {
    return (
      <Router>
        <div className="App">
          <nav className="navbar navbar-expand-lg navbar-light fixed-top">
            <div className="container" style={{boxShadow:"inherit"}}>
              <Link className="navbar-brand" to={"/sign-in"} style={{fontFamily:"fantasy", color:"red"}}>Schedule Fake</Link>
              <div  className="collapse navbar-collapse" id="navbarTogglerDemo02"  style={{width:"100%"}}>
                <ul className="navbar-nav ml-auto" style={{marginLeft:"950px"}}>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/scheduleFake"} style={{fontFamily:"fantasy"}}>Main</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/sign-in"} style={{fontFamily:"fantasy"}}>Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/sign-up"} style={{fontFamily:"fantasy"}}>Sign up</Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <div className="auth-wrapper" style={{backgroundColor:"lightblue"}}>
            <div className="auth-inner" style={{boxShadow:"10px 10px 5px 5px black"}}>
              <Switch>
                <Route exact path='/' component={Login} />
                <Route path="/scheduleFake"  component={ScheduleFake}/>
                <Route path="/sign-in" component={Login} />
                <Route path="/sign-up" component={SignUp} />
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
