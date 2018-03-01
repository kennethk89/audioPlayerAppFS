const express = require('express')
const app = express()

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

function Song(source, title, description, id) {
    this.source = source;
    this.title = title;
    this.description = description;
    this.id = id;
}

const songs = [
    new Song('/songs/upstep.mp3', 'Upstep', 'Brutal beat and bulky bass are the foundation for a dubstep frenzy featuring synths, wailing guitar and jitters and glitches. Tempo: 140bpm', 0),
    new Song('/songs/olympian.mp3', 'Olympian', 'An energetic, vibrant track featuring positive electric guitar licks and modern drums creates useful sports theme. Tempo: 130bpm', 1),
    new Song('/songs/transmission.mp3', 'Transmission', 'Energetic electronic melody featuring modern drums, snaking bass and explosive electric guitar. Tempo: 120bpm', 2)
]

app.get('/', (req, res)=>{
    res.send(songs)
})

app.listen(8080)