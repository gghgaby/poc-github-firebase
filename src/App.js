
import React, {
  useState,
  useEffect,
  Fragment
} from "react";
import ReactDOM from "react-dom";
import firebaseConfig from "./config";
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import useAuth from "./hooks/useAuth";
import { Loading } from "./components/index";
import "milligram/dist/milligram.css";
export default function App() {
  const firebase = initializeApp(firebaseConfig);
  const { googleLogout, user } = useAuth(firebase);

  // eslint-disable-next-line no-unused-vars
  const analytics = getAnalytics(firebase);

  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUserName(user.name);
    if (user.name) {
      setLoading(false);
    }
  }, [user]);

  /**
   * @param {*} _event
   * this function is to close de user session,
   * delete local storage value called bearer
   * and replace location to index file (login page)
   */
  const handleLogout = (_event) => {
    googleLogout();
    localStorage.removeItem("bearer");
    window.location.replace("/index.html");
  };

  return (
    <Fragment>
      <Loading hidden={!loading}/>
      <h1>Firebase + GitHub Actions v2</h1>
      <h3>Globant</h3>
      <div className="container">
        <h2>Welcome {userName}!</h2>
        <button
          className="button button-outline"
          onClick={handleLogout}
          type="text">Logout</button>
      </div>
    </Fragment>
  );
}

ReactDOM.render(<App/>, document.getElementById("main"));
