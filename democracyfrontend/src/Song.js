import React, { useEffect, useState } from 'react';
import heart from './heart.png';
import redheart from './redheart.png';
import Link from 'react-router-dom/Link';




function Song({name, artist, votes, id, isAuthenticated, favorites, username }) {
  const [like,setLike] = useState(0);


  useEffect(() => {
    changeLikeStatus();
  },[like])


  const changeLikeStatus = async () => {
      const url = `http://127.0.0.1:8000/songs/${id}/like`
      const likeJSON = {
        vote : like
      }
      const options = {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(likeJSON),

      }
      const data = await fetch(url, options);
  }
  const checkForUserName = () => {
    if(favorites.map((item) => {
      return item.username;
    }).indexOf(username) != -1) {
      return redheart

    }
    else {
      console.log(favorites);
      return heart
    }
  }

    if(isAuthenticated){
      return (
           <tr id={id}>
             <td> {name} </td>
             <td> {artist} </td>
             <td> {votes + like} </td>
             <td> <button onClick={() => setLike((like + 1) % 2)}><img src={checkForUserName()} alt="Like"/> </button> </td>
           </tr>
      );
    }
    else {
      return(
        <tr id={id}>
          <td> {name} </td>
          <td> {artist} </td>
          <td> {votes + like} </td>
          <td> <Link to="/register"> <button><img src={heart} alt="Like"/> </button> </Link> </td>
        </tr>
      );
    }




}

export default Song;
