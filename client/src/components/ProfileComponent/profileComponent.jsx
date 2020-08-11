/* global gapi */

import React, { useState, useEffect } from "react";
import {
  Row,
  Modal,
  Button,
  DropdownButton,
  Dropdown,
  Col,
} from "react-bootstrap";
import { FaUserAstronaut } from "react-icons/fa";
import { jarvis } from "../../assets/images";
import "./profile.scss";
import SingleSignOn from "../SingleSignOn/singleSignOn";
import { connect } from "react-redux";
import { userSignOutAction,userSignedInAction } from "../SingleSignOn/signon.action";

const ProfileComponent = (props) => {
  const [show, setShow] = useState(false);
  const [user, setUser] = useState({
    username: "",
    profie_pic: "",
    email: "",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    gapi.load("auth2", function () {
      gapi.auth2.init();
    });
  }, []);

  useEffect(() => {
    const userDetailsSession = JSON.parse(sessionStorage.getItem("login"));
    if(userDetailsSession){
        props.userSignedInAction(userDetailsSession);
    }
  }, []);

  useEffect(() => {
    const userDetailsSession = props.userDetailsReducerValues;
    if(userDetailsSession.userSignedOn && userDetailsSession.userDetails){
        setShow(false)
        attachUserDetails(userDetailsSession.userDetails);
    } else {
        setUser({})
    }
   
  }, [props.userDetailsReducerValues.userSignedOn]);

  const attachUserDetails = (userDetail) => {
    if (userDetail) {
      //  console.log(userDetail)
      setUser((prevState) => {
        return {
          ...prevState,
          username: userDetail.Bd || userDetail.Cd,
          profie_pic: userDetail.MK || userDetail.PK,
          email: userDetail.Au || userDetail.yu,
        };
      });
    }
  };

  const signOut = () => {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
     // console.log("User signed out.");
      //sign out action
      props.userSignOutAction();
    });
  };

  return (
    <>
      <Row className="profile">
        <Col md="7" className="text-left">
          <h5>teleport</h5>
        </Col>
        
        <Col md="5" className="text-right">
          {user && Object.keys(user).length === 0 ? (
            <FaUserAstronaut size={20} onClick={handleShow} />
          ) : (
            <div className="user-profile">
              <div className="profile-img">
                <img src={user.profie_pic} alt="user" />
              </div>
              <div className="dropdown-logout">
                <DropdownButton id="dropdown-basic-button" variant="secondary" title="">
                  <p onClick={signOut}>Logout</p>
                </DropdownButton>
              </div>
            </div>
          )}
        </Col>
      </Row>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body className="no-padding">
          <SingleSignOn />
        </Modal.Body>
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => ({
  userDetailsReducerValues: state.SignOnReducer,
});

const ProfileComponentContainer = connect(mapStateToProps, {
  userSignOutAction,
  userSignedInAction
})(ProfileComponent);

export default ProfileComponentContainer;
