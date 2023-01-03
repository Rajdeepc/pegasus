/* global gapi */
import React, { useEffect } from "react";
import { userSignedInAction } from "./signon.action";
import { connect } from "react-redux";
import { loginlogo } from "../../assets";

import "./signon.scss";
const SingleSignOn = (props) => {
  useEffect(() => {
    renderButton();
  }, []);

  function renderButton() {
    gapi.signin2.render("my-signin2", {
      scope: "profile email",
      width: 240,
      height: 50,
      longtitle: true,
      theme: "dark",
      onsuccess: onSuccess,
      onfailure: onFailure,
    });
  }

  const onSuccess = (googleUser) => {
    const profile = googleUser.getBasicProfile();
    //  console.log(userDetails);
    const username = profile.getName();
    const userImg = profile.getImageUrl();
    const email = profile.getEmail(); // This is null if the 'email' scope is not present.
    const userDetails = {
      username,
      userImg,
      email,
    };
    props.userSignedInAction(userDetails);
  };

  const onFailure = (error) => {
    console.log(error);
  };

  return (
    <div className="signin-container">
      <div className="logo">
        <img src={loginlogo} alt="" />
      </div>
      <div className="header">
        <h1>Sign in with</h1>
        <h1>Google</h1>
      </div>

      <div className="signon-popup">
        <div id="my-signin2" className="text-center"></div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const SingleSignOnContainer = connect(mapStateToProps, {
  userSignedInAction,
})(SingleSignOn);

export default SingleSignOnContainer;
