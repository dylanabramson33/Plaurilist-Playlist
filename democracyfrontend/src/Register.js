import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

function Register({authenticateUser}) {
  const [username,setUsername] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [query,setQuery] = useState({});


  //Validate form data in a cleaner way.
  useEffect(() => {
    if(query.username !== undefined){
      registerUser(query != {});
    }
  },[query])

  const getSearch = (e) => {
    e.preventDefault();
    const q = {
      "username" : username,
      "email" : email,
      "password" : password
    }
    setQuery(q);
  }

  const updateUsername = e => {
    setUsername(e.target.value);
  }
  const updateEmail = e => {
    setEmail(e.target.value);
  }
  const updatePassword = e => {
    setPassword(e.target.value);
  }

  const registerUser = async () => {
    const url = "http://127.0.0.1:8000/users/"
    const options = {
        "method" : "POST",
        "headers" : {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(query),
    };

    const response = await fetch(url,options);
    const data = await response.json();

    authenticateUser();
    Cookies.set("username", data.username);
    Cookies.set("token", data.token);
    console.log(Cookies.get("username"));


  }


  return (
    <form className="search-form" onSubmit={e => getSearch(e)}>
      <input className="search-bar" value={username} onChange={updateUsername} />
      <input className="search-bar" value={email} onChange={updateEmail} />
      <input className="search-bar" value={password} onChange={updatePassword} />
      <button className="search-button">
        Register
      </button>
    </form>
  );
}

export default Register;
