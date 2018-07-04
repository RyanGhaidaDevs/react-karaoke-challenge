import React from 'react';
import Lyrics from './Lyrics';
import VoteBar from './VoteBar';

const KaraokeDisplay = (props) => {

  // What are the props to KaraokeDisplay? 
  //From KaraokeContainer: given the following props:
  /* <KaraokeDisplay  selectedSong={this.state.selectedSong}/>*/  
  let displayButtons = () => {
    if (props.selectedSong){      
      return <VoteBar upTitle="Like" downTitle="Dislike" voteUp={props.voteUp} voteDown={props.voteDown}/> 
    }
  }
  return (
    <div className="karaoke-display">
      {displayButtons()}
      <h2>{props.selectedSong.title}</h2>
      <Lyrics  lyrics={props.selectedSong.lyrics}/>
    </div>
  )
}

export default KaraokeDisplay;
