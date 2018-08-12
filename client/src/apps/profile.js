import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userGet } from '../actions/index';

import Loader from 'src/components/loader'

import './profile.css'

class Profile extends Component {

  componentDidMount = () => {
    this.props.userGet();

    this.interval = setInterval(() => {
      this.props.userGet();
    }, 15000)
  }

  componentWillUnmount = () => {
    clearInterval(this.interval);
  }

  render() {
    const profile = this.props.user.profile;
    return (
      <div>
        <Loader
          loading={profile.pending}
        />
        <div>{profile.user}</div>
        <div>{profile.email}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ userGet }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);