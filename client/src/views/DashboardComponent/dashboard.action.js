import {
  GET_UPDATED_DB_DATA,
  SEARCH_VALUE_RECEIVED,
  UPDATE_TITLE_SUCCESS,
  UPDATED_SUBSCRIBER_STATUS,
  NOT_UPDATED_SUBSCRIBER_LIST,
  GET_ALL_ENDPOINTS_DATA
} from "./dashboard.action.types";
import Service from "../../utils/service";
import { BASE_URL, API_ENDPOINTS } from "../../utils/environment";
import db from '../../redux/indexDB/index';


const addApiEndPointAction = (obj) => async (dispatch) => {
  await db.apiList.put({gid: obj.gid, name:obj.name, componentValue: obj.componentValue});
  const updatedDbData = await db.apiList.toArray()
  dispatch({
    type: GET_UPDATED_DB_DATA,
    payload: updatedDbData
  });
};


const getAllApiEndpointsDataFromdb = () => async (dispatch) => {
  const updatedDbData = await db.apiList.toArray()
  dispatch({
    type: GET_ALL_ENDPOINTS_DATA,
    payload: updatedDbData
  });
};

const removeApiEndPointAction = (id) => async (dispatch) => {
  await db.apiList.where('gid').equals(id).delete();  
  const updatedDbData = await db.apiList.toArray()
  dispatch({
    type: GET_UPDATED_DB_DATA,
    payload: updatedDbData
  });
};

const searchAction = (searchValue) => (dispatch) => {
  dispatch({
    type: SEARCH_VALUE_RECEIVED,
    text: searchValue,
  });
};

const updateEntryWithRequest = (objId, obj) => async (dispatch) => {
  await db.apiList.update({gid:objId}, {componentValue: obj});
  const updatedDbData = await db.apiList.toArray()
  dispatch({
    type: GET_UPDATED_DB_DATA,
    payload: updatedDbData
  });
};

const updateTitle = (objId, updatedTitle) => async (dispatch) => {
  await db.apiList.update({gid:objId}, {name: updatedTitle});
  const updatedDbData = await db.apiList.toArray()
  dispatch({
    type: GET_UPDATED_DB_DATA,
    payload: updatedDbData
  });
};

const updateSubscriberList = (url, subscriber, isActive) => (dispatch) => {
  const API_URL = BASE_URL + API_ENDPOINTS.updateSubscriber;
  const payload = {
    url,
    subscriber,
    isActive,
  };
  Service.requestParams("PUT", API_URL, payload)
    .then((resp) => {
      dispatch({
        type: UPDATED_SUBSCRIBER_STATUS,
        payload: resp,
      });
    })
    .catch((e) => {
      dispatch({
        type: NOT_UPDATED_SUBSCRIBER_LIST,
        payload: e,
      });
    });
};

export {
  updateSubscriberList,
  updateTitle,
  searchAction,
  addApiEndPointAction,
  removeApiEndPointAction,
  updateEntryWithRequest,
  getAllApiEndpointsDataFromdb
};
