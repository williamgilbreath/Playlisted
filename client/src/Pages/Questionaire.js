import React, {useState} from 'react'
import Paper from "@material-ui/core/Paper";
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import {navigate} from "@reach/router";
import InsertEmoticonRoundedIcon from '@material-ui/icons/InsertEmoticonRounded';
import MoodBadRoundedIcon from '@material-ui/icons/MoodBadRounded';
import HotelRoundedIcon from '@material-ui/icons/HotelRounded';
import DirectionsBikeRoundedIcon from '@material-ui/icons/DirectionsBikeRounded';
import {GiTurtle} from 'react-icons/gi'
import {GiRabbit} from 'react-icons/gi'
import {FaRunning} from 'react-icons/fa'
import {FaWalking} from 'react-icons/fa'
import {IoIosPeople} from 'react-icons/io'
import {IoIosPerson} from 'react-icons/io'
import {GiPartyPopper} from 'react-icons/gi'
import {GiNightSleep} from 'react-icons/gi'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles({
    root: {
      color: 'black',
    },
    slider: {
        width: '200px',
    },
    background: {
        textAlign: 'left',
    },
    paper: {
        margin: '5em 20em',
        padding: '2em 5em'
    },
    icons: {
        width: '50px',
    }
})

const moodMarks = [
    {
        value: 0,
        label: <MoodBadRoundedIcon />,
    },
    {
        value: 50,
        label: ' ',
    },
    {
        value: 100,
        label: <InsertEmoticonRoundedIcon />,
    }
]
const danceMarks = [
    {
        value: 0,
        label: <GiNightSleep/>,
    },
    {
        value: 50,
        label: ' ',
    },
    {
        value: 100,
        label: <GiPartyPopper/>,
    }
]
const energyMarks = [
    {
        value: 0,
        label: <FaWalking/>,
    },
    {
        value: 50,
        label: ' ',
    },
    {
        value: 100,
        label: <FaRunning />,
    },
]
const tempoMarks = [
    {
        value: 0,
        label: <GiTurtle/>,
    },
    {
        value: 50,
        label: "",
    },
    {
        value: 100,
        label: <GiRabbit />,
    },
]
const popularityMarks = [
    {
        value: 0,
        label: <IoIosPerson/>,
    },
    {
        value: 50,
        label: ' ',
    },
    {
        value: 100,
        label: <IoIosPeople/>,
    },
]

function valuetext(value) {
    return `${value}`;
}

