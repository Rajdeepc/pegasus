import { USER_SIGNIN_SUCCESS, USER_LOGGED_OUT } from "./signon.action.types";

const INITIAL_STATE = {
  userSignedOn: false,
  userDetails:[]
};

const SignOnReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_SIGNIN_SUCCESS:
      return {
        ...state,
        userSignedOn: true,
        userDetails: action.payload.userDetails
      };
    case USER_LOGGED_OUT:
      return {
        ...state,
        userSignedOn: false,
        userDetails: []
      }
      default:
          return state
  }
};


export default SignOnReducer