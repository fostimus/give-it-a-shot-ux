import React, { useState, useEffect } from "react";
import loggedOutIcon from "./assets/alcohol_icon.png";
import { Favorites } from "../../components/Favorites";
import { ButtonLink } from "../../components/Button";
import styles from "./assets/Home.module.scss";
import UserApi from "../../backend/user";
import { vw, mobileBreakpoint, getViewport } from "../../utility";

export const Home = props => {
  const [firstName, setFirstName] = useState("");
  const [desktop, setDesktop] = useState(vw > mobileBreakpoint ? true : false);

  const checkViewport = () => {
    const [vw, vh] = getViewport();

    if (vw > mobileBreakpoint) {
      setDesktop(true);
    } else if (vw <= mobileBreakpoint) {
      setDesktop(false);
    }
  };

  const fetchUser = () => {
    UserApi.show(props.currentUser).then(data => {
      setFirstName(data.user.firstName);
    });
  };

  useEffect(fetchUser, []);

  window.addEventListener("resize", checkViewport);

  return (
    <>
      {props.currentUser ? (
        <div className={styles.loggedIn}>
          <div>
            <h2>Welcome Home, {firstName}</h2>
          </div>

          <ButtonLink
            large={desktop}
            className={styles.button}
            path="/quiz"
            text="Take the quiz"
          />

          <ButtonLink
            small={!desktop}
            className={styles.button}
            path="/drink/random"
            text="Random Drink"
          />

          <Favorites currentUser={props.currentUser} />
        </div>
      ) : (
        <div className={styles.home}>
          <img
            className={`${styles.mainIcon} ${styles.centered}`}
            src={loggedOutIcon}
            alt=""
          />
          <ButtonLink
            className={`${styles.home2} ${styles.centered}`}
            path="/login"
            text="Login"
          />
          <ButtonLink
            className={`${styles.home3} ${styles.centered}`}
            path="/register"
            text="Register"
          />
        </div>
      )}
    </>
  );
};
