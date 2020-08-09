import { createStore, applyMiddleware } from "redux"; // for creating store and applying middlerware like thunk
import thunk from "redux-thunk"; // for async actions
import rootReducer from "../rootReducer";


//const persistedState = loadState();


const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

// store.subscribe(throttle(() => {
//   saveState({
//     DashBoardReducer: store.getState().DashBoardReducer
//   });
// },1000 ));


export default store;
