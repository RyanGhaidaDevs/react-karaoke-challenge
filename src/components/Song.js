import React from 'react';

const Song = (props) => {


  // Now, when we put our onClick on our button we can pass in which song was clicked based off the props we passed down from songsList. 

  //So our handleClick function, which lives two levels up in KaraokeContainer should be receive a song object! This way we know which song lyrics to dispaly. 
  return (
    <tr className="song">
      <td>{props.song.title}</td>
      <td>{props.song.singer}</td>
      <td>{props.song.likes}</td>
      <td>{props.song.dislikes}</td>
      <td>{props.song.plays}</td>
      <td><button onClick={() => props.handleClick(props.song)}>Play</button></td>
    </tr>
  )
}

export default Song;
