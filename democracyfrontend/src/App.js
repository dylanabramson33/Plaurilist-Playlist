import './index.css';
import React, { Component } from 'react';
import PartyFinder from './PartyFinder';
import PartyDetail from './PartyDetail';
import Register from './Register';
import Banner from './Banner.js';
import Selector from './Selector.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Switch, Route,} from 'react-router-dom'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie';


class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      "isAuthenticated" : false,
      "username" : ""
    }

    this.authenticateUser = this.authenticateUser.bind(this);
    this.checkForUserCookie = this.checkForUserCookie.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  authenticateUser() {
    this.setState({"isAuthenticated" : true});
  }

  logOut() {
    Cookies.remove("username");
    Cookies.remove("token")
    this.setState({"isAuthenticated" : false});
  }

  checkForUserCookie(){
    const username = Cookies.get("username");
    const token = Cookies.get("token");
    if(token){
        this.authenticateUser();
        this.setState({username})
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
            <Route path="/partys/:id" render={(props) => <PartyDetail {...props} username={this.state.username} isAuthenticated={this.state.isAuthenticated}/>}/>
        </Router>
      );
    }
    else {
      return(
        <Router>
            <Route path="/" render={()=> <Banner isAuthenticated={this.state.isAuthenticated}/> }/>
            <Route path="/home" render={() => <Selector isAuthenticated={this.state.isAuthenticated}/>}/>
            <Route path="/search" component={PartyFinder}/>
            <Route path="/partys/:id" render={(props) => <PartyDetail {...props}
              username={this.state.username}  isAuthenticated={this.state.isAuthenticated}/>}/>
            <Route path="/register" render={()=> <Register authenticateUser={this.authenticateUser}/>}/>
            <Route path="/login" component={Register}/>
        </Router>
      );
    }


  }


}



export default App;
