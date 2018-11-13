import React from 'react';
import loadingLogo from '../../assets/logo/Kakao_Logo.png';

import classes from '../../assets/css/Loading.module.css';

const Loading = () => (
  <div className={classes.routeLoading}>
    <img src={loadingLogo} alt="loginLogo" />
  </div>
);

export default Loading;
