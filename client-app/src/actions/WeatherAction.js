import axios from "axios";

import {WEATHER_ATTEMPT, WEATHER_FAILED, WEATHER_SUCCESS} from "../actions/types";
import {WEATHERCITY_ATTEMPT, WEATHERCITY_FAILED, WEATHERCITY_SUCCESS} from "../actions/types";

import {URL} from "./types";


export const Addcity = (city) =>{
    return (dispatch) => {
        dispatch({type:WEATHER_ATTEMPT});

        axios.post(URL + "auth/addcity", {city})
            .then((response)=> {
                dispatch({type:WEATHER_SUCCESS, data:response.data});
            })
            .catch((err)=>{
                console.log(err.message);
                dispatch({type:WEATHER_FAILED, error:err});
            });
    };
};

export const GetCities = (id) =>{
    return (dispatch) => {
        dispatch({type:WEATHERCITY_ATTEMPT});
        axios.post(URL + "auth/login/addcity", {id})
            .then((response)=> {
                //dispatch({type:WEATHERCITY_SUCCESS, data:response.data});
                //console.log(response.data);
                return response.data;
            })
            .catch((err)=>{
                console.log(err.message);
                dispatch({type:WEATHERCITY_FAILED, error:err});
            });
    };
};