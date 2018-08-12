import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { TransitionGroup } from 'react-transition-group';
import { Redirect } from 'react-router-dom';

import Navigation from 'src/main/navigation';
import Home from 'src/apps/home';
import Footer from 'src/main/footer';
import Profile from 'src/apps/profile';
import Error404 from 'src/apps/error404';

import ScrollTop from 'src/components/scrollTop';
import CheckAuth from 'src/components/checkAuth';
import PageFade from 'src/components/pageFade';

import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Navigation location={this.props.location.pathname} />
        <TransitionGroup>
          <PageFade key={this.props.location.pathname}>
            <div className="text-center">
              <ScrollTop>
                <CheckAuth location={this.props.location}>
                  <Switch location={this.props.location}>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/profile' component={Profile} />
                    <Route exact path='/404' component={Error404} />
                    <Route render={() => <Redirect to="/404" />} />
                  </Switch>
                </CheckAuth>
              </ScrollTop>
              <Footer />
            </div>
          </PageFade>
        </TransitionGroup>
      </div>
    );
  }
}

export default App;
