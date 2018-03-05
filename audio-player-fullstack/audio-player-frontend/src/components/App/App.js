import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import SongsList from '../SongsList'
import SongDetails from '../SongDetails'
import axios from 'axios'
import './App.css'

class App extends Component {
  state = {
    currentSong: 0,
    isPlaying: false,
    songs: [],
    currentAudioTime: 0,
    totalAudioTime: 0,
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
      currentAudioTime: 0,
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

  statusBar = () => {
    this.setState({
      currentAudioTime: this.audioPlayer.currentTime,
      totalAudioTime: this.audioPlayer.duration
    })
  }

  timeValue = (time) => {
    let minute = Math.floor(time / 60)
    let seconds = Math.floor(time % 60)

    // eslint-disable-next-line
    seconds < 10 ? seconds = '0' + seconds : seconds

    return (isNaN(time)) ? '0:00' : minute + ':' + seconds
  }

  render() {
    let audioProgress = (this.state.currentAudioTime / this.state.totalAudioTime) * 100
    const { isPlaying, currentSong } = this.state

    return (
      this.state.songs.length > 0 && (
        <div className="App">
          <audio ref={(self) => { this.audioPlayer = self }}
            onTimeUpdate={this.statusBar} >
            <source src={this.state.songs[currentSong].source} />
          </audio>

          <div className="songDetails">
            {this.timeValue(this.state.currentAudioTime)} / {this.timeValue(this.state.totalAudioTime)}
          </div>

          <div className="progress">
            <div className="progress-bar progress-bar-danger" role="progressbar" aria-valuenow={70}
              aria-valuemin={0} aria-valuemax={100} style={{ width: audioProgress + '%' }}>
            </div>
          </div>

          <button disabled={currentSong === 0}
            onClick={() => { this.changeSong(-1) }}>
            Previous
          </button>

          <button
            onClick={this.pumpItUp}>
            {isPlaying ? 'Pause' : 'Play'}
          </button>

          <button disabled={currentSong === this.state.songs.length - 1}
            onClick={() => { this.changeSong(1) }}>
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
    )
  }
}

export default App