const Questionaire = ({ newToken, activeId, setActiveId, prefMood, setPrefMood, prefKey, setPrefKey, prefDanceability, setPrefDanceability, prefEnergy, setPrefEnergy, prefPopularity, setPrefPopularity, prefTempo, setPrefTempo, playlistArr, setPlaylistArr, mood, valence, key, danceability, energy, tempo, popularity, setPopularity}) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false)
    const handleMood = (event, moodValue) => {
        setPrefMood(moodValue);
        console.log(prefMood)
    };
    const handleTempo = (event, tempoValue) => {
        setPrefTempo(tempoValue);
        console.log(prefTempo)
    };
    const handleDance = (event, danceabilityValue) => {
        setPrefDanceability(danceabilityValue);
        console.log(prefDanceability)
    };
    const handleEnergy = (event, energyValue) => {
        setPrefEnergy(energyValue);
        console.log(prefEnergy)
    };
    const handlePopularity = (event, popularityValue) => {
        setPrefPopularity(popularityValue);
        console.log(prefPopularity)
    };
    const handleSelect = (e) => {
        setPrefKey(e.target.value)
        console.log(prefKey)
    }
    const client_id = '21291a52de26434abfff4f308f099b60';
    const client_secret = '08cd976df69f49ee82eb1023ef51686c';
    const SpotifyWebApi = require('spotify-web-api-node');
    let spotifyApi = new SpotifyWebApi({
        clientId: client_id,
        clientSecret: client_secret,
        redirectUri: 'http://localhost:3000/'
    });
    spotifyApi.setAccessToken(`${newToken}`);

    let minEnergy;
    let maxEnergy;
    if(prefEnergy == 0){
        minEnergy = energy - 0.3
        maxEnergy = energy
        minEnergy = minEnergy.toFixed(3)
    } else if(prefEnergy == 50){
        minEnergy = energy - 0.2
        maxEnergy = energy + 0.2
    } else if(prefEnergy == 100){
        minEnergy = energy
        maxEnergy = energy + 0.4
    }
    let minPopularity;
    let maxPopularity;
    if(prefPopularity == 0){
        minPopularity = popularity - 50
        maxPopularity = popularity + 10
    } else if(prefPopularity == 50){
        minPopularity = popularity - 25
        maxPopularity = popularity + 25
    } else if(prefPopularity == 100) {
        minPopularity = 80
        maxPopularity = 150
    }
    let minValence;
    let maxValence;
    if(prefMood == 0) {
        minValence = valence - 0.5
        maxValence = valence
    } else if(prefMood == 50) {
        minValence = valence - 0.25
        maxValence = valence + 0.25
    } else if(prefMood == 100) {
        minValence = valence
        maxValence = valence + 0.5
    }
    let minDanceability;
    let maxDanceability;
    if(prefDanceability == 0){
        minDanceability = danceability - 0.5
        maxDanceability = danceability
    } else if(prefDanceability == 50){
        minDanceability = danceability - 0.25
        maxDanceability = danceability + 0.25
    } else if(prefDanceability == 100){
        minDanceability = danceability
        maxDanceability = danceability + 0.5
    }
    let minTempo;
    let maxTempo;
    if(prefTempo == 0) {
        minTempo = tempo - 50
        maxTempo = tempo
    } else if(prefTempo == 50){
        minTempo = tempo - 25
        maxTempo = tempo + 25
    } else if(prefTempo == 100){
        minTempo = tempo
        maxTempo = tempo + 50
    }
    let minMode;
    let maxMode;
    if(prefMood == 0){
        minMode = 0
        maxMode = 0
    } else if(prefMood == 50){
        minMode = 0
        maxMode = 1
    } else if(prefMood == 100){
        minMode = 1
        maxMode = 1
    }

    // if playlist gets to small make the middle for all of them the max
    const createPlaylistHandler = (e) => {
        e.preventDefault()
        let tempArrRecommended = []
        spotifyApi.getRecommendations({
            min_energy: minEnergy,
            max_energy: maxEnergy,
            min_tempo: minTempo,
            max_tempo: maxTempo,
            min_popularity: minPopularity,
            max_popularity: maxPopularity,
            min_mode: minMode,
            max_mode: maxMode,
            min_danceability: minDanceability,
            max_danceability: maxDanceability,
            min_valence: minValence,
            max_valence: maxValence,
            seed_tracks: `${activeId}`,
            limit: 100
        })
            .then(function(data) {
                console.log(data.body)
                tempArrRecommended = data.body.tracks
                console.log(tempArrRecommended)
                setPlaylistArr(tempArrRecommended)
            }, function(err) {
                console.log("Something went wrong!", err);
            });
        navigate("/playlist")
    }
    const goBackHandler = (e) => {
        navigate("/home")
    }
    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    return(
        <div className={classes.background}>
            <Button onClick={handleOpen}>Open Dialogue</Button>
            {/*<div className={classes.paper}>*/}
            <Dialog
            open={open}
            close={handleClose}
            >
                <h1>How should we make your playlist?</h1>
                <p>Tempo?</p>
                <Slider
                    value={prefTempo}
                    getAriaValueText={valuetext}
                    aria-labelledby="discrete-slider-custom"
                    step={50}
                    valueLabelDisplay="auto"
                    marks={tempoMarks}
                    className={classes.slider}
                    onChange={handleTempo}
                />
                <p>What Mood?</p>
                <Slider
                    value={prefMood}
                    getAriaValueText={valuetext}
                    aria-labelledby="discrete-slider-custom"
                    step={50}
                    valueLabelDisplay="auto"
                    marks={moodMarks}
                    className={classes.slider}
                    onChange={handleMood}
                />
                <p>How do we feel about dancing?</p>
                <Slider
                    value={prefDanceability}
                    getAriaValueText={valuetext}
                    aria-labelledby="discrete-slider-custom"
                    step={50}
                    valueLabelDisplay="auto"
                    marks={danceMarks}
                    className={classes.slider}
                    onChange={handleDance}
                />
                <p>Need some energy?</p>
                <Slider
                    value={prefEnergy}
                    getAriaValueText={valuetext}
                    aria-labelledby="discrete-slider-custom"
                    step={50}
                    valueLabelDisplay="auto"
                    marks={energyMarks}
                    className={classes.slider}
                    onChange={handleEnergy}
                />
                <p>Something underground? Popular?</p>
                <Slider
                    defaultValue={0}
                    getAriaValueText={valuetext}
                    aria-labelledby="discrete-slider-custom"
                    step={50}
                    valueLabelDisplay="auto"
                    marks={popularityMarks}
                    className={classes.slider}
                    onChange={handlePopularity}
                />

                {/*<p>Specific key in mind?</p>
                <FormControl variant="filled" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-filled-label">Key</InputLabel>
                    <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        value={prefKey}
                        onChange={handleSelect}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value="C">C</MenuItem>
                        <MenuItem value="C#">C#</MenuItem>
                        <MenuItem value="D">D</MenuItem>
                        <MenuItem value="D#">D#</MenuItem>
                        <MenuItem value="E">E</MenuItem>
                        <MenuItem value="F">F</MenuItem>
                        <MenuItem value="F#">F#</MenuItem>
                        <MenuItem value="G">G</MenuItem>
                        <MenuItem value="G#">G#</MenuItem>
                        <MenuItem value="A">A</MenuItem>
                        <MenuItem value="A#">A#</MenuItem>
                        <MenuItem value="B">B</MenuItem>
                    </Select>
                </FormControl>*/}
                <Button onClick={createPlaylistHandler}>Create Playlist</Button>
                <Button onClick={goBackHandler}>Go Back</Button>
            {/*</div>*/}
            </Dialog>
        </div>
    )
}

export default Questionaire