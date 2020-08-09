import {
  ALL_NOTIFICATIONS_RECEIVED,
  ALL_NOTIFICATIONS_FAILED,
} from "./notification.action.types";

const INITIAL_STATE = {
  notificationReceived: false,
  notificationList: [],
  notificationError:{}
};

const NotificationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ALL_NOTIFICATIONS_RECEIVED:
      return {
        ...state,
        notificationList: action.payload,
      };
    case ALL_NOTIFICATIONS_FAILED:
      return {
        ...state,
        notificationError: action.payload
      };
    default:
        return state
  }
};

export default NotificationReducer
