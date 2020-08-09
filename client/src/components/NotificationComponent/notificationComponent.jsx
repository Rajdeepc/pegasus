import React, { useState, useEffect } from "react";
import "./notification.scss";
import { IoMdNotificationsOutline } from "react-icons/io";
import ToggleSwitch from "../../components/Toggle/toggle";
import { Nav, Row, Col, Toast, Dropdown, Modal } from "react-bootstrap";
import { FcSettings } from "react-icons/fc";
import SlideDrawer from "../../components/SlideDrawer/slideDrawer";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { showAllNotifications } from "./notification.action";
import ToastComponent from "../Toast/toastComponent";
import ReleaseNotesComponent from "../ReleaseNotesComponent/ReleaseNotesComponent";

const NotificationDrawerComponent = (props) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showAlert, setShowAlert] = useState({ text: "", showToast: false });
  const [showReleaseNotes, setShowReleaseNotes] = useState(false);

  const showHideToast = (text, showToast) => {
    if (
      props.userSignInDetails.userSignedOn &&
      props.userSignInDetails.userDetails
    ) {
      props.showAllNotifications(
        props.userSignInDetails.userDetails.Du,
        props.url
      );
      setDrawerOpen(true);
    } else {
      const updatedValues = {
        text,
        showToast,
      };
      setShowAlert((prevState) => {
        return { ...prevState, ...updatedValues };
      });
    }
  };

  const toCloseDrawer = (value) => {
    if (value) {
      setDrawerOpen(false);
    }
  };

  const handleReleaseNotesChange = () => setShowReleaseNotes(true);
  const handleClose = () => setShowReleaseNotes(false);

  return (
    <div className="text-right notification-wrapper">
      <Row noGutters>
        <Col>
          <Nav>
            <Nav.Item>
              <h5>{props.name}</h5>
            </Nav.Item>
          </Nav>
        </Col>
        <Col>
          <Nav className="justify-content-end" activeKey="/home">
            <Nav.Item>
              <Dropdown>
                <Dropdown.Toggle variant="light" id="dropdown-basic">
                  <FcSettings size={20} />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={handleReleaseNotesChange}>
                    Release Notes
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav.Item>
            <Nav.Item className="notification-alert">
              <IoMdNotificationsOutline
                size={20}
                onClick={() =>
                  showHideToast("You need to login to view notifications", true)
                }
              />
              <div className="notifi"></div>
            </Nav.Item>
            <Nav.Item>
              Save To DB: <ToggleSwitch id="savetodb" />
            </Nav.Item>
            <Nav.Item>
              Enable Auto Save: <ToggleSwitch id="auto-save" />
            </Nav.Item>
          </Nav>
        </Col>
      </Row>

      <SlideDrawer show={drawerOpen} closeDrawer={toCloseDrawer} />
      {showAlert.showToast && (
        <Toast
          show={showAlert.showToast}
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            left: 0,
            margin: "0 auto",
            background: "#fff",
          }}
          onClose={() => showHideToast("", false)}
          delay={3000}
          autohide
        >
          <ToastComponent text={showAlert.text} />
        </Toast>
      )}
      <Modal show={showReleaseNotes} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Release Notes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ReleaseNotesComponent />
        </Modal.Body>
      </Modal>
    </div>
  );
};

NotificationDrawerComponent.defaultProps = {
  name: "",
  getAllNotifications: [],
};

NotificationDrawerComponent.propTypes = {
  name: PropTypes.string,
  getAllNotifications: PropTypes.array,
};

const mapStateToProps = (state) => ({
  userSignInDetails: state.SignOnReducer,
});

const NotificationDrawerComponentContainer = connect(mapStateToProps, {
  showAllNotifications,
})(NotificationDrawerComponent);

export default NotificationDrawerComponentContainer;
