import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: "#3F51B5",
            main: "#303F9F",
            dark: "#1A237E",
        },
        secondary: {
            light: "#4CAF50",
            main: "#388E3C",
            dark: "#1B5E20",
        },
    },
    overrides: {
        MuiSlider: {
            track: {
                height: '5px',
            },
        }
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