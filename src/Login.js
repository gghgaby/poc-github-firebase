import React, { useEffect, Fragment } from "react";
import ReactDOM from "react-dom";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebaseConfig from "./config";
import useAuth from "./hooks/useAuth";
import "milligram/dist/milligram.css";

export default function Login() {

  const firebase = initializeApp(firebaseConfig);
  const { googleLogin, user } = useAuth(firebase);
  // eslint-disable-next-line no-unused-vars
  const analytics = getAnalytics(firebase);

  useEffect(() => {
    localStorage.removeItem("bearer");
  }, []);

  /** Hook to save user in store */
  useEffect(() => {
    if (Object.keys(user).length) {
      start();
    }
  }, [user]);

  /**
   * @param {Object} _event
   * Function to gmail login
   */
  const handleLogin = (_event) => {
    localStorage.removeItem("bearer");
    googleLogin();
  };
  /**
   * Function to validate an user object is valid to start the app
   */
  const start = () => {
    window.location.replace("/app.html");
  };

  return (<Fragment>
    <div className="container">
      <div className="row">
        <div className="column column-50 column-offset-25">
          <h2>Github actions and Firebase</h2>
        </div>
      </div>
      <div className="column column-offset-25">
        <button
          className="button"
          onClick={handleLogin}
          type="text">Login with google</button>
      </div>
    </div>
  </Fragment>
  );
}

ReactDOM.render(<Login/>, document.getElementById("main"));
