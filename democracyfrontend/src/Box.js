import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Box.css';


class Box extends Component {

  constructor(props){
    super(props);

  }
  render (){
    return(
      <div className="Box">
        <h1> {this.props.action} </h1>
        <h4> {this.props.description} </h4>
      </div>
    );

  }



}



export default Box;
