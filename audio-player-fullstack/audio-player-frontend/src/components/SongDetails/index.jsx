import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class SongDetails extends Component {
    render() {
        const { songId } = this.props.match.params
        const { songs } = this.props

        return (
            <div>
                <h2>DETAILS</h2>
                <h3>{songs[songId].title}</h3>
                <p>
                    {songs[songId].description}
                </p>
                <button onClick={() => { this.props.playSong(songId) }}>Push my button!</button>
                <Link to='/'><button>Back to List</button></Link>
            </div>
        )
    }
}

export default SongDetails