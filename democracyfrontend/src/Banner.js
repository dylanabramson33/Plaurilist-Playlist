import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'react-router-dom/Link'
import './Banner.css';
import ballotbox from './ballotbox.png'


class Banner extends Component {

  constructor(props){
    super(props);



  }
  render (){
    if(!this.props.isAuthenticated){
      return(

        <div className="Banner">
          <Link to="/home">
            <img src={ballotbox}/>
            <h1> Plauralist Playlist </h1>
          </Link>
          <a href="//127.0.0.1:8000/spotify-login/">
            <div className="logIn">
              Log In
            </div>
          </a>
          <Link to="/register">
            <div className="register">
              Register
            </div>
          </Link>
        </div>
      );
    }
    else {
      return(
        <div className="Banner">
          <Link to="/home">
            <img src={ballotbox}/>
            <h1> Plauralist Playlist </h1>
          </Link>
          <div className="logOut">
            <button onClick={this.props.logOut}> Log Out </button>
          </div>
          <div className="Username">
            <h1> {this.props.username} </h1>
          </div>

        </div>
      );
    }


  }



}



export default Banner;
