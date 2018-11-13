import React, { Component, Fragment } from 'react';
import { withAuthenticator, ConfirmSignIn } from 'aws-amplify-react';
import Amplify from 'aws-amplify';
import MySignIn from '../Login/MySignIn';
import awsConfigure from '../../aws/aws-exports';
import Maps from '../../components/Maps/Maps';

Amplify.configure(awsConfigure);

class MainPage extends Component {
  render() {
    return (
      <Fragment>
        <Maps />
      </Fragment>
    );
  }
}

export default withAuthenticator(MainPage, false, [
  <MySignIn />,
  <ConfirmSignIn />,
]);
