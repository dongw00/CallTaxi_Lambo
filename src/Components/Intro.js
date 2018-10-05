import React, { Fragment, Component } from "react";
import { Helmet } from "react-helmet";
import Loading from "./Loading";
import loadingLogo from "../logo/Kakao_Logo.png";
import loginLogo from "../logo/kakao_account_login_btn.png";
import "./css/Intro.css";

class Intro extends Component {
  state = {
    loading: true
  };

  componentDidMount() {
    setTimeout(() => this.setState({ loading: false }), 1500);
  }
  render() {
    const { loading } = this.state;

    if (loading) {
      return <Loading />;
    } else {
      return (
        <Fragment>
          <Helmet>
            <title>Intro | Nuber</title>
          </Helmet>
          <main>
            <div className="text">
              <p>
                안녕하세요.
                <br />
                카카오 T 입니다.
              </p>
            </div>
            <div className="logo">
              <img src={loadingLogo} alt="logo" />
            </div>
            <div className="login_btn">
              <a href="/login">
                <img src={loginLogo} alt="login_btn" />
              </a>
            </div>
          </main>
        </Fragment>
      );
    }
  }
}

export default Intro;
