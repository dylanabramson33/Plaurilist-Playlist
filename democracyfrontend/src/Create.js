import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Create.css'


class Create extends Component {

  constructor(props){
    super(props);

    this.state = {
      'privacy' : null,
      'password' : ''
    }
    this.setPrivacy = this.setPrivacy.bind(this);
  }

  setPrivacy(event) {
    this.setState({'privacy' : event.target.value});
  }


  render (){
    return(
      <div className="Create">
        <div className="container">
        <h1> Create Party </h1>
        <form className="form">
          <input className="form-control" placeholder="Party Name"/>

          <div>
            <h5 className="privacySelector"> Privacy Level: </h5>
            <div onChange={this.setPrivacy}>
              <div className="public">
                <label> Public </label>
                <input type="radio" name="privacy" value="public"/>
              </div>
              <div className="private">
                <label> Private </label>
                <input type="radio" name="privacy" value="private"/>
              </div>
            </div>
          </div>

          {this.state.privacy=="private" &&
            <input  placeholder="Code" />
          }

          <div className="createSubmit">
            <input className="btn btn-primary" type="submit"/>
          </div>
        </form>
        </div>
      </div>
    );

  }



}



export default Create;
