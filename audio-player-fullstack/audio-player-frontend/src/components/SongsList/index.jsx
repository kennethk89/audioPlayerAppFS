import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class SongsList extends Component {
    render() {
        let allSongs = this.props.songs.map((song, i) => {
            return <li key={i}>
                <Link to={`/${song.id}`}>{song.title}</Link>
                <button onClick={() => { this.props.playSong(i) }}>Play</button>
            </li>
        })
        return (
            <div>
                <h2>SONG LIST</h2>
                <ol>
                    {allSongs}
                </ol>
            </div>
        )
    }
}

export default SongsList