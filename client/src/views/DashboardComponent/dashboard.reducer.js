import {
  GET_UPDATED_DB_DATA,
  SEARCH_VALUE_RECEIVED,
  UPDATE_TITLE_SUCCESS,
  UPDATED_SUBSCRIBER_STATUS,
  NOT_UPDATED_SUBSCRIBER_LIST,
  GET_ALL_ENDPOINTS_DATA
} from "./dashboard.action.types";

const INITIAL_STATE = {
  apiEndPoints: [],
  searchValue:'',
  subscriberStatus: {},
  error:{},
  dbItems:[]
};

const DashBoardReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SEARCH_VALUE_RECEIVED:
      return {
        ...state,
        searchValue: action.text
      }

      case UPDATE_TITLE_SUCCESS:
        let tempObjToUpdateTitle = [...state.apiEndPoints];
        const newUpdatedArrayWithTitle = tempObjToUpdateTitle.map(obj =>
          obj.id === action.payload.id ? { ...obj, name: action.payload.title } : obj
      );
      return {
        ...state,
        apiEndPoints: [...newUpdatedArrayWithTitle]
      }

      case UPDATED_SUBSCRIBER_STATUS:
        return {
          ...state,
          subscriberStatus: action.payload
        }

      case NOT_UPDATED_SUBSCRIBER_LIST:
        return {
          ...state,
          error: action.payload
        }
      case GET_UPDATED_DB_DATA:
        return {
          ...state,
          apiEndPoints: action.payload
        }
      case GET_ALL_ENDPOINTS_DATA:
        return {
          ...state,
          apiEndPoints: action.payload
        }

    default:
      return state;
  }
};

export default DashBoardReducer;
