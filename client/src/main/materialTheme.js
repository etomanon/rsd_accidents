import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: "#193c83",
            main: "#002776",
            dark: "#00236a",
        },
        secondary: {
            light: "#1ab753",
            main: "#01af40",
            dark: "#009d39",
        },
    },
});

export default class MaterialTheme extends Component {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                {this.props.children}
            </MuiThemeProvider>
        );
    }
}