import React from 'react';
import loadingLogo from '../../Assets/logo/Kakao_Logo.png';

import classes from '../css/Loading.module.css';

const Loading = () => (
  <div className={classes.routeLoading}>
    <img src={loadingLogo} alt="loginLogo" />
  </div>
);

export default Loading;
