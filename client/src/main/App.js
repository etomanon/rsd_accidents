import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { TransitionGroup } from 'react-transition-group';
import { Redirect } from 'react-router-dom';
import Cookies from "universal-cookie";
import MaterialTheme from "./materialTheme";

import Home from 'src/apps/home';
import Error404 from 'src/apps/error404';

import ScrollTop from 'src/components/scrollTop';
import PageFade from 'src/components/pageFade';

class App extends Component {
  constructor(props) {
    super(props)
    const cookies = new Cookies("main");
    this.state = { visited: cookies.get('visited') }
    let d = new Date();
    d.setTime(d.getTime() + (1000 * 60 * 60 * 72));
    cookies.set('visited', 'true', { path: '/', expires: d });
  }
  render() {
    return (
      <div>
        <MaterialTheme>
          <TransitionGroup>
            <PageFade key={this.props.location.pathname}>
              <div>
                <ScrollTop>
                  <Switch location={this.props.location}>
                    <Route exact path='/' component={() => <Home visited={this.state.visited} />} />
                    <Route exact path='/404' component={() => <Error404 />} />
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
