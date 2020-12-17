import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import {navigate} from "@reach/router";
import Dialog from "@material-ui/core/Dialog";
import MoodBadRoundedIcon from "@material-ui/icons/MoodBadRounded";
import InsertEmoticonRoundedIcon from "@material-ui/icons/InsertEmoticonRounded";
import {GiNightSleep, GiPartyPopper, GiRabbit, GiTurtle} from "react-icons/gi";
import {FaRunning, FaWalking} from "react-icons/fa";
import {IoIosPeople, IoIosPerson} from "react-icons/io";
import Slider from "@material-ui/core/Slider";
import PopPop from 'react-poppop';
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import vinyl from '../images/vinylIcon.png'
import vinyls from '../images/vinyls.png'

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#2F2D2E'
        },
        secondary: {
            main: '#FF5A5F',
        }
    }
})

const useStyles = makeStyles((theme)=> ({
    root: {
        //backgroundColor: '#f7f6f3',
        fontFamily: 'Vollkorn',
        color: 'black',
        height: '100vh'
    },
    firstHeader: {
        fontSize: '6em',
        fontFamily: 'MontserratLight'
    },
    coverIcon: {
        width: '20em',
        marginRight: '2em'
    },
    header: {
        fontSize: '4.7em',
        fontFamily: 'MontserratLight',
        marginBottom: '0',
        color: 'white',
        //backgroundColor: '#FF5A5F',
    },
    subheader: {
        fontFamily: 'Raleway',
        fontSize: '2em',
        textAlign: 'left',
        marginTop: '1em',
        color: 'white'
    },
    search: {
        color: 'black',
        width: '50em',
        //marginTop: '1em'
    },
    searchBtn: {
        //marginTop: '1em',
        padding: '1em 1.5em',
        marginLeft: '2em',
        borderRadius: '10px',
    },
    songCard: {
        margin: '2em 0',
        width: '50em'
    },
    cover: {
        width: '11em',
        height: '100%'
    },
    cardItems: {
        marginLeft: '1em',
    },
    createBtn: {
        padding: '0.75em 1em',
        fontSize: '1.05em',
        borderRadius: '10px'
    },
    songName: {
        textAlign: 'left',
        fontFamily: 'MontserratMedium'
    },
    artistName: {
        textAlign: 'left',
        fontFamily: 'Raleway',

    },
    paper: {
        padding: '0 3em',
        borderRadius: '30px',
        marginTop: '3em'
    },
    dialog: {
        padding: '2em 4em',
    },
    dialogHeading: {
        fontFamily: 'MontserratLight',
        borderBottom: "1px solid black",
        paddingBottom: '1em'
    },
    sliderHeading: {
        fontFamily: "MontserratLight",
        textAlign: 'left'
    },
    icon: {
        width: '5em'
    },
    dialogtest: {
      padding: theme.spacing(2)
    },
    closeBtn: {
        padding: '0.75em 3em',
        borderRadius: '50px'
    },
    createPlaylistBtn: {
        padding: '0.75em 3em',
        borderRadius: '50px',
        marginLeft: '1em'
    },
    searchField: {
        marginTop: '-5em',
    },
    waves: {
        //position: 'fixed',

    },
    headerBox: {
        backgroundColor: '#FF5A5F',
    },
    wavesNew: {
        width: '100vw',
    },
    searchHeader: {
        fontFamily: 'MontserratLight',
        fontSize: '3em',
        color: '#2F2D2E'
    }
}))

