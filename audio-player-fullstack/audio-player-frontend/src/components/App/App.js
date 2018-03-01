import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import SongsList from '../SongsList'
import SongDetails from '../SongDetails'
import axios from 'axios'
import './App.css';



class App extends Component {
  state = {
    currentSong: 0,
    isPlaying: false,
    songs: []
  }

  componentDidMount() {
    axios.get('http://localhost:8080')
      .then((response) => {
        this.setState({
          songs: response.data
        })
      })
  }

  changeSong = (index) => {
    const { currentSong, isPlaying } = this.state
    this.setState({
      currentSong: currentSong + index
    }, () => {
      // eslint-disable-next-line
      (!isPlaying) ?
        this.audioPlayer.load() :
        this.audioPlayer.load() & this.audioPlayer.play()
    })
  }

  pumpItUp = () => {
    // eslint-disable-next-line
    !this.state.isPlaying ?
      this.audioPlayer.play() &
      this.setState({ isPlaying: true }) :
      this.audioPlayer.pause() &
      this.setState({ isPlaying: false })
  }

  playSong = (i) => {
    this.setState({
      currentSong: this.state.songs[i].id,
      isPlaying: true
    })
    this.audioPlayer.load()
    this.audioPlayer.play()
  }

  render() {
    const { isPlaying, currentSong } = this.state
    return (
      this.state.songs.length > 0 && (
        <div className="App">

          <audio ref={(self) => { this.audioPlayer = self }}>
            <source src={this.state.songs[currentSong].source} />
          </audio>

          <button disabled={currentSong === 0}
            onClick={() => { this.changeSong(-1) }}>
            Previous
          </button>

          <button disabled={isPlaying}
            onClick={this.pumpItUp}>
            Play
          </button>

          <button disabled={!isPlaying}
            onClick={this.pumpItUp}>
            Pause
          </button>

          <button disabled={currentSong === this.state.songs.length - 1}
            onClick={() => { this.changeSong(+1) }}>
            Next
          </button>

          <p>The current song playing is: <strong><u>{this.state.songs[currentSong].title}</u></strong></p>

          <Route exact path="/" render={() =>
            <SongsList songs={this.state.songs}
              playSong={this.playSong} />
          } />
          <Route path='/:songId' render={(porn) =>
            <SongDetails songs={this.state.songs}
              {...porn}
              playSong={this.playSong} />
          } />
        </div>
      )
    );
  }
}

export default App;
