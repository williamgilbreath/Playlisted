import React, { useState } from 'react'
import './App.css';
import Homepage from "./Pages/Homepage";
import Questionaire from "./Pages/Questionaire";
import Playlist from './Components/Playlist'
import { Router } from "@reach/router";

//Make playlist out of library songs

function App() {
    const [newToken, setNewToken] = useState()
    const [tokenReq, setTokenReq] = useState(false)
    const [active, setActive] = useState()
    const [activeUri, setActiveUri] = useState()
    const [activeId, setActiveId] = useState()
    const [activeFeatures, setActiveFeatures] = useState()
    const [playlistArr, setPlaylistArr] = useState()
    const [mood, setMood] = useState()
    const [valence, setValence] = useState()
    const [key, setKey] = useState()
    const [danceability, setDanceability] = useState()
    const [energy, setEnergy] = useState()
    const [tempo, setTempo] = useState()
    const [popularity, setPopularity] = useState()
    const [prefMood, setPrefMood] = useState(0)
    const [prefValence, setPrefValence] = useState()
    const [prefKey, setPrefKey] = useState('')
    const [prefDanceability, setPrefDanceability] = useState(0)
    const [prefEnergy, setPrefEnergy] = useState(0)
    const [prefTempo, setPrefTempo] = useState(0)
    const [prefPopularity, setPrefPopularity] = useState(0)
    const [loading, setLoading] = useState(false)
    let token;
    const request = require('request');
    const client_id = '21291a52de26434abfff4f308f099b60';
    const client_secret = '08cd976df69f49ee82eb1023ef51686c';
    let authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: {
            'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
        },
        form: {
            grant_type: 'client_credentials'
        },
        json: true
    };
    request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200 && tokenReq == false) {
            token = body.access_token;
            setTokenReq(true)
            var options = {
                url: 'https://api.spotify.com/v1/users/williamgilbreath28',
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                json: true
            };
            request.get(options, function(error, response, body) {
                setNewToken(token)
            });
        }
    });
    const SpotifyWebApi = require('spotify-web-api-node');
    let spotifyApi = new SpotifyWebApi({
        clientId: client_id,
        clientSecret: client_secret,
        redirectUri: 'http://localhost:3000/'
    });
    spotifyApi.setAccessToken(`${newToken}`);
    return (
        <div className="App">
            <Router>
                <Homepage
                    newToken={newToken}
                    active={active}
                    setActive={setActive}
                    activeUri={activeUri}
                    setActiveUri={setActiveUri}
                    activeFeatures={activeFeatures}
                    setActiveFeatures={setActiveFeatures}
                    activeId={activeId}
                    setActiveId={setActiveId}
                    mood={mood}
                    setMood={setMood}
                    valence={valence}
                    setValence={setValence}
                    key={key}
                    setKey={setKey}
                    danceability={danceability}
                    setDanceability={setDanceability}
                    energy={energy}
                    setEnergy={setEnergy}
                    tempo={tempo}
                    setTempo={setTempo}
                    popularity={popularity}
                    setPopularity={setPopularity}
                    playlistArr={playlistArr}
                    setPlaylistArr={setPlaylistArr}
                    prefMood={prefMood}
                    setPrefMood={setPrefMood}
                    prefKey={prefKey}
                    setPrefKey={setPrefKey}
                    prefDanceability={prefDanceability}
                    setPrefDanceability={setPrefDanceability}
                    prefEnergy={prefEnergy}
                    setPrefEnergy={setPrefEnergy}
                    prefPopularity={prefPopularity}
                    setPrefPopularity={setPrefPopularity}
                    prefTempo={prefTempo}
                    setPrefTempo={setPrefTempo}
                    loading={loading}
                    setLoading={setLoading}
                    path="/home" default
                />
                {/*activeId, popularity, prefMood, prefKey, prefDanceability, prefEnergy, prefPopularity, prefTempo, playlistArr, newToken, */}
                <Questionaire
                    activeId={activeId}
                    setActiveId={setActiveId}
                    popularity={popularity}
                    setPopularity={setPopularity}
                    prefMood={prefMood}
                    setPrefMood={setPrefMood}
                    prefKey={prefKey}
                    setPrefKey={setPrefKey}
                    prefDanceability={prefDanceability}
                    setPrefDanceability={setPrefDanceability}
                    prefEnergy={prefEnergy}
                    setPrefEnergy={setPrefEnergy}
                    prefPopularity={prefPopularity}
                    setPrefPopularity={setPrefPopularity}
                    prefTempo={prefTempo}
                    setPrefTempo={setPrefTempo}
                    playlistArr={playlistArr}
                    setPlaylistArr={setPlaylistArr}
                    newToken={newToken}
                    mood={mood}
                    valence={valence}
                    key={key}
                    danceability={danceability}
                    energy={energy}
                    tempo={tempo}
                    path="/questionaire"
                />
                    <Playlist
                        playlistArr={playlistArr}
                        setPlaylistArr={setPlaylistArr}
                        path="/playlist"
                    />
            </Router>
        </div>
    );
}

export default App;
