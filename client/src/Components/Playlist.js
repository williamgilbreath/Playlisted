import React, {useState} from 'react';
import {navigate} from "@reach/router";
import Button from "@material-ui/core/Button";
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import ThemeProvider from "@material-ui/styles/ThemeProvider";

const useStyles = makeStyles((theme) => ({
    root: {
        color: 'black'
    },
    imgHeader: {
        width: '6.5625em',
        margin: '0'
    },
    backgroundColor: {
        backgroundColor: 'black',
    },
    backBtn: {
        borderRadius: '10px',
        width: '20em',
        height: "5em",
        marginTop: '5em',
        fontSize: '1.25em',
        fontWeight: 'bold'
    },
    img: {
        height: '11em',
        marginBottom: '-5px',
        marginLeft: '-55px'
    },
    paper: {
        margin: '1em 3em',
        padding: '1.5em 2em',
        backgroundColor: '#FF5A5F',
        borderRadius: '30px'
    },
    card: {
        width: '100%',
        margin: '1em 0',
        borderRadius: '10px'
    },
    cardHeader: {
        fontSize: '1.5em',
        textAlign: 'left',
        fontFamily: 'MontserratMedium',
    },
    textBox: {
      marginLeft: '-20px'
    },
    text: {
        textAlign: 'left',
        fontSize: '1.25em',
        fontFamily: 'Raleway'
    },
    header: {
        position: 'absolute',
        width: '100%',
        background: 'radial-gradient(circle, rgba(231,70,75,1) 0%, rgba(255,255,255,0) 100%)',
        marginTop: '0',
        color: 'white',
        fontFamily: 'MontserratLight',
        textDecoration: 'underline',
        fontSize: "3.875em",
        padding: '3.73em 0'
    },
    headerBackground: {
        backgroundColor: 'white',
        height: '100%',
    },
    inputField: {
        fontSize: '1em',
        color: 'white',
        backgroundColor: 'rgba(255, 255, 255, 0)',
        border: 'none',
        width: 'auto',
        textAlign: 'center',
        fontFamily: 'MontserratMedium'
    },
    circularProgress: {
        marginTop: '35vh'
    }
}))

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#ffffff'
        },
        secondary: {
            main: '#FF5A5F',
        },
    }
})

const Playlist = ({playlistArr}) => {
    const classes = useStyles();
    const backButton = (e) => {
        e.preventDefault()
        navigate("/home")
    }
    return(
        <ThemeProvider theme={theme}>
            <div>
                <Grid container direction="column" justify="flex-start" alignItems="flex-start">
                <Grid container direction="row" item xs>
                {
                    playlistArr ?

                        playlistArr.map(item => (
                            <Grid item xs className={classes.headerBackground}>
                                <img src={item.album.images[1].url} className={classes.imgHeader}/>
                            </Grid>
                            )) :
                        <Grid container direction="column" justify="space-around" alignItems="center">
                            <Grid item xs>
                                <CircularProgress color="secondary" size={150} className={classes.circularProgress}/>
                            </Grid>
                            <Grid item xs>
                                <Button onClick={backButton} className={classes.backBtn}>Go Home</Button>
                            </Grid>
                        </Grid>
                }
                    {
                        playlistArr ?
                            <form className={classes.header}>
                                <input variant="outlined" placeholder="Playlist name..." type="text" className={classes.inputField}/>
                            </form>
                            : null
                    }
                </Grid>
                </Grid>
            <Grid container direction="row">
            <Grid item xs={6} container direction="column" justify="flex-start" alignItems="flex-start">
                <Grid item xs>
                    {
                        playlistArr ?

                            <Paper className={classes.paper}>
                                {
                                    playlistArr ?
                                        playlistArr.map(item => (
                                            <Card className={classes.card}>
                                                <Grid container direction="row">
                                                    <Grid item xs={3}>
                                                        <img className={classes.img} src={item.album.images[1].url}/>
                                                    </Grid>
                                                    <Grid item xs container direction="column" justify="flex-end"
                                                          alignItems="flex-start" className={classes.textBox}>
                                                        <Grid item xs>
                                                            <h1 className={classes.cardHeader}>{item.name}</h1>
                                                        </Grid>
                                                        <Grid item xs>
                                                            <h3 className={classes.text}>{item.artists[0].name}</h3>
                                                            {
                                                                item.artists.length > 1 ?
                                                                    <h3 className={classes.text}>{item.artists[1].name}</h3> : null
                                                            }
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Card>
                                        )) : null
                                }
                            </Paper> : null
                    }
                </Grid>
            </Grid>
                {
                    playlistArr ?

                        <Grid item xs container direction="column" justify="flex-start">
                            <Grid item>
                                <Button variant="contained" color="secondary" onClick={backButton}
                                        className={classes.backBtn}>Add to your Spotify</Button>
                            </Grid>
                            <Grid item>
                                <Button variant="outlined" color="secondary" onClick={backButton}
                                        className={classes.backBtn}>Create Another</Button>
                            </Grid>
                        </Grid> : null
                }
            </Grid>
        </div>
        </ThemeProvider>
    )
}
export default Playlist