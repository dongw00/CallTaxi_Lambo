import React, { Fragment, Component } from 'react';
import { Helmet } from 'react-helmet';
import Loading from '../../components/Loading/Loading';
import loadingLogo from '../../assets/logo/Kakao_Logo.png';
import loginLogo from '../../assets/logo/kakao_account_login_btn.png';
import style from '../../assets/css/Intro.module.css';

class Intro extends Component {
  state = {
    loading: true,
  };

  componentDidMount() {
    this.setState({ loading: false });
  }

  render() {
    const { loading } = this.state;

    if (loading) return <Loading />;

    return (
      <Fragment>
        <Helmet>
          <title>Intro | Nuber</title>
        </Helmet>
        <main>
          <div className={style.textContainer}>
            <p>
              안녕하세요.
              <br />
              카카오 T 입니다.
            </p>
          </div>
          <div className={style.logo}>
            <img src={loadingLogo} alt="logo" />
          </div>
          <div className={style.logo_btn}>
            <a href="/MainPage">
              <img src={loginLogo} alt="login_btn" />
            </a>
          </div>
        </main>
      </Fragment>
    );
  }
}

export default Intro;
