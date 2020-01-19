import React, { Component } from 'react';
import Cookies from 'js-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useLocation, Redirect} from 'react-router-dom'
import './Banner.css';
import ballotbox from './ballotbox.png'


function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function LogIn({}) {
  const query = useQuery();
  const token = query.get("api_token");
  if(token){
    Cookies.set("token", token);
    return <Redirect push to="/home"/>;
  }
  else {
    return (
      <div>
        <h1> Error Logging Into Spotify </h1>
      </div>
    );
  }


}


export default LogIn;
