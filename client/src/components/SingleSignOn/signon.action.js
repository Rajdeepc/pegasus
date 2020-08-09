import { USER_SIGNIN_SUCCESS, USER_LOGGED_OUT } from './signon.action.types';



const userSignedInAction = (userDetails) => dispatch => {
    sessionStorage.setItem("login", JSON.stringify(userDetails));
    dispatch({
        type: USER_SIGNIN_SUCCESS,
        payload: {
            userDetails
        }
    })
}


const userSignOutAction = () => dispatch => {
    sessionStorage.removeItem("login");
    dispatch({
        type: USER_LOGGED_OUT
    })
}


export {
    userSignedInAction,
    userSignOutAction
}