import { combineReducers } from "redux";
import DashBoardReducer from '../views/DashboardComponent/dashboard.reducer';
import SignOnReducer from '../components/SingleSignOn/signon.reducer';
import NotificationReducer from '../components/NotificationComponent/notification.reducer';

const rootReducer =  combineReducers({
    DashBoardReducer,
    SignOnReducer,
    NotificationReducer
})

export default rootReducer