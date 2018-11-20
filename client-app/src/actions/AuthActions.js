import axios from "axios";

import {URL} from "./types";
import {LOGOUT, LOGIN_ATTEMPT,LOGIN_FAILED,LOGIN_SUCCESS} from "./types";
import {REGISTER_ATTEMPT,REGISTER_FAILED,REGISTER_SUCCESS} from "./types";

import setAuthorizationToken from '../utils/setAuthorizationToken';

export function logout() {
    return dispatch => {
        localStorage.removeItem('app_token');
        setAuthorizationToken(false);
        dispatch({type:LOGOUT});
    }
}

export const registerUser = ({username, email,password}) =>{
    return (dispatch) => {
        dispatch({type:REGISTER_ATTEMPT});
        axios.post(URL + "auth/register", {email, password})
            .then((response)=> {
                handleRegisterResponse(dispatch,response.data);
            })
            .catch((err)=>{
                onRegisterFailed(dispatch,err.response.data);
            });
    };
};

const handleRegisterResponse = (dispatch, data) =>{
    if(!data._id){
        onRegisterFailed(dispatch,data.message);
    }else{
        onRegisterSuccess(dispatch,data);
    }
};

const onRegisterSuccess = (dispatch,user) =>{
    dispatch({type:REGISTER_SUCCESS, user});
};

const onRegisterFailed = (dispatch, errorMessage) =>{
    dispatch({type:REGISTER_FAILED, error:errorMessage});
};

export const loginUser = ({email,password}) =>{
	return (dispatch) => {
		dispatch({type:LOGIN_ATTEMPT});
		axios.post(URL + "auth/login", {email, password})
			.then((response)=> {
				handleResponse(dispatch,response.data);
			})
			.catch((err)=>{
				onLoginFailed(dispatch,err.response.data);
			});
	};
};

const handleResponse = (dispatch, data) =>{

	if(!data.user){
		onLoginFailed(dispatch,data.message);
	}else{
        localStorage.setItem('app_token', data.token);
		onLoginSuccess(dispatch,data.user,data.token);
	}
};

const onLoginSuccess = (dispatch,user,token) =>{
	dispatch({type:LOGIN_SUCCESS, user, token});
};

const onLoginFailed = (dispatch, errorMessage) =>{
	dispatch({type:LOGIN_FAILED, error:errorMessage});
};