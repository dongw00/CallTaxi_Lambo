import React, { Component, Fragment } from 'react';
import { ConfirmSignIn, withAuthenticator } from 'aws-amplify-react';
import Amplify from 'aws-amplify';
import MySignIn from './MySignIn';
import awsConfigure from '../Aws/aws-exports';
import Maps from './Maps';
import './css/Home.css';

Amplify.configure(awsConfigure);

class Home extends Component {
  render() {
    return (
      <Fragment>
        <Maps />
      </Fragment>
    );
  }
}

export default withAuthenticator(Home, false, [
  <MySignIn />,
  <ConfirmSignIn />,
]);