const moodMarks = [
    {
        value: 0,
        label: <MoodBadRoundedIcon/>,
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

const FrontPage = ({newToken, active, setActive, activeId, setActiveId, activeUri, setActiveUri, activeFeatures, setActiveFeatures, mood, setMood, valence, setValence, key, setKey, danceability, setDanceability, energy, setEnergy, tempo, setTempo, prefPopularity, setPrefPopularity, playlistArr, setPlaylistArr, popularity, setPopularity, prefMood, setPrefMood, prefKey, setPrefKey, prefDanceability, setPrefDanceability, prefEnergy, setPrefEnergy, prefTempo, setPrefTempo, loading, setLoading }) => {
    const [searchSong, setSearchSong] = useState();
    const [searchResults, setSearchResults] = useState([])
    const [test, setTest] = useState(false)
    const [open, setOpen] = useState(false)

    const classes = useStyles();

    //Setting token & Connecting to API
    const client_id = '21291a52de26434abfff4f308f099b60';
    const client_secret = '08cd976df69f49ee82eb1023ef51686c';
    const SpotifyWebApi = require('spotify-web-api-node');
    let spotifyApi = new SpotifyWebApi({
        clientId: client_id,
        clientSecret: client_secret,
        redirectUri: 'http://localhost:3000/'
    });
    spotifyApi.setAccessToken(`${newToken}`);

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

    //Finding initial Song
    const submitHandler = (e) => {
        e.preventDefault();
        spotifyApi.searchTracks(`${searchSong}`, { limit: 5 })
            .then(function(data) {
                console.log(`Search by ${searchSong}`, data.body);
                setSearchResults(data.body.tracks.items)
                console.log(searchResults)
            }, function(err) {
                console.error(err);
            });
    }

    //For form search input
    const searchFunction = (e) => {
        e.preventDefault();
        setSearchSong(e.target.value)
    }

    //Finding the recommended tracks and setting them to array
    const buttonHandler = (e) => {
        e.preventDefault()
        //navigate("/questionaire")
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }

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

    const createPlaylistHandler = (e) => {
        e.preventDefault()
        let tempArrRecommended = []
        navigate("/playlist")
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
                setLoading(true)
                console.log(loading)
            }, function(err) {
                console.log("Something went wrong!", err);
            });

    }

    return(
        <ThemeProvider theme={theme}>
        <div className={classes.root}>
            <Grid container direction="column" justify="center" alignItems="center">
                <Grid item xs={12} container direction="column" justify="center" alignItems="center">
                    <form onSubmit={submitHandler} className={classes.waves}>
                        <Grid item xs={12} container direction="row" justify="center" alignItems="center" className={classes.headerBox}>
                            <Grid item xs={2}>
                                <img src={vinyl} className={classes.coverIcon}/>
                            </Grid>
                            <Grid item xs={4} container direction="column" justify="flex-start" alignItems="flex-start">
                                <h1 className={classes.header}>Hi, we're Playlisted.</h1>
                                <h5 className={classes.subheader}>We make playlists based on the science of exactly what you wanna hear, all you have to do is enter in a song below.</h5>
                            </Grid>
                        </Grid>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className={classes.wavesNew}>
                            <path fill="#ff5a5f" fill-opacity="1" d="M0,224L26.7,234.7C53.3,245,107,267,160,256C213.3,245,267,203,320,170.7C373.3,139,427,117,480,128C533.3,139,587,181,640,202.7C693.3,224,747,224,800,197.3C853.3,171,907,117,960,96C1013.3,75,1067,85,1120,101.3C1173.3,117,1227,139,1280,170.7C1333.3,203,1387,245,1413,266.7L1440,288L1440,0L1413.3,0C1386.7,0,1333,0,1280,0C1226.7,0,1173,0,1120,0C1066.7,0,1013,0,960,0C906.7,0,853,0,800,0C746.7,0,693,0,640,0C586.7,0,533,0,480,0C426.7,0,373,0,320,0C266.7,0,213,0,160,0C106.7,0,53,0,27,0L0,0Z"></path>
                        </svg>
                        <Grid item xs={12} className={classes.searchField}>
                            <h1 className={classes.searchHeader}>Just enter in a song, artist, or album below!</h1>
                            <TextField color="secondary" size="large" id="standard-search" label="Put in a song..." type="search" onChange={searchFunction} className={classes.search} variant="outlined"/>
                        {/*</Grid>
                        <Grid item xs={12}>*/}
                            <Button type="submit" variant="contained" color="secondary" size="large" className={classes.searchBtn}>Search</Button>
                        </Grid>
                    </form>
                </Grid>
                <Grid container direction="column" justify="center" alignItems="center">
                    <Paper elevation={5} className={classes.paper}>
                {
                    searchResults ?
                        searchResults.map(item => (
                            <Card className={classes.songCard} elevation={0}
                                key={item.uri}
                                active={active === item}
                                onClick={(e) => {
                                    e.preventDefault()
                                    setActive(item)
                                    setActiveUri(item.uri)
                                    setActiveId(item.id)
                                    setPopularity(item.popularity)
                                   setTest(true)
                                    if(test){
                                        spotifyApi.getAudioFeaturesForTrack(`${activeId}`)
                                            .then(function(data) {
                                                console.log(data.body);
                                                setMood(data.body.mode)
                                                setValence(data.body.valence)
                                                setKey(data.body.key)
                                                setEnergy(data.body.energy)
                                                setTempo(data.body.tempo)
                                                setDanceability(data.body.danceability)
                                            }, function(err) {
                                                console.log(err);
                                            });
                                    }
                                }}
                                >
                                <Grid container direction='row' justify='flex-start' alignItems="center">
                                    <CardMedia>
                                        <img src={item.album.images[1].url} className={classes.cover}/>
                                    </CardMedia>
                                    <Grid item xs container direction='column' alignItems='flex-start' className={classes.cardItems}>
                                        <Grid item xs>
                                            <h2 className={classes.songName}>{item.name}</h2>
                                        </Grid>
                                        <Grid item xs>
                                            <h3 className={classes.artistName}>{item.artists[0].name}</h3>
                                            {
                                                item.artists.length > 1 ?
                                                <h3 className={classes.artistName}>{item.artists[1].name}</h3> : null
                                            }
                                        </Grid>
                                        {/*make the button an icon*/}
                                    </Grid>
                                    <Button onClick={buttonHandler} className={classes.createBtn} variant="contained" color="secondary">Create Playlist</Button>
                                </Grid>
                            </Card>
                        )) : null }
                </Paper>
                </Grid>
            </Grid>
            <Dialog position="centerCenter" open={open} closed={handleClose} className={classes.dialogtest}>
                <Grid container className={classes.dialog}>
                    <h1 className={classes.dialogHeading} boxShadow={2}>How should we make your playlist?</h1>
                    <h3 className={classes.sliderHeading}>Slow or fast?</h3>
                    <Slider
                        value={prefTempo}
                        getAriaValueText={valuetext}
                        aria-labelledby="discrete-slider-custom"
                        step={50}
                        valueLabelDisplay="auto"
                        marks={tempoMarks}
                        onChange={handleTempo}
                        color="secondary"
                    />
                    <h3 className={classes.sliderHeading}>What mood are we in?</h3>
                    <Slider
                        value={prefMood}
                        getAriaValueText={valuetext}
                        aria-labelledby="discrete-slider-custom"
                        step={50}
                        valueLabelDisplay="auto"
                        marks={moodMarks}
                        onChange={handleMood}
                        color="secondary"
                    />
                    <h3 className={classes.sliderHeading}>Wanna dance?</h3>
                    <Slider
                        value={prefDanceability}
                        getAriaValueText={valuetext}
                        aria-labelledby="discrete-slider-custom"
                        step={50}
                        valueLabelDisplay="auto"
                        marks={danceMarks}
                        onChange={handleDance}
                        color="secondary"
                    />
                    <h3 className={classes.sliderHeading}>Energetic?</h3>
                    <Slider
                        value={prefEnergy}
                        getAriaValueText={valuetext}
                        aria-labelledby="discrete-slider-custom"
                        step={50}
                        valueLabelDisplay="auto"
                        marks={energyMarks}
                        onChange={handleEnergy}
                        color="secondary"
                    />
                    <h3 className={classes.sliderHeading}>Something underground or popular?</h3>
                    <Slider
                        defaultValue={0}
                        getAriaValueText={valuetext}
                        aria-labelledby="discrete-slider-custom"
                        step={50}
                        valueLabelDisplay="auto"
                        marks={popularityMarks}
                        onChange={handlePopularity}
                        color="secondary"
                    />
                    <Grid container item xs={12} direction="row" justify="center" alignItems="center">
                        <Button onClick={handleClose} variant="outlined" color="secondary" className={classes.closeBtn}>Close</Button>
                        <Button onClick={createPlaylistHandler} variant="contained" color="secondary" className={classes.createPlaylistBtn}>Create</Button>
                    </Grid>
                </Grid>
            </Dialog>
        </div>
        </ThemeProvider>
    )
}

export default FrontPage