import React from 'react';
import Song from './Song';

const SongList = (props) => {

  //How is this rendering a list of songs? 
  //It should be, initially, all songs from state. 
  //What props is SongList recieving? 
  /* 
  songsList={this.state.songsList} handleClick={this.handleClick} 
  searchTerm={this.state.searchTerm} */

  //We want songList to display songs based off the user search. 

  
  const mapSongs = () => {
    //Give each Song component all data we may need including id, song object itself etc. as well as a function to handle the click event on "Play", note this function is defined in KaraokeContainer because our state lives there. 
    return props.songsList.map((s)=> {
        return <Song key={s.id} song={s} handleClick={props.handleClick}/> 
     })
  }

  return (
    <table className="song-list">
      <tbody>
        <tr>
          <th>Title</th>
          <th>Singer</th>
          <th>Likes</th>
          <th>Dislikes</th>
          <th>Times Played</th>
          <th>▶</th>
        </tr>
        {mapSongs()}
      </tbody>
    </table>
  )
}

export default SongList;
