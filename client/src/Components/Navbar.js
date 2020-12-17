import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    root: {
        background: '#FF5A5F',
        fontFamily: 'Vollkorn',
        color: 'white',
    }
})

const Navbar = () => {
    const classes = useStyles();
    return(
        <div>
            <AppBar position="sticky" elevation={0.5} className={classes.root}>
                <Toolbar>
                    <h1>Playlisted</h1>
                </Toolbar>
            </AppBar>
        </div>
        )
}
export default Navbar