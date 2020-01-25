import React, { useEffect, useState } from 'react';
import heart from './heart.png';
import Song from './Song'
import AddPlaylist from './AddPlaylist'
import SongSearch from './SongSearch'
import SpotifyPlayer from 'react-spotify-web-playback';
import Cookies from 'js-cookie';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import './PartyDetail.css'

function PartyDetail({match, isAuthenticated, username}) {

  useEffect(() => {
      fetchParty();
  },[])


  const[party, setParty] = useState({});
  const[songs, setSongs] = useState([]);
  const[deviceID, setDeviceID] = useState("");


  const fetchParty = async () => {
    const fetchedParty = await fetch(`http://127.0.0.1:8000/partys/${match.params.id}`);
    const party = await fetchedParty.json();
    const songs = await party.songs;
    setParty(party);
    setSongs(songs);


  }

  const newSongs = song => {
    const newSongs = songs.concat([song]);
    setSongs(newSongs);
  }
  if(!deviceID){
    return (

      <div className="PartyDetail">
        <AddPlaylist setDeviceID={setDeviceID} songs={songs}/>
        <h1> {party.party_name} </h1>
        <table className="PartyDetailTable">
        <thead>
        <tr>
          <th> Name </th>
          <th> Artist </th>
          <th> Votes </th>
          <th> Like </th>
        </tr>
        </thead>

        <tbody>

         {songs.map(song =>(
           <Song name={song.name} artist={song.artist}
           favorites={song.favorites}
           isAuthenticated={isAuthenticated}
           votes={song.num_favorites}
           username={username}
           id={song.id}/>
        ))}

        </tbody>
        </table>
        <SongSearch id={match.params.id} newSongs={newSongs}/>


      </div>


    );
  }
  else {
    return (
      <div className="PartyDetail">
        <AddPlaylist setDeviceID={setDeviceID} songs={songs}/>
        <h1> {party.party_name} </h1>
        <table className="PartyDetailTable">
        <thead>
        <tr>
          <th> Name </th>
          <th> Artist </th>
          <th> Votes </th>
          <th> Like </th>
        </tr>
        </thead>
        <tbody>
         {songs.map(song =>(
           <Song name={song.name} artist={song.artist}
           favorites={song.favorites}
           isAuthenticated={isAuthenticated}
           votes={song.num_favorites}
           username={username}
           id={song.id}/>
        ))}
        </tbody>
        </table>
        <SongSearch id={match.params.id} newSongs={newSongs}/>
        <button> Play </button>


      </div>
    );

  }
}

export default PartyDetail;
