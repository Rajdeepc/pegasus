import React from "react";
import "./slidedrawer.scss";
import { RiCloseLine } from "react-icons/ri";
import PropTypes from "prop-types";
import moment from 'moment';
import { connect } from 'react-redux';



const SlideDrawer = (props) => {
  const handleClose = () => {
    props.closeDrawer(true);
  };


  return (
    <div className={props.show ? "side-drawer open" : "side-drawer"}>
      <header>
        <div className="pull-left">You have {props.notificationDetails.length} new Notification</div>
        <div className="pull-right">
          <RiCloseLine size={20} onClick={handleClose} />
        </div>
      </header>
      <div className="notifications list">
        {(props.notificationDetails || []).map((item) => {
          return (
            <div className="alert-card">
              <h5>Alert!!!!</h5>
              <p>There is a different version available</p>
              <div className="desc">
              <p>Hit <span className="sendbtn">Send</span> to see the difference</p>
              <strong>{item.url}</strong>
              </div>
              <div className="time">
              <p>Updated At: {moment(item.updatedAt).format('MM/DD/YYY, hh:mm A')}</p>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

SlideDrawer.defaultProps = {
  show: false,
};

SlideDrawer.propTypes = {
  show: PropTypes.bool,
};


const mapStateToProps = (state) => ({
  notificationDetails: state.NotificationReducer.notificationList
})


const SlideDrawerContainer = connect(mapStateToProps,{

})(SlideDrawer)

export default SlideDrawerContainer
