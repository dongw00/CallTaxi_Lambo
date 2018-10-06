import React from "react";
import ReactDOM from "react-dom";
import Amplify from "aws-amplify";
import Route from "./routes";
import * as serviceWorker from "./serviceWorker";

/* AWS Amplify */
import awsmobile from "./aws-exports";

Amplify.configure(awsmobile);

ReactDOM.render(<Route />, document.getElementById("root"));
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
