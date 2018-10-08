import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { TransitionGroup } from 'react-transition-group';
import { Redirect } from 'react-router-dom';

import MaterialTheme from "./materialTheme";

import Home from 'src/apps/home';
import Error404 from 'src/apps/error404';

import ScrollTop from 'src/components/scrollTop';
import PageFade from 'src/components/pageFade';

import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <MaterialTheme>
          <TransitionGroup>
            <PageFade key={this.props.location.pathname}>
              <div className="text-center">
                <ScrollTop>
                  <Switch location={this.props.location}>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/404' component={Error404} />
                    <Route render={() => <Redirect to="/404" />} />
                  </Switch>
                </ScrollTop>
              </div>
            </PageFade>
          </TransitionGroup>
        </MaterialTheme>
      </div>
    );
  }
}

export default App;
