import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Create.css'


class Create extends Component {

  constructor(props){
    super(props);

    this.state = {
      'party_name' : '',
      'public' : null,
      'password' : ''
    }
    this.setPartyName = this.setPartyName.bind(this);
    this.setIsPublic = this.setIsPublic.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.submitData = this.submitData.bind(this);
  }

  setPartyName(e){
    this.setState({"party_name" : e.target.value});
  }

  setIsPublic(e){
    const isPublic = e.target.value == "public";
    this.setState({"public" : isPublic});

  }

  setPassword(e){
    this.setState({"password" : e.target.value});

  }



  submitData(e) {
    e.preventDefault();
    const data = {
      "party_name" : this.state.party_name,
      "public" : this.state.public,
      "password" : this.state.password
    }
    const options = {
      method : "POST",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify(data),
    }
    fetch("http://127.0.0.1:8000/partys/create/",options);
  }


  render (){
    return(
      <div className="Create">
        <div className="container">
        <h1> Create Party </h1>
        <form className="form" onSubmit={this.submitData}>
          <input className="form-control" name="party_name" placeholder="Party Name" onChange={this.setPartyName}/>

          <div>
            <h5 className="privacySelector"> Privacy Level: </h5>
            <div onChange={this.setIsPublic}>
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

          {this.state.public==false &&
            <input  placeholder="Code" onChange={this.setPassword}/>
          }

          <div className="createSubmit">
            <input className="btn btn-primary"  type="submit"/>
          </div>
        </form>
        </div>
      </div>
    );

  }



}



export default Create;
