import { BASE_URL, API_ENDPOINTS } from "../../utils/environment";
import { ALL_NOTIFICATIONS_RECEIVED, ALL_NOTIFICATIONS_FAILED } from "./notification.action.types";
import Service from "../../utils/service";





const showAllNotifications = (email,url) => dispatch => {
    const API_URL = BASE_URL + API_ENDPOINTS.getNotification;
    const payload = {
        url:url,
        email: email
    };
    Service.requestParams("POST", API_URL, payload)
    .then(resp => {
        dispatch({
            type: ALL_NOTIFICATIONS_RECEIVED,
            payload: resp.allNotifications
        })
    }).catch(e => {
        dispatch({
            type: ALL_NOTIFICATIONS_FAILED,
            payload: e
        })
    })
}


export { showAllNotifications }