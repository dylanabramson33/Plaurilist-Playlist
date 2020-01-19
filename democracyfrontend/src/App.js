import './index.css';
import React, { Component } from 'react';
import PartyFinder from './PartyFinder';
import PartyDetail from './PartyDetail';
import Banner from './Banner.js';
import Selector from './Selector.js';
import LogIn from './LogIn.js';
import Create from './Create.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Switch, Route,} from 'react-router-dom'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie';
import queryString from 'query-string';


class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      "isAuthenticated" : false,
    }

    this.authenticateUser = this.authenticateUser.bind(this);
    this.checkForUserCookie = this.checkForUserCookie.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  authenticateUser() {
    this.setState({"isAuthenticated" : true});
  }

  logOut() {
    Cookies.remove("token")
    this.setState({"isAuthenticated" : false});
  }

  checkForUserCookie(){
    const token = Cookies.get("token");
    if(token){
        this.authenticateUser();
    }

  }

  componentDidMount() {
    this.checkForUserCookie();

  }

  render (){
    if(this.state.isAuthenticated){
      return (
        <Router>
            <Route path="/" render={()=> <Banner logOut={this.logOut} username={this.state.username} isAuthenticated={this.state.isAuthenticated}/>}/>
            <Route path="/home" render={() => <Selector isAuthenticated={this.state.isAuthenticated}/>}/>
            <Route path="/search" component={PartyFinder}/>
            <Route path="/create" component={Create}/>
            <Route path="/partys/:id" render={(props) => <PartyDetail {...props} username={this.state.username} isAuthenticated={this.state.isAuthenticated}/>}/>
        </Router>
      );
    }
    else {
      return(
        <Router>
            <Route path="/" render={()=> <Banner isAuthenticated={this.state.isAuthenticated}/> }/>
            <Route path="/login" component={LogIn}/>
            <Route path="/home" render={() => <Selector isAuthenticated={this.state.isAuthenticated}/>}/>
            <Route path="/search" component={PartyFinder}/>
            <Route path="/partys/:id" render={(props) => <PartyDetail {...props}
              username={this.state.username}  isAuthenticated={this.state.isAuthenticated}/>}/>
        </Router>
      );
    }


  }


}



export default App;
