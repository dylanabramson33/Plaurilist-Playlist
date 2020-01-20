import React, { useEffect, useState } from 'react';
import './PartyFinder.css';
import  Song from './Song';
import PartyFinderBox from './PartyFinderBox'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom';
import Cookies from 'js-cookie';
import Modal from 'react-bootstrap/Modal';


function PartyFinder() {


  const [search,setSearch] = useState("");
  const [query,setQuery] = useState("");
  const [partys,setPartys] = useState([]);


  useEffect(() => {
      getPartys();

  },[query])

  const getPartys = async () => {
    const response = await fetch(`http://127.0.0.1:8000/partys/name=${search}`);
    const data = await response.json();
    setPartys(data);



  };

  const updateSearch = e => {
    setSearch(e.target.value);
  }

  function getPrivacyVal(val){
      if(val == true){
        return "Public";
      }
      else {
        return "Private";
      }
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
  }

  return (
    <div className="PartyFinder">
      <div class="container">
      <form className="form" onSubmit={getSearch}>

          <input className="form-control" value={search} onChange={updateSearch} />
          <button className="btn btn-primary">
            Search
          </button>
      </form>
        <div className="results">
        {partys.map(party => (

          <Link to={"/partys/"+party.id}>
          <PartyFinderBox party_name={party.party_name} privacy={getPrivacyVal(party.public)}/>
          </Link>

        ))}

        </div>

      </div>


    </div>
  );
}

export default PartyFinder;
