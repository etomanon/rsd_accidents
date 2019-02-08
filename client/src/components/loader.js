import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
    progress: {
        position: "absolute",
        bottom: "10px",
        right: "10px",
        zIndex: "1500"
    },
});

function Loader({ display, classes }) {
    return (
        <Fade in={display}>
            <CircularProgress
                className={classes.progress}
                color="secondary"
            />
        </Fade>
    )
}

export default withStyles(styles)(Loader);