import spotify_cfg from '../private/config.mjs';
import express from 'express';

const app = express();
app.use(express.json());
app.use(express.static('public'));
const port = 3000;
const api_token = spotify_cfg.key;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Music Player listening at http://localhost:${port}`);
});

const URLS ={
    album: 'https://api.spotify.com/v1/albums/',
    artist: 'https://api.spotify.com/v1/artists/',
    track: 'https://api.spotify.com/v1/tracks/',
    search: 'https://api.spotify.com/v1/search?type=album,artist,track&limit=10&q='
}

// fetch(URLS.search + 'eminem', {
//     method: 'GET',
//     headers: {
//         'Authorization': 'Bearer ' + api_token
//     }
//     .then(res => res.json())
//     .then(data => {
//         console.log(data);
//     })
//     .catch(err => {
//         console.log(err);
//     })
// });