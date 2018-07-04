import React, { Component } from 'react';
import Filter from '../components/Filter';
import SongList from '../components/SongList';
import KaraokeDisplay from '../components/KaraokeDisplay';

class KaraokeContainer extends Component {

  state = {
    songs: [],
    songsList: [],
    selectedSong: "",
    searchTerm: "",
  }
  
  handleClick = (song) => {
    //If current song playing is the same as the song containging the Play button, dont update play count.
    if(song.title !== this.state.selectedSong.title){
      //Based on a User click on a particular "Play" buttons we change the state of selectedSong. 

      //Need to send PATCH request to increase play count by +1

      fetch(`http://localhost:4000/users/14/songs/${song.id}/play`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res=> res.json()).then(resp => this.setState({
        selectedSong: resp
      })).then(this.renderSongList).then(()=>console.log(this.state.selectedSong))
    }
  }

  //Render songList after updating. 
  renderSongList = () => {
    fetch('http://localhost:4000/users/14/songs').then(res => res.json()).then(data => {
    this.setState({
      songs: [...data],
      songsList: data
    })
  })
  }


  handleSearch = (event) => {
    // Checking to ensure User input is captured so state can be set properly. 
     console.log("handleSearch:", event.target.value)

    this.setState({ 
      searchTerm: event.target.value
      //After setting state, sending updated state to filterSongs as argument to adjust songsList accordingly. 
    }, () => this.filterSongs(this.state.searchTerm))
  }

  filterSongs = (search) => {
    //Check to see proper state is being set and sent through as argument
    // console.log("search is:", search)

    //First make an array have all the songs initially, call this filteredSongs. 

    //Make sure filteredSongs is initially based off the state of songs NOT songsList - even though when we fetch our data both get populated with data - this is because if you do we will destructively update songsList when a User searches. Setting filteredSongs equal to this.state.songs ensures that everytime a user changes thier search input - thus, onChange - this function is called and when that happens filtered songs is set to a a full array before being filterd by the search and eventually being set as state for songsList. 

    let filteredSongs = []; 
    filteredSongs = this.state.songs;

    //Now filter this array based on search
    filteredSongs = filteredSongs.filter(song=> song.title.includes(search))

    //Change state of songsList accrodingly
    this.setState({
      songsList: filteredSongs
    }, ()=>console.log(this.state.songsList))
  
  }

  //After  rendering the componenet - thus, "compoenentDidMount" - the code will now fetch for data from local database via GET request and parse data in JSON format before finally updateing two states: 
    //-songs -> responsible for holding an array of songs with structure as follows: 
    /*  {id: 1, title: "Johnny B. Goode", singer: "Chuck Berry", lyrics: "Deep down in Louisiana close to New Orleans↵Way ba…o Johnny go↵Go go go Johnny go↵Go↵Johnny B. Goode", plays: 0, …} */ 
    //-songsList ->  a filtered copy of songs based off a User search; based off of a song title. 
    
  componentDidMount(){
  fetch('http://localhost:4000/users/14/songs').then(res => res.json()).then(data => {
    this.setState({
      songs: [...data],
      songsList: data
    })
  })
  }

  voteUp=()=>{

    let song = this.state.selectedSong

    fetch(`http://localhost:4000/users/14/songs/${song.id}/like`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res=> res.json()).then(resp => this.setState({
        selectedSong: resp
      })).then(this.renderSongList).then(()=>console.log(this.state.selectedSong))
  }

  voteDown=()=>{
    
    let song = this.state.selectedSong
    
    fetch(`http://localhost:4000/users/14/songs/${song.id}/dislike`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res=> res.json()).then(resp => this.setState({
        selectedSong: resp
      })).then(this.renderSongList).then(()=>console.log(this.state.selectedSong))
  }



  render() {
    return (
      <div className="karaoke-container">
        <div className="sidebar">
          <Filter searchState={this.state.searchTerm} handleSearch={this.handleSearch}/>
          <SongList songsList={this.state.songsList} handleClick={this.handleClick} searchTerm={this.state.searchTerm}/>
        </div>
        <KaraokeDisplay  selectedSong={this.state.selectedSong} voteUp={this.voteUp} voteDown={this.voteDown}/>
      </div>
    );
  }
}

export default KaraokeContainer;
